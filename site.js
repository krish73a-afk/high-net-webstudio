/* Shared navigation, theme and page chrome. Each page owns its own interactions. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = s => document.querySelector(s);
  const nav=$('#siteNav'),toggle=$('#menuToggle'),theme=$('#themeToggle');
  document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
  function applyTheme(value){
    const light=value==='light';document.body.dataset.theme=light?'light':'dark';
    if(theme){theme.textContent=light?'☾':'☼';theme.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');}
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',light?'#f3f4eb':'#101411');
    try{localStorage.setItem('highnet-theme',light?'light':'dark');}catch(_){}
  }
  let saved='dark';try{saved=localStorage.getItem('highnet-theme')||'dark';}catch(_){}
  applyTheme(saved);theme?.addEventListener('click',()=>applyTheme(document.body.dataset.theme==='light'?'dark':'light'));
  function closeMenu(){
    if(!nav||!toggle)return;
    if(nav.contains(document.activeElement)&&toggle.getClientRects().length)toggle.focus();
    nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');
  }
  toggle?.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    if(open)nav.querySelector('a')?.focus();
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(nav&&toggle&&!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
  window.addEventListener('resize',()=>{if(innerWidth>860)closeMenu();});
  const progress=$('#readingProgress');let queued=false;
  function progressUpdate(){queued=false;if(!progress)return;const range=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${range>0?Math.min(100,scrollY/range*100):0}%`;}
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progressUpdate);}},{passive:true});
  window.addEventListener('resize',progressUpdate);window.addEventListener('load',progressUpdate);progressUpdate();
  const reveal=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.04});
    reveal.forEach(el=>observer.observe(el));
  }else reveal.forEach(el=>el.classList.add('visible'));
})();
