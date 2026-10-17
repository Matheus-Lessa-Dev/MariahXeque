import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { auditNavigation } from "./navigation-qa.mjs";

// Browser QA using Chromium's DevTools pipe; no browser automation dependency.
const url = process.env.QA_URL || "http://127.0.0.1:3000";
const chrome = process.env.QA_BROWSER_PATH || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/chromium", "/usr/bin/google-chrome",
].find(existsSync);
if (!chrome) throw new Error("Navegador não encontrado. Configure QA_BROWSER_PATH.");
const evidence = process.env.QA_EVIDENCE_DIR || ".work/qa-stage4";
await mkdir(evidence, { recursive: true });
const browser = spawn(chrome, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage", "--no-first-run", "--no-default-browser-check",
  "--disable-background-networking", "--disable-component-update", "--disable-sync",
  "--remote-debugging-pipe", `--user-data-dir=${path.resolve(`.work/browser-profile-${process.pid}`)}`,
  "about:blank",
], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"], windowsHide: true });
browser.stderr.on("data", data => {
  const line = String(data);
  if (/DevTools|WebSocket|ERROR.*(?:devtools|remote|socket)/i.test(line)) console.log(line.trim());
});
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let sessionId;
const pending = new Map();
let nextId = 0;
const errors = [];
const results = [];
let quality;
// Expectativas independentes da configuração que alimenta o site.
const expectedCourses = [
  ["Curso Brinco Glow", "curso-brinco-glow/P97490542S"],
  ["Curso Flowers — Brinco Frida + 02 Modelos Bônus", "curso-flowers/W97757909K"],
  ["Curso Colares em Fios + Aula Bônus", "curso-choker-magnolia-colar-mirabel-aula-bonus/L96369888U"],
  ["Curso — Brinco Íris", "curso-brinco-iris/G96014337A"],
  ["Curso Brinco Liz + Aula Bônus Brinco Glória", "introducao-explicacao-inicial/K96268866C"],
  ["Curso Brincos Eloá e Camélia", "curso-brincos-eloa-e-camelia/H98575184W"],
  ["Brinco Elo + Brinco Folha + Brinco Esther", "brinco-elo-brinco-folhar-brinco-esther/W96740520L"],
  ["Brinco Karol — Em crochê", "brinco-karol-em-croche/T96146002R"],
  ["Curso Colar em Pérolas — Ariel", "curso-colar-em-perolas-ariel/R97990315H"],
  ["Bolsa Mikaela — Parte 1 e 2", "bolsa-mikaela-parte-1-e-2-mariah-xeque/P89558066M"],
  ["Curso Fios em Festa", "fios-em-festa/D99721009I"],
].map(([title, slug]) => ({ title, url: `https://hotmart.com/pt-br/marketplace/produtos/${slug}` }));
let received = "";
browser.stdio[4].on("data", data => {
  received += data.toString();
  let boundary;
  while ((boundary = received.indexOf("\0")) !== -1) {
    const chunk = received.slice(0, boundary); received = received.slice(boundary + 1);
    if (!chunk) continue;
    const message = JSON.parse(chunk);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    const item = pending.get(message.id);
    if (!item) continue;
    clearTimeout(item.timer); pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message)); else item.resolve(message.result);
  }
});

async function until(fn, message, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try { const result = await fn(); if (result) return result; } catch { /* wait for readiness */ }
    await pause(150);
  }
  throw new Error(message);
}

function send(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    const useSession = /^(?:Page|Runtime|Input|Emulation|Accessibility|DOM|Performance)\./.test(method);
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(useSession && sessionId ? { sessionId } : {}) }) + "\0");
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ": " + (result.exceptionDetails.exception?.description || expression));
  return result.result.value;
}

