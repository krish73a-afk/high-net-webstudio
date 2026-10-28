/* Progressive enhancements shared by the nine independent concept websites. */
(() => {
  'use strict';
  document.documentElement.classList.add('demo-ready');
  if(new URLSearchParams(location.search).get('preview')==='1')document.documentElement.classList.add('preview-capture');
  const toggle=document.querySelector('#menuToggle,#menuButton');
  const navigation=document.querySelector('#siteNav,#mainNav,#navLinks');
  if(toggle&&navigation){
    toggle.setAttribute('aria-controls',navigation.id);
    const sync=()=>{
      const open=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      if(open)navigation.querySelector('a')?.focus();
    };
    new MutationObserver(sync).observe(toggle,{attributes:true,attributeFilter:['aria-expanded']});
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')toggle.focus();
    },true);
    document.addEventListener('click',e=>{
      if(toggle.getAttribute('aria-expanded')==='true'&&!navigation.contains(e.target)&&!toggle.contains(e.target))toggle.click();
    });
    window.addEventListener('resize',()=>{
      if(getComputedStyle(toggle).display==='none'){
        navigation.classList.remove('open');document.getElementById('navShell')?.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false');
      }
    });
  }
  const main=document.querySelector('main');
  if(main&&!document.querySelector('a[href="#main"],a.skip-link')){
    if(!main.id) main.id='demo-content';
    const skip=document.createElement('a');skip.className='highnet-skip';skip.href='#'+main.id;skip.textContent='Skip to content';document.body.prepend(skip);
  }
  // Keep legacy custom dialogs keyboard-contained and restore their trigger on close.
  const dialogs=[...document.querySelectorAll('div[role="dialog"][aria-modal="true"]')];
  let lastFocus=document.activeElement;
  document.addEventListener('click',e=>{if(!e.target.closest('[role="dialog"]'))lastFocus=e.target.closest('button,a[href],input')||document.activeElement;},true);
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' ')lastFocus=document.activeElement;
    if(e.key==='Escape'){
      const toggle=document.querySelector('button[aria-expanded="true"]');
      if(toggle&&toggle.getAttribute('aria-controls')){toggle.click();toggle.focus();}
      const introButton=document.querySelector('#intro:not([hidden]):not(.done):not(.intro-hidden) #introSkip, #intro.is-playing #skipIntro');
      introButton?.click();
    }
    if(e.key!=='Tab')return;
    const modal=dialogs.find(d=>!d.hidden&&getComputedStyle(d).display!=='none');
    if(!modal)return;
    const fields=[...modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
    if(!fields.length)return;
    const first=fields[0],last=fields[fields.length-1];
    if(!modal.contains(document.activeElement)){e.preventDefault();first.focus();}
    else if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  dialogs.forEach(modal=>{
    let wasOpen=!modal.hidden,trigger=null;
    new MutationObserver(()=>{
      const open=!modal.hidden;
      if(open&&!wasOpen){trigger=lastFocus;if(!modal.contains(document.activeElement))modal.querySelector('button,a[href],input')?.focus();}
      if(!open&&wasOpen)trigger?.focus?.();
      wasOpen=open;
    }).observe(modal,{attributes:true,attributeFilter:['hidden']});
  });
  // Protect restaurant photos, including dynamically generated menu cards.
  function protect(img){
    const fallback=new URL('assets/food-fallback.svg',location.href).href;
    function replace(){if(img.src.startsWith('https://images.unsplash.com/')){img.src=fallback;img.alt='Restaurant illustration — photograph unavailable';}}
    if(!img.dataset.imageProtected){img.dataset.imageProtected='true';img.addEventListener('error',replace);}
    if(img.complete&&img.naturalWidth===0)replace();
  }
  document.querySelectorAll('img').forEach(protect);
  new MutationObserver(records=>records.forEach(record=>{
    if(record.type==='attributes')protect(record.target);
    else record.addedNodes.forEach(node=>{if(node.nodeType!==1)return;if(node.matches('img'))protect(node);node.querySelectorAll('img').forEach(protect);});
  })).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
  // Synchronise active filter state for the restaurant's dynamic category buttons.
  const menuFilters=document.getElementById('menuFilters');
  if(menuFilters){
    const sync=()=>menuFilters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('active'))));
    sync();menuFilters.addEventListener('click',sync);
  }
})();
