import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";


// Browser QA using Chromium's DevTools pipe; no browser automation dependency.
const url = process.env.QA_URL || "http://127.0.0.1:3000";
const chrome = process.env.QA_BROWSER_PATH || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/chromium", "/usr/bin/google-chrome",
].find(existsSync);
if (!chrome) throw new Error("Navegador não encontrado. Configure QA_BROWSER_PATH.");
const evidence = process.env.QA_EVIDENCE_DIR || ".work/qa-reference";
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
  browser.on('error', error=>errors.push(error.message));
  console.log((await send('Browser.getVersion')).product);
  const {targetId}=await send('Target.createTarget',{url:'about:blank'});
  ({sessionId}=await send('Target.attachToTarget',{targetId,flatten:true}));
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url});
  await until(()=>evaluate("document.readyState==='complete' && !!document.querySelector('.universe-menu')"),'Página atualizada não carregou');
  await settle();
  const expected=[{title:'Curso Entre Fios e Cristais',url:'https://go.hotmart.com/W107711262G'},...expectedCourses,{title:'Curso Blusa Atena',url:null}];
  assert.deepEqual(await evaluate("[...document.querySelectorAll('[data-course-id]')].map(e=>({title:e.querySelector('h3').textContent,url:e.querySelector('a')?.href||null}))"),expected);
  assert.equal(await evaluate("new Set([...document.querySelectorAll('[data-course-id] a')].map(a=>a.href)).size"),12);
  const phrases={glow:'Descubra a técnica que transforma crochê e pedrarias em joias únicas.',colares:'Transforme fios em colares únicos, cheios de estilo e personalidade.',flowers:'Aprenda a criar três modelos de brincos florais em crochê.',ariel:'Aprenda a criar um colar sofisticado com fios, pérolas e contas.','fios-em-festa':'Aprenda a criar brincos e braceletes em crochê com fios, texturas e cores marcantes.','blusa-atena':'Do zero ao acabamento, uma Blusa cheia de charme e estilo!'};
  for(const [id,phrase] of Object.entries(phrases)) {
    assert.equal(await evaluate(`document.querySelector('[data-course-id="${id}"] .course-card__content p').textContent`),phrase);
    const comboDescription=await evaluate(`document.querySelector('[data-combo-course-id="${id}"] .combo-course__info p')?.textContent||null`);
    if(comboDescription) assert.equal(comboDescription,phrase);
  }
  assert.equal(await evaluate("document.querySelector('.croche-hero__label').textContent"),'MARIAH XEQUE ATELIÊ');
  assert.equal(await evaluate("document.querySelector('.croche-hero__content > p').textContent"),'Aprenda a criar joias e acessórios em crochê, desenvolva sua criatividade e descubra novas possibilidades para o seu trabalho artesanal.');
  assert.equal(await evaluate("document.querySelector('.courses-header__right p').textContent"),'Explore os cursos e descubra técnicas para transformar fios em peças únicas, sofisticadas e cheias de personalidade.');
  assert.equal(await evaluate("document.querySelector('.reference-header, #duvidas, iframe')"),null);
  assert.equal(await evaluate("document.querySelectorAll('a[href=\"#\"],a[href=\"\"],a:not([href])').length"),0);
  assert.equal(await evaluate("[...document.querySelectorAll('a[href^=\"#\"]')].every(a=>document.getElementById(a.hash.slice(1)))"),true);
  assert.equal(await evaluate("document.querySelectorAll('.universe-menu__item').length"),4);
  assert.equal(await evaluate("document.querySelectorAll('.universe-menu__item--unavailable').length"),0);
  assert.equal(await evaluate("document.querySelectorAll('.universe-menu a').length"),4);
  assert.equal(await evaluate(`document.querySelector('.universe-menu a[href="https://www.youtube.com/@mariahxeque"]').textContent.includes('Meu canal no YouTube')`),true);
  assert.equal(await evaluate(`document.querySelector('.universe-menu a[href="https://www.instagram.com/mariahxeque/"]').textContent.includes('Acompanhe meu trabalho')`),true);
  assert.equal(await evaluate("document.querySelectorAll('.universe-menu__item--unavailable a').length"),0);
  assert.equal(await evaluate("document.querySelector('[data-course-id=\"blusa-atena\"] a')"),null);
  assert.equal(await evaluate("document.querySelector('[data-physical-product=\"solare\"] h3').textContent"),'Conjunto Solare');
  assert.equal(await evaluate("document.querySelector('.atelier-piece__price').textContent"),'R$ 139,90 + frete');
  assert.equal(await evaluate("document.querySelector('#encomendas a[href*=\"hotmart\"]')"),null);
  assert.equal(await evaluate("document.querySelector('[data-physical-product=\"solare\"] img')"),null);
  assert.equal(await evaluate("document.querySelector('#mw-final-cta a')"),null);
  assert.equal(await evaluate("/12 cursos inclusos|acesso vitalício|Bolsa Sofia|139,90/.test(document.querySelector('#combo').innerText)"),false);
  assert.equal(await evaluate("/COLE[-_]AQUI|URL-DA-IMAGEM|LINK_CHECKOUT|Novo Curso|Minha sugestão para o início do site/i.test(document.body.innerText)"),false);
  assert.equal(await evaluate("document.querySelector('.mw-footer a[href*=\"/club/\"]').href"),'https://hotmart.com/pt-br/club/mariah-xeque');

  // Carregar também as capas fora do viewport para auditar os arquivos e as capturas integrais.
  await evaluate("document.querySelectorAll('img').forEach(image=>{image.loading='eager'})");
  await until(()=>evaluate("[...document.querySelectorAll('img')].every(image=>image.complete&&image.naturalWidth>0)"),'Imagem local indisponível');
  for(const width of [360,390,768,1024,1440,1920]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:width<768?844:1000,deviceScaleFactor:1,mobile:width<768});
    await evaluate("scrollTo({top:0,behavior:'instant'});document.querySelector('#coursesTrack').scrollTo({left:0,behavior:'instant'})");
    await pause(150);await settle();
    const metrics=await evaluate(`({width:innerWidth,client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,courses:document.querySelectorAll('[data-course-id]').length,comboColumns:getComputedStyle(document.querySelector('.combo-course-grid')).gridTemplateColumns.split(' ').length,menuColumns:getComputedStyle(document.querySelector('.universe-menu__grid')).gridTemplateColumns.split(' ').length})`);
    assert.ok(metrics.scroll<=metrics.client+1,JSON.stringify(metrics));
    assert.equal(metrics.courses,13);
    assert.equal(metrics.comboColumns,width<=520?1:width<=1000?2:4);
    assert.equal(metrics.menuColumns,width<=767?1:2);
    await screenshot(`${width}-inicio`);
    for(const [name,selector] of [['menu','.universe-menu'],['cursos','#cursos'],['combo','#combo'],['encomendas','#encomendas']]) await reviewSection(`${width}-${name}`,selector);
    await until(()=>evaluate("[...document.querySelectorAll('.combo-course-grid img')].every(i=>i.complete&&i.naturalWidth>0)"),'Capa do combo não carregou');
    await evaluate("document.querySelector('#coursesTrack').scrollTo({left:99999,behavior:'instant'})");await pause(180);
    await until(()=>evaluate("[...document.querySelectorAll('#coursesTrack img')].every(i=>i.complete&&i.naturalWidth>0)"),'Capa do catálogo não carregou');
    assert.equal(await evaluate("document.querySelector('.courses-arrow--next').disabled"),true);
    await screenshot(`${width}-ultimo-curso`);
    results.push(metrics);console.log(`Layout ${width}px aprovado.`);
  }

  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await evaluate("document.querySelector('#coursesTrack').scrollTo({left:0,behavior:'instant'})");await pause(180);
  await click('.courses-arrow--next');await pause(500);
  assert.ok(await evaluate("document.querySelector('#coursesTrack').scrollLeft>100"));
  await click('.courses-arrow--prev');await pause(500);
  assert.ok(await evaluate("document.querySelector('#coursesTrack').scrollLeft<5"));
  await evaluate("document.querySelector('#coursesTrack').focus()");await key('ArrowRight','ArrowRight',39);await pause(500);
  assert.ok(await evaluate("document.querySelector('#coursesTrack').scrollLeft>100"));
  const point=await evaluate("(()=>{const r=document.querySelector('#coursesTrack').getBoundingClientRect();return {x:r.x+r.width*.7,y:r.y+100}})()");
  const before=await evaluate("document.querySelector('#coursesTrack').scrollLeft");
  await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
  for(let d=20;d<=280;d+=20)await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x-d,y:point.y,button:'left',buttons:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x-280,y:point.y,button:'left',clickCount:1});await pause(200);
  assert.ok(await evaluate("document.querySelector('#coursesTrack').scrollLeft")>before+100);
  assert.equal(await evaluate('location.origin'),new URL(url).origin);

  await click('.combo-course__image');await until(()=>evaluate("document.querySelector('dialog').open"),'Galeria não abriu');
  await key('ArrowRight','ArrowRight',39);assert.equal(await evaluate("document.querySelector('#lightbox-title').textContent"),'Curso Flowers — Brinco Frida + 02 Modelos Bônus');
  await screenshot('desktop-ampliacao');await key('Escape','Escape',27);await pause(120);
  assert.equal(await evaluate("document.activeElement.className"),'combo-course__image');
  assert.equal(await evaluate("document.body.style.overflow"),'');

  const navigation=[];
  for(const width of [390,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:width<768?844:1000,deviceScaleFactor:1,mobile:width<768});
    for(const id of ['cursos','encomendas']) {
      await click(`.universe-menu a[href="#${id}"]`);await settle();
      const result=await evaluate(`({hash:location.hash,focus:document.activeElement.id,top:document.getElementById('${id}').getBoundingClientRect().top})`);
      assert.equal(result.hash,`#${id}`);assert.equal(result.focus,id);assert.ok(result.top>=14&&result.top<=18,JSON.stringify(result));navigation.push({width,...result});
    }
    await evaluate('history.back()');await settle();assert.equal(await evaluate('location.hash'),'#cursos');
    await evaluate('history.forward()');await settle();assert.equal(await evaluate('location.hash'),'#encomendas');
  }
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await click('.croche-hero__button');await settle();assert.equal(await evaluate('location.hash'),'#cursos');
  assert.equal(await evaluate('getComputedStyle(document.documentElement).scrollBehavior'),'auto');
  await send('Emulation.setEmulatedMedia',{features:[]});

  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate("document.querySelector('#coursesTrack').scrollTo({left:0,behavior:'instant'});document.querySelector('#coursesTrack').scrollIntoView({block:'center',behavior:'instant'})");await settle();
  const touch=await evaluate("(()=>{const r=document.querySelector('#coursesTrack').getBoundingClientRect();return {x:r.x+260,y:Math.max(150,r.y+120)}})()");
  await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...touch,id:1}]});
  for(let d=20;d<=200;d+=20){await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touch.x-d,y:touch.y,id:1}]});await pause(16);}
  await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await pause(600);
  assert.ok(await evaluate("document.querySelector('#coursesTrack').scrollLeft>50"));
  await send('Page.navigate',{url:`${url}/?qa=direct#encomendas`});
  await until(()=>evaluate("location.search==='?qa=direct'&&document.readyState==='complete'"),'Hash direto');await settle();
  assert.ok(await evaluate("document.querySelector('#encomendas').getBoundingClientRect().top>=14"));
  await send('Emulation.setScriptExecutionDisabled',{value:true});await send('Page.navigate',{url:`${url}/?qa=no-js`});
  await until(()=>evaluate("location.search==='?qa=no-js'&&document.readyState==='complete'"),'Sem JavaScript');
  assert.equal(await evaluate("document.querySelectorAll('[data-course-id]').length"),13);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.universe-menu')).visibility"),'visible');
  assert.equal(await evaluate("document.querySelectorAll('.combo-course').length"),8);
  await screenshot('mobile-sem-javascript');await send('Emulation.setScriptExecutionDisabled',{value:false});
  assert.deepEqual(errors,[],'Erros no navegador');
  await writeFile(`${evidence}/report.json`,JSON.stringify({date:new Date().toISOString(),url,viewports:results,navigation,courses:expected,errors,checks:['Textos exatos e descrições consistentes','Menu inicial e redes sem destino fictício','13 cursos, 12 destinos únicos, prioridade Entre Fios e Cristais','Combo em grade 4/2/1 sem condições inventadas','Solare separado de cursos, preço correto, foto e contato pendentes','Carrossel geral com setas, teclado, arraste e toque','Galeria ampliada e retorno de foco','Âncoras, histórico, movimento reduzido e conteúdo sem JavaScript']},null,2));
  console.log(`QA cliente 19/10 aprovada em ${results.length} larguras. Evidências: ${evidence}`);
} finally {try{await send('Browser.close');}catch{}browser.kill();}