async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center', behavior:'instant'})`);
  await settle();
  const point = await evaluate(`(() => { const e = document.querySelector(${JSON.stringify(selector)}); if (!e) throw Error('Element not found'); const r = e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await send("Input.dispatchMouseEvent", { type: "mousePressed", ...point, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point, button: "left", clickCount: 1 });
  await pause(100);
}

async function settle() {
  let previous = -1;
  let stable = 0;
  await until(async () => {
    const current = await evaluate("scrollY");
    stable = Math.abs(current - previous) < .5 ? stable + 1 : 0;
    previous = current;
    return stable >= 2;
  }, "Rolagem não estabilizou");
  await evaluate("Promise.all(document.getAnimations().map(a => a.finished.catch(() => {})))");
}

async function key(key, code, virtualKeyCode, modifiers = 0) {
  await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, modifiers, windowsVirtualKeyCode: virtualKeyCode, ...(key === "Enter" ? { text: "\r" } : {}) });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, modifiers: 0, windowsVirtualKeyCode: virtualKeyCode });
  await pause(60);
}

async function screenshot(name, full = false) {
  const params = { format: "png", captureBeyondViewport: full };
  if (full) {
    const { cssContentSize } = await send("Page.getLayoutMetrics");
    params.clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 };
  }
  const shot = await send("Page.captureScreenshot", params);
  await writeFile(`${evidence}/${name}.png`, Buffer.from(shot.data, "base64"));
}

async function reviewSection(name, selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start', behavior:'instant'})`);
  await settle();
  const clip = await evaluate(`(() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:0,y:Math.max(0,Math.floor(r.top+scrollY)),width:document.documentElement.clientWidth,height:Math.ceil(r.height),scale:1}; })()`);
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip });
  await writeFile(`${evidence}/${name}.png`, Buffer.from(shot.data, "base64"));
}

