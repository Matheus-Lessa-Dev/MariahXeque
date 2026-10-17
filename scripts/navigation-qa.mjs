import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

/** Real click trajectories: checking only the final hash cannot detect a jump. */
export async function auditNavigation({ send, evaluate, settle, screenshot, until, url, evidence }) {
  const paths = [];
  const inventories = [];
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function rawClick(selector) {
    const point = await evaluate(`(() => {const e=document.querySelector(${JSON.stringify(selector)}); const r=e.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", ...point, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", ...point, button: "left", clickCount: 1 });
  }
  async function installProbe() {
    await evaluate(`(() => {
      window.__navigationProbe={running:false,points:[],calls:[],focus:[],longTasks:[]};
      const probe=window.__navigationProbe;
      const scroll=Element.prototype.scrollIntoView, focus=HTMLElement.prototype.focus;
      Element.prototype.scrollIntoView=function(options){if(probe.running)probe.calls.push({id:this.id,options});return scroll.call(this,options);};
      HTMLElement.prototype.focus=function(options){if(probe.running)probe.focus.push({id:this.id,options});return focus.call(this,options);};
      function click(){ if(!probe.running)return; const start=performance.now(); probe.clickedAt=start;
        function sample(){if(!probe.running)return;probe.points.push({t:performance.now()-start,y:scrollY,menu:getComputedStyle(document.querySelector('.main-navigation')).visibility});requestAnimationFrame(sample);}requestAnimationFrame(sample);
      }
      document.addEventListener('click',click,true);
      let observer;try{observer=new PerformanceObserver(list=>{for(const e of list.getEntries())probe.longTasks.push({start:e.startTime,duration:e.duration});});observer.observe({type:'longtask'});}catch{}
      probe.restore=()=>{probe.running=false;Element.prototype.scrollIntoView=scroll;HTMLElement.prototype.focus=focus;document.removeEventListener('click',click,true);observer?.disconnect();};
    })()`);
  }
  async function beginTrace() {
    return evaluate(`(() => {const p=window.__navigationProbe;p.points=[];p.calls=[];p.focus=[];p.running=true;return {y:scrollY,historyLength:history.length};})()`);
  }
  async function finishTrace() {
    return evaluate(`(() => {const p=window.__navigationProbe;p.running=false;return {points:p.points,calls:p.calls,focus:p.focus,y:scrollY,hash:location.hash,focusId:document.activeElement.id};})()`);
  }
  async function waitForTarget(hash) {
    await until(() => evaluate(`(() => {const e=document.getElementById(${JSON.stringify(hash.slice(1))}); if(!e)return false;const top=e.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(e).scrollMarginTop);const expected=Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));return Math.abs(scrollY-expected)<2 && location.hash===${JSON.stringify(hash)};})()`), `Destino não alcançado: ${hash}`, 6000);
    await settle();
  }
  function assertSmooth(trace, startY, label) {
    const distance = Math.abs(trace.y - startY);
    const intermediate = trace.points.filter(p => Math.abs(p.y-startY)>1 && Math.abs(p.y-trace.y)>1);
    if (distance > 200) assert.ok(new Set(intermediate.map(p=>p.y)).size >= 4, `Salto sem posições intermediárias: ${label}`);
    assert.equal(trace.calls.length, 1, `Um único pedido de rolagem: ${label}`);
    assert.equal(trace.calls[0].options.behavior, "smooth");
    assert.equal(trace.focus.length, 1, `Foco aplicado uma vez: ${label}`);
    return { distance, intermediateFrames: intermediate.length, durationMs: Math.round(trace.points.findLast(p=>Math.abs(p.y-trace.y)>1)?.t || 0) };
  }

  for (const width of [1440, 390]) {
    const mobile = width < 960;
    await send("Emulation.setDeviceMetricsOverride", { width, height: mobile ? 844 : 1000, deviceScaleFactor: 1, mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
    await send("Page.navigate", { url: `${url}/?qa=navigation-${width}` });
    await until(() => evaluate("document.readyState==='complete' && document.querySelector('.site-header')?.hasAttribute('data-scrolled')"), "Navegação não inicializou");
    await evaluate("Promise.all([...document.images].map(async i=>{i.loading='eager';try{await i.decode();}catch{}}))");
    await settle();
    await installProbe();
    const inventory = await evaluate(`[...document.querySelectorAll('a[href^="#"]')].map((a,index)=>{a.dataset.qaAnchor=index;const hash=a.getAttribute('href');return {index,hash,label:a.getAttribute('aria-label')||a.textContent.trim(),menu:!!a.closest('.main-navigation'),header:!!a.closest('.site-header'),skip:a.classList.contains('skip-link'),matches:document.querySelectorAll('[id="'+hash.slice(1)+'"]').length};})`);
    assert.equal(inventory.length, 14, "Inventário dos 14 links internos existentes");
    assert.ok(inventory.every(a=>a.matches===1), "IDs existentes e únicos");
    inventories.push({ width, links: inventory });

    for (const link of inventory) {
      const selector = `[data-qa-anchor="${link.index}"]`;
      if (link.header || link.skip) {
        await evaluate(`window.scrollTo({top:${link.hash==="#inicio" || link.skip || link.index%2 ? "document.documentElement.scrollHeight" : "0"},behavior:'instant'})`);
      } else await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);
      if (link.skip) await evaluate(`document.querySelector(${JSON.stringify(selector)}).focus({preventScroll:true})`);
      await settle();
      if (mobile && link.menu) { await rawClick(".menu-toggle"); await settle(); }
      const start = await beginTrace();
      await rawClick(selector);
      if (mobile && link.menu && link.hash === "#duvidas") { await pause(100); await screenshot("mobile-navigation-in-progress"); }
      await waitForTarget(link.hash);
      const trace = await finishTrace();
      const motion = assertSmooth(trace, start.y, `${width}px ${link.label}`);
      assert.equal(trace.focusId, link.hash.slice(1));
      if (mobile && link.menu) {
        assert.ok(trace.points.every(p=>p.menu==='hidden'), "Menu fechado antes do primeiro frame de navegação");
        assert.equal(await evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')"), "false");
      }
      paths.push({ width, ...link, startY: start.y, endY: trace.y, ...motion, samples: trace.points });
    }
    console.log(`${width}px: 14 trajetórias internas, foco único e destinos verificados.`);

    // Modified activations must leave the app untouched, including an open menu.
    if (mobile) { await rawClick(".menu-toggle"); await settle(); }
    const modified = await evaluate(`(() => {const a=document.querySelector('.main-navigation a[href="#cursos"]');const before={y:scrollY,hash:location.hash,focus:document.activeElement,open:document.querySelector('.menu-toggle').getAttribute('aria-expanded')};const results=[];
      for(const modifier of ['ctrlKey','metaKey','shiftKey','altKey']) {let prevented;const read=e=>{prevented=e.defaultPrevented;e.preventDefault();};document.addEventListener('click',read,{once:true});a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,button:0,[modifier]:true}));results.push({modifier,prevented});}
      return {results,stable:scrollY===before.y&&location.hash===before.hash&&document.activeElement===before.focus&&document.querySelector('.menu-toggle').getAttribute('aria-expanded')===before.open};})()`);
    assert.ok(modified.stable); assert.ok(modified.results.every(r=>!r.prevented));
    if (mobile) { await rawClick(".menu-toggle"); await settle(); }

    // External destinations get no preventDefault, hash change, focus or scrolling.
    const external = await evaluate(`(() => {const links=[...document.querySelectorAll('a[href^="https://hotmart.com/"]')];const before={y:scrollY,hash:location.hash,focus:document.activeElement};const results=[];
      for(const a of links){let prevented;const read=e=>{prevented=e.defaultPrevented;e.preventDefault();};document.addEventListener('click',read,{once:true});a.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,button:0}));results.push({href:a.href,prevented});}
      return {results,stable:scrollY===before.y&&location.hash===before.hash&&document.activeElement===before.focus};})()`);
    assert.equal(external.results.length, 14); assert.ok(external.stable); assert.ok(external.results.every(r=>!r.prevented));

    await evaluate("window.__navigationProbe.restore()");
  }

  // Superseding clicks use the browser's cancellation; no custom tween queue.
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Emulation.setTouchEmulationEnabled", { enabled: false });
  await evaluate("window.scrollTo({top:0,behavior:'instant'})"); await settle();
  await installProbe();
  await beginTrace();
  await rawClick('.main-navigation a[href="#duvidas"]');
  await pause(90);
  await rawClick('.main-navigation a[href="#cursos"]');
  await waitForTarget("#cursos");
  const interrupted = await finishTrace();
  assert.equal(interrupted.calls.length, 2); assert.equal(interrupted.hash, "#cursos"); assert.equal(interrupted.focusId, "cursos");
  await pause(300); assert.equal(await evaluate("location.hash"), "#cursos");

  const sameHistoryLength = await evaluate("history.length");
  await evaluate("window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'})"); await settle();
  const sameStart = await beginTrace();
  await rawClick('.main-navigation a[href="#cursos"]'); await waitForTarget("#cursos");
  assertSmooth(await finishTrace(), sameStart.y, "Hash repetido");
  assert.equal(await evaluate("history.length"), sameHistoryLength);

  // Explicit native behavior also survives a conflicting global auto rule.
  await evaluate("document.documentElement.style.setProperty('scroll-behavior','auto','important');window.scrollTo({top:0,behavior:'instant'})"); await settle();
  const conflictStart = await beginTrace();
  await rawClick('.main-navigation a[href="#combo"]'); await waitForTarget("#combo");
  const cssConflict = assertSmooth(await finishTrace(), conflictStart.y, "Regra global scroll-behavior:auto");
  await evaluate("document.documentElement.style.removeProperty('scroll-behavior')");

  await rawClick('.main-navigation a[href="#combo"]'); await waitForTarget("#combo");
  const comboY = await evaluate("scrollY");
  await rawClick('.main-navigation a[href="#duvidas"]'); await waitForTarget("#duvidas");
  const faqY = await evaluate("scrollY");
  await evaluate("history.back()");
  await until(() => evaluate("location.hash==='#combo'"), "Voltar não restaurou o hash"); await settle();
  assert.ok(Math.abs(await evaluate("scrollY") - comboY)<2, "Voltar preserva posição");
  await evaluate("history.forward()");
  await until(() => evaluate("location.hash==='#duvidas'"), "Avançar não restaurou o hash"); await settle();
  assert.ok(Math.abs(await evaluate("scrollY") - faqY)<2, "Avançar preserva posição");
  assert.equal(await evaluate("history.scrollRestoration"), "auto");

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await evaluate("window.scrollTo({top:0,behavior:'instant'})"); await settle();
  await beginTrace(); await rawClick('.main-navigation a[href="#mariah"]'); await waitForTarget("#mariah");
  const reduced = await finishTrace();
  assert.equal(reduced.calls.length, 1); assert.equal(reduced.calls[0].options.behavior, "instant");
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"), "auto");
  await send("Emulation.setEmulatedMedia", { features: [] });

  // Local frame/long-task observations and real wheel/touch input, not an FPS guarantee.
  await send("Performance.enable");
  const before = await send("Performance.getMetrics");
  await evaluate("window.scrollTo({top:0,behavior:'instant'});window.__wheel={prevented:null,start:performance.now(),y:scrollY};window.addEventListener('wheel',e=>{window.__wheel.prevented=e.defaultPrevented;},{once:true,passive:true})");
  await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 600, y: 500, deltaX: 0, deltaY: 450 });
  await until(() => evaluate("scrollY>100"), "Roda do mouse não move a página", 1000);
  const wheel = await evaluate("({...window.__wheel,firstObservedY:scrollY,observationMs:performance.now()-window.__wheel.start})");
  assert.equal(wheel.prevented, false); await settle();
  for (let i=0; i<12; i++) await send("Input.dispatchMouseEvent", { type: "mouseWheel", x: 600, y: 500, deltaX: 0, deltaY: 55 });
  await settle();
  const after = await send("Performance.getMetrics");
  const metrics = Object.fromEntries(after.metrics.filter(m=>["LayoutCount","LayoutDuration","RecalcStyleCount","RecalcStyleDuration","ScriptDuration","TaskDuration"].includes(m.name)).map(m=>[m.name,m.value-(before.metrics.find(b=>b.name===m.name)?.value||0)]));
  const longTasks = await evaluate("window.__navigationProbe.longTasks");
  await evaluate("window.__navigationProbe.restore()");

  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Emulation.setTouchEmulationEnabled", { enabled: true });
  await evaluate("window.scrollTo({top:0,behavior:'instant'})"); await settle();
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.site-header')).backdropFilter"), "none");
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 190, y: 650, id: 1 }] });
  for (const y of [590, 520, 450, 380, 300]) { await send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 190, y, id: 1 }] }); await pause(20); }
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await until(() => evaluate("scrollY>100"), "Gesto vertical não move a página", 1000); await settle();
  const touch = { y: await evaluate("scrollY") };
  await screenshot("mobile-after-vertical-swipe");

  for (const width of [390, 1440]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: width===390 ? 844 : 1000, deviceScaleFactor: 1, mobile: width===390 });
    await send("Page.navigate", { url: `${url}/?qa=direct-stage4-${width}#mariah` });
    await until(() => evaluate("document.readyState==='complete' && document.querySelector('.site-header')?.hasAttribute('data-scrolled')"), "URL direta não carregou");
    await settle();
    const position=await evaluate("({top:document.querySelector('#mariah').getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom})");
    assert.ok(position.top>=position.header && position.top<=position.header+22);
    await screenshot(`direct-anchor-${width}`);
  }
  await send("Emulation.setTouchEmulationEnabled", { enabled: false });
  const frameGaps=paths.flatMap(p=>p.samples.slice(1).map((s,i)=>s.t-p.samples[i].t)).sort((a,b)=>a-b);
  const report={inventories,paths,cssConflict,modifiedAndExternalClicks:"not intercepted",rapidClicks:interrupted.calls,history:{comboY,faqY,restoration:"auto"},reduced:reduced.calls,wheel,touch,performance:{metrics,longTasks,frameGapP95Ms:frameGaps[Math.floor(frameGaps.length*.95)],maxFrameGapMs:frameGaps.at(-1),environment:"Chrome headless local, GPU disabled; no physical-device or field-performance claim"}};
  await writeFile(`${evidence}/navigation-report.json`,JSON.stringify(report,null,2));
  console.log("Trajetórias, histórico, cliques modificados/externos, wheel, toque e observações locais de desempenho verificados.");
  return report;
}