try {
  browser.on("error", error => errors.push(error.message));
  const version = await send("Browser.getVersion");
  console.log(`Navegador: ${version.product}`);
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  ({ sessionId } = await send("Target.attachToTarget", { targetId, flatten: true }));
  console.log("Página de verificação conectada.");
  await send("Page.enable"); await send("Runtime.enable");
  if (process.env.QA_NAVIGATION_ONLY === "1") {
    await auditNavigation({ send, evaluate, settle, screenshot, until, url, evidence });
    assert.deepEqual(errors, [], "Erros no navegador");
    console.log(`QA de navegação aprovada em ${url}.`);
  } else {
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `window.__qaCLS = 0; try { new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qaCLS += entry.value; }).observe({type:'layout-shift', buffered:true}); } catch {}` });
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url });
  await until(() => evaluate("document.readyState === 'complete' && !!document.querySelector('.hero')"), "Página não carregou.");
  quality = await evaluate(`(() => {
    const images=[...document.querySelectorAll('main img')];
    const headings=[...document.querySelectorAll('main h1,main h2,main h3,main h4')].filter(e=>!e.closest('dialog'));
    const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
    const description=document.querySelector('meta[name="description"]')?.content;
    const meta=property=>document.querySelector('meta[property="'+property+'"]')?.content;
    return {
      lang:document.documentElement.lang, title:document.title, description,
      canonical:document.querySelector('link[rel="canonical"]')?.href || null,
      robots:document.querySelector('meta[name="robots"]')?.content,
      ogTitle:meta('og:title'), ogImage:meta('og:image'), ogImageWidth:meta('og:image:width'), ogImageHeight:meta('og:image:height'),
      ogLocale:meta('og:locale'), ogAlt:meta('og:image:alt'), twitterCard:document.querySelector('meta[name="twitter:card"]')?.content,
      duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),
      skippedHeadingLevels:headings.filter((e,i)=>i && +e.tagName[1]>+headings[i-1].tagName[1]+1).map(e=>e.textContent),
      unnamedControls:[...document.querySelectorAll('a,button,summary')].filter(e=>!(e.getAttribute('aria-label') || e.textContent.trim() || e.querySelector('img[alt]')?.alt)).map(e=>e.outerHTML),
      imagesWithoutDimensions:images.filter(i=>!i.getAttribute('width')||!i.getAttribute('height')).map(i=>i.src),
      missingAlt:images.filter(i=>!i.hasAttribute('alt')).map(i=>i.src),
      lazyImages:images.filter(i=>i.loading==='lazy').length,
      heroPreloaded:!!document.querySelector('link[rel="preload"][as="image"]'),
      heroLazy:document.querySelector('.hero-portrait').loading,
      commercialSchema:document.querySelectorAll('script[type="application/ld+json"]').length
    };
  })()`);
  assert.equal(quality.lang, 'pt-BR');
  assert.equal(quality.title, 'Cursos de Crochê e Super Combo | Mariah Xeque');
  assert.ok(quality.description.length >= 100 && quality.description.length <= 180);
  assert.equal(quality.canonical, null, 'Sem domínio final confirmado, sem canonical');
  assert.equal(quality.ogLocale, 'pt_BR'); assert.equal(quality.twitterCard, 'summary_large_image');
  assert.equal(quality.ogImageWidth, '1200'); assert.equal(quality.ogImageHeight, '630');
  assert.ok(quality.ogAlt && quality.ogTitle);
  assert.deepEqual(quality.duplicateIds, []); assert.deepEqual(quality.skippedHeadingLevels, []);
  assert.deepEqual(quality.unnamedControls, []); assert.deepEqual(quality.missingAlt, []);
  assert.deepEqual(quality.imagesWithoutDimensions, []);
  assert.ok(quality.lazyImages >= 15); assert.equal(quality.heroPreloaded, true);
  assert.notEqual(quality.heroLazy, 'lazy'); assert.equal(quality.commercialSchema, 0);
  const socialResponse = await fetch(new URL(new URL(quality.ogImage).pathname, url));
  assert.equal(socialResponse.status, 200); assert.ok(socialResponse.headers.get('content-type').startsWith('image/'));
  quality.shareImageBytes = (await socialResponse.arrayBuffer()).byteLength;
  console.log("Página carregada. Verificando imagens e larguras.");
  await evaluate("Promise.all([...document.images].map(async i => { i.loading = 'eager'; try { await i.decode(); } catch {} }))");
  await settle();
  quality.initialCLS = await evaluate('window.__qaCLS');
  assert.ok(quality.initialCLS < .1, `Instabilidade no carregamento: ${quality.initialCLS}`);

  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: width < 700 });
    await send("Emulation.setTouchEmulationEnabled", { enabled: width < 960 });
    await pause(150);
    await settle();
    const audit = await evaluate(`(() => {
      const rect = e => { const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; };
      const headings = [...document.querySelectorAll('h1,h2,h3')];
      return {
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        brokenImages: [...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>i.getAttribute('src')),
        missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h==='#'||!document.getElementById(h.slice(1))),
        outside: [...document.querySelectorAll('main *,header *,footer *')].filter(e=> {const r=e.getBoundingClientRect();return r.width>0 && (r.left<-.5 || r.right>innerWidth+.5)}).map(e=>({tag:e.tagName,class:e.className,rect:rect(e)})).slice(0,15),
        invalidHeadings: headings.filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent),
        fonts: [getComputedStyle(headings[0]).fontFamily,getComputedStyle(document.body).fontFamily],
        disabledActions: [...document.querySelectorAll('button:disabled')].map(e=>e.textContent),
        menuVisible: getComputedStyle(document.querySelector('.main-navigation')).visibility !== 'hidden',
        learningColumns: getComputedStyle(document.querySelector('.learning-grid')).gridTemplateColumns.split(' ').length,
        galleryLabelSize: parseFloat(getComputedStyle(document.querySelector('.gallery-category')).fontSize),
        footerSize: parseFloat(getComputedStyle(document.querySelector('.footer-bottom')).fontSize)
      };
    })()`);
    assert.ok(audit.scrollWidth <= audit.width, `Rolagem horizontal em ${width}px: ${JSON.stringify(audit.outside)}`);
    assert.equal(audit.h1, 1); assert.deepEqual(audit.missingAnchors, []);
    assert.deepEqual(audit.brokenImages, []); assert.deepEqual(audit.invalidHeadings, []);
    assert.equal(audit.menuVisible, width >= 960);
    assert.equal(audit.learningColumns, width <= 700 ? 1 : 2);
    assert.ok(audit.galleryLabelSize >= 10); assert.ok(audit.footerSize >= 12);
    assert.equal(audit.disabledActions.length, 0);
    const catalog = await evaluate(`(() => {
      const cards = [...document.querySelectorAll('#cursos .course-card')];
      return {
        courses: cards.map(e => ({ title: e.querySelector('h3').textContent, url: e.querySelector('.course-link').href })),
        visible: cards.every(e => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden'),
        accessibleLinks: cards.every(e => e.querySelector('a').getAttribute('aria-label').includes(e.querySelector('h3').textContent)),
        ids: cards.map(e => e.dataset.courseId),
        covers: cards.filter(e => e.querySelector('img')).length,
        croppedCovers: cards.filter(e => e.querySelector('img') && getComputedStyle(e.querySelector('img')).objectFit !== 'contain').length,
        studentLinks: [...document.querySelectorAll('a')].filter(a=>a.href==='https://hotmart.com/pt-br/club/mariah-xeque').map(a=>a.textContent),
        removedContent: /encomenda|peças prontas|wa\\.me/i.test(document.body.innerText + [...document.querySelectorAll('a')].map(a=>a.href).join(' ')),
        comboProductLinks: document.querySelectorAll('#combo a[href*="/marketplace/produtos/"], #combo .content-list').length,
        offerFallback: document.querySelector('#oferta .button').getAttribute('href'),
        oldPrice: /649,90|67,21|806,52|R\\$\\s*750/.test(document.body.innerText)
      };
    })()`);
    assert.deepEqual(catalog.courses, expectedCourses, 'Nomes, ordem e destinos oficiais dos 11 cursos');
    assert.equal(new Set(catalog.ids).size, 11, 'Cursos sem duplicações');
    assert.equal(catalog.visible, true); assert.equal(catalog.accessibleLinks, true);
    assert.equal(catalog.covers, 10); assert.equal(catalog.croppedCovers, 0);
    assert.equal(catalog.studentLinks.length, 2);
    assert.ok(catalog.studentLinks.every(s=>s.includes('Já sou aluna — acessar meus cursos')));
    assert.equal(catalog.removedContent, false); assert.equal(catalog.comboProductLinks, 0);
    assert.equal(catalog.offerFallback, '#cursos'); assert.equal(catalog.oldPrice, false);
    audit.catalog = catalog;
    results.push(audit);
    console.log(`${width}px: layout e conteúdo verificados.`);
    if ([360, 390, 768, 1440].includes(width)) {
      await evaluate("window.scrollTo({top:0,behavior:'instant'})");
      await settle();
      const label = width === 360 ? "mobile-360" : width === 390 ? "mobile" : width === 768 ? "tablet" : "desktop";
      await screenshot(label); await screenshot(`${label}-full`, true);
      if (process.env.QA_VISUAL_REVIEW === "1") {
        const selectors = await evaluate("[...document.querySelectorAll('main > section')].map((e,i)=>({selector:'main > section:nth-of-type('+(i+1)+')', name:e.id || [...e.classList].find(c=>!['section','light','dark'].includes(c)) || 'section-'+i}))");
        for (const section of selectors) await reviewSection(`${width}-${section.name}`, section.selector);
        await reviewSection(`${width}-rodape`, '.site-footer');
      }
    }
  }

  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  await click(".menu-toggle");
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "true");
  await settle();
  await screenshot("mobile-menu");
  await key("Escape", "Escape", 27);
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
  assert.equal(await evaluate("document.activeElement.className"), "menu-toggle");
  assert.equal(await evaluate("document.querySelector('.main-navigation').inert"), true);
  await key("Tab", "Tab", 9);
  assert.equal(await evaluate("document.querySelector('.main-navigation').contains(document.activeElement)"), false);

  await click(".menu-toggle");
  await click('.main-navigation a[href="#cursos"]');
  assert.equal(await evaluate("location.hash"), "#cursos");
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
  assert.equal(await evaluate("document.activeElement.id"), "cursos");
  await settle();

  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  await click(".menu-toggle");
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: 10, y: 600, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: 10, y: 600, button: "left", clickCount: 1 });
  await pause(60);
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");

  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  await click(".menu-toggle");
  await send("Emulation.setDeviceMetricsOverride", { width: 1024, height: 900, deviceScaleFactor: 1, mobile: false });
  await pause(150);
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await pause(150);
  assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");

  await evaluate("document.querySelector('.faq-item summary').focus()");
  await key("Enter", "Enter", 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), true);
  await settle();
  assert.equal(await evaluate("document.querySelector('.faq-item').style.height"), "");
  await screenshot("mobile-faq");
  await key("Enter", "Enter", 13);
  await settle();
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), false);

  // Reversing an in-flight FAQ animation must settle at its last requested state.
  await evaluate("document.querySelector('.faq-item summary').click(); document.querySelector('.faq-item summary').click(); document.querySelector('.faq-item summary').click()");
  await settle();
  assert.equal(await evaluate("document.querySelector('.faq-item').open && document.querySelector('.faq-item').style.overflow === ''"), true);
  await evaluate("document.querySelector('.faq-item summary').click()");
  await settle();

  // Native modal: keyboard navigation, focus containment, swipe and restoration.
  await click(".gallery-trigger");
  await settle();
  assert.equal(await evaluate("document.querySelector('.lightbox').matches(':modal')"), true);
  assert.equal(await evaluate("document.body.style.overflow"), "hidden");
  assert.equal(await evaluate("document.activeElement.className"), "lightbox-close");
  await key("ArrowRight", "ArrowRight", 39);
  assert.equal(await evaluate("document.querySelector('.lightbox-count').textContent"), "2 de 4");
  await key("ArrowLeft", "ArrowLeft", 37);
  assert.equal(await evaluate("document.querySelector('.lightbox-count').textContent"), "1 de 4");
  await click('.lightbox button[aria-label="Imagem anterior"]');
  assert.equal(await evaluate("document.querySelector('.lightbox-count').textContent"), "4 de 4");
  await key("Tab", "Tab", 9); await key("Tab", "Tab", 9);
  assert.equal(await evaluate("document.activeElement.className"), "lightbox-close");
  await key("Tab", "Tab", 9, 8);
  assert.equal(await evaluate("document.activeElement.getAttribute('aria-label')"), "Próxima imagem");
  const swipePoint = await evaluate("(() => { const r=document.querySelector('.lightbox-stage').getBoundingClientRect(); return {x:r.x+r.width*.8,y:r.y+r.height*.5}; })()");
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ ...swipePoint, id: 1 }] });
  for (const dx of [35, 75, 120]) await send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: swipePoint.x-dx, y: swipePoint.y, id: 1 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await pause(100);
  assert.equal(await evaluate("document.querySelector('.lightbox-count').textContent"), "1 de 4", "Deslizar navega pela galeria");
  await screenshot("mobile-lightbox");
  await key("Escape", "Escape", 27);
  await pause(80);
  assert.equal(await evaluate("document.querySelector('.lightbox').open"), false);
  assert.equal(await evaluate("document.activeElement.classList.contains('gallery-trigger')"), true);
  assert.equal(await evaluate("document.body.style.overflow"), "");
  await click('.gallery-trigger');
  await click('.lightbox-close');
  await pause(80);
  assert.equal(await evaluate("document.querySelector('.lightbox').open"), false);
  await click('.gallery-trigger');
  await send('Input.dispatchMouseEvent', {type:'mousePressed',x:2,y:400,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent', {type:'mouseReleased',x:2,y:400,button:'left',clickCount:1});
  await pause(100);
  assert.equal(await evaluate("document.querySelector('.lightbox').open"), false, 'Clique fora fecha a ampliação');
  assert.equal(await evaluate("document.querySelector('.hero-detail').style.translate"), "", "Parallax desativado no touch");

  // Os links individuais precisam estar na ordem natural do teclado.
  await evaluate("document.querySelector('.course-link').focus()");
  await key("Tab", "Tab", 9);
  assert.equal(await evaluate("document.activeElement.closest('.course-card')?.dataset.courseId"), "flowers");

  for (const section of ["combo", "cursos", "galeria", "mariah", "oferta", "duvidas"]) {
    await evaluate(`document.getElementById(${JSON.stringify(section)}).scrollIntoView({behavior:'instant'})`);
    await settle();
    await screenshot(`mobile-${section}`);
  }

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.button')).transitionDuration"), "0s");
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  await pause(80);
  assert.equal(await evaluate("document.getAnimations().filter(a=>a.playState==='running').length"), 0);
  await evaluate("document.querySelector('.faq-item summary').focus()");
  await key("Enter", "Enter", 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open && document.querySelector('.faq-item').style.height === ''"), true);
  await key("Enter", "Enter", 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), false);
  await send("Emulation.setEmulatedMedia", { features: [] });

  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "smooth");
  await click('.hero-actions a[href="#combo"]');
  assert.equal(await evaluate("location.hash"), "#combo");
  await settle();
  const top = await evaluate("document.querySelector('#combo').getBoundingClientRect().top");
  assert.ok(top >= 77 && top <= 130, `Âncora coberta pelo cabeçalho: ${top}`);

  await click('#oferta .button');
  assert.equal(await evaluate("location.hash"), "#cursos");
  await settle();
  assert.equal(await evaluate("document.activeElement.id"), "cursos");
  await evaluate("history.back()");
  await until(() => evaluate("location.hash === '#combo'"), "Voltar não restaurou a âncora");
  await settle();
  const restored = await evaluate("document.querySelector('#combo').getBoundingClientRect().top");
  assert.ok(restored >= 77 && restored <= 130, `Voltar não restaurou a posição: ${restored}`);

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Emulation.setTouchEmulationEnabled", { enabled: false });
  await evaluate("window.scrollTo({top:40,behavior:'instant'})");
  await settle();
  const firstTranslate = await evaluate("document.querySelector('.hero-detail').style.translate");
  await evaluate("window.scrollTo({top:220,behavior:'instant'})");
  await settle();
  const secondTranslate = await evaluate("document.querySelector('.hero-detail').style.translate");
  assert.notEqual(firstTranslate, secondTranslate, "Parallax acompanha a rolagem no desktop");
  assert.equal(await evaluate("document.querySelector('.site-header').dataset.scrolled"), "true");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.site-header')).backdropFilter"), "blur(8px)");

  await evaluate("document.querySelector('#combo').scrollIntoView({behavior:'instant'})");
  await settle();
  assert.equal(await evaluate("document.querySelector('.main-navigation a[aria-current]').hash"), "#combo");
  await evaluate("document.querySelector('.offer-panel').scrollIntoView({behavior:'instant',block:'center'})");
  await settle();
  const spot = await evaluate("(() => {const r=document.querySelector('.offer-details').getBoundingClientRect(); return {x:r.x+40,y:r.y+40};})()");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...spot });
  await pause(300);
  assert.equal(await evaluate("document.querySelector('.offer-panel').dataset.spotActive"), "true");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.offer-panel'),'::after').opacity"), "1");
  const firstX = await evaluate("document.querySelector('.offer-panel').style.getPropertyValue('--spot-x')");
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: spot.x+80, y: spot.y+30 });
  await pause(80);
  assert.notEqual(await evaluate("document.querySelector('.offer-panel').style.getPropertyValue('--spot-x')"), firstX);
  await screenshot("desktop-spotlight");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await pause(80);
  assert.equal(await evaluate("document.querySelector('.hero-detail').style.translate"), "");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.offer-panel'),'::after').display"), "none");
  await send("Emulation.setEmulatedMedia", { features: [] });

  const navigation = await auditNavigation({ send, evaluate, settle, screenshot, until, url, evidence });

  // Direct hash navigation, JavaScript disabled and failed animation fallbacks.
  await send("Page.navigate", { url: `${url}/?qa=direct#mariah` });
  await until(() => evaluate("location.search === '?qa=direct' && document.readyState === 'complete' && document.querySelector('.site-header')?.hasAttribute('data-scrolled')"), "Link direto falhou");
  await settle();
  const directTop = await evaluate("document.querySelector('#mariah').getBoundingClientRect().top");
  assert.ok(directTop >= 94 && directTop <= 135, `Link direto coberto: ${directTop}`);
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: `${url}/?qa=no-js#cursos` });
  await until(() => evaluate("location.search === '?qa=no-js' && document.readyState === 'complete' && document.querySelectorAll('.course-card').length === 11"), "Conteúdo sem JavaScript indisponível");
  assert.equal(await evaluate("document.querySelector('.site-header').hasAttribute('data-scrolled')"), false);
  assert.equal(await evaluate("[...document.querySelectorAll('.course-card')].every(e=>getComputedStyle(e).opacity==='1' && e.getBoundingClientRect().height>0)"), true);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.main-navigation')).visibility"), "visible");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.site-header')).position"), "relative");
  await evaluate("document.querySelector('.faq-item summary').focus()");
  await key("Enter", "Enter", 13);
  assert.equal(await evaluate("document.querySelector('.faq-item').open"), true);
  await evaluate("window.scrollTo({top:0,behavior:'instant'})");
  await settle();
  await screenshot("without-javascript");
  await send("Emulation.setScriptExecutionDisabled", { value: false });
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  const { identifier } = await send("Page.addScriptToEvaluateOnNewDocument", { source: "Element.prototype.animate = function(){ throw new Error('Simulated animation failure'); };" });
  await send("Page.navigate", { url });
  await until(() => evaluate("document.readyState==='complete' && document.querySelector('.site-header').hasAttribute('data-scrolled')"), "Fallback de animação falhou");
  await settle();
  assert.equal(await evaluate("getComputedStyle(document.querySelector('h1')).opacity"), "1");
  await evaluate("document.querySelector('.faq-item summary').click()");
  assert.equal(await evaluate("document.querySelector('.faq-item').open && document.querySelector('.faq-item').style.height === ''"), true);
  await send("Page.removeScriptToEvaluateOnNewDocument", { identifier });

  assert.deepEqual(errors, [], "Erros no navegador");
  const report = { stage: "4", quality, navigation, date: new Date().toISOString(), url, viewports: results, interactions: ["11 cursos, nomes e URLs preservados", "Menu animado, inert, Escape, foco e resize", "FAQ animado e reversão de cliques rápidos", "Lightbox modal, setas, loop, Tab, Escape, foco e swipe touch", "Rolagem nativa, âncoras, voltar e links diretos", "Cabeçalho com blur e seção ativa", "Parallax limitado ao desktop", "Spotlight preciso sem estado React por frame", "Redução de movimento remove efeitos", "Conteúdo e FAQ sem JavaScript", "Falha simulada de Web Animations não oculta conteúdo"], errors };
  await writeFile(`${evidence}/report.json`, JSON.stringify(report, null, 2));
  console.log(`QA final aprovada em ${results.length} larguras. Menu, FAQ, galeria, touch, histórico e fallbacks verificados. Evidências em ${evidence}.`);
  }
} finally {
  try { await send("Browser.close"); } catch {}
  browser.kill();
}
