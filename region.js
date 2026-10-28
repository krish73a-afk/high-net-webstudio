/* Currency display only: Indian base prices are unchanged. Reference source: Frankfurter. */
(() => {
  'use strict';
  const pricing=window.HIGHNET_PRICING;
  const REGIONS=Object.freeze({
    in:{name:'India',currency:'INR',locale:'en-IN',digits:0},
    us:{name:'United States',currency:'USD',locale:'en-US',digits:2},
    uk:{name:'United Kingdom',currency:'GBP',locale:'en-GB',digits:2},
    eu:{name:'Europe',currency:'EUR',locale:'en-IE',digits:2},
    ae:{name:'United Arab Emirates',currency:'AED',locale:'en-AE',digits:2},
    au:{name:'Australia',currency:'AUD',locale:'en-AU',digits:2},
    ca:{name:'Canada',currency:'CAD',locale:'en-CA',digits:2}
  });
  // A real dated snapshot keeps the site usable from a folder and without network access.
  const FALLBACK={dates:{AED:'2026-10-28',AUD:'2026-10-28',CAD:'2026-10-28',EUR:'2026-10-28',GBP:'2026-10-28',USD:'2026-10-28'},rates:{AED:0.038615,AUD:0.014966,CAD:0.014746,EUR:0.0094241,GBP:0.0078888,USD:0.010515}};
  const ENDPOINT='https://api.frankfurter.dev/v2/rates?base=INR&quotes=USD,GBP,EUR,AED,AUD,CAD';
  const CACHE_KEY='highnet-currency-rates-v1';
  let regionCode='in',book=FALLBACK;
  const region=()=>REGIONS[regionCode];
  const rate=()=>regionCode==='in'?1:book.rates[region().currency];
  const round=amount=>{const unit=10**region().digits;return Math.round((amount+Number.EPSILON)*unit)/unit;};
  function fraction(value){
    const [mantissa,exponent='0']=String(value).toLowerCase().split('e');
    const decimals=(mantissa.split('.')[1]||'').length-Number(exponent);
    const numerator=BigInt(mantissa.replace('.',''));
    return decimals<0?{n:numerator*10n**BigInt(-decimals),d:1n}:{n:numerator,d:10n**BigInt(decimals)};
  }
  function convert(inr){
    // Exact decimal rounding avoids binary-float errors at half-cent boundaries.
    const a=fraction(Number(inr)),b=fraction(rate()),unit=10n**BigInt(region().digits);
    const numerator=a.n*b.n*unit,denominator=a.d*b.d;
    return Number((2n*numerator+denominator)/(2n*denominator))/Number(unit);
  }
  function formatAmount(amount,approximate=true){
    const r=region();const text=new Intl.NumberFormat(r.locale,{style:'currency',currency:r.currency,minimumFractionDigits:r.digits,maximumFractionDigits:r.digits}).format(amount);
    return (approximate&&regionCode!=='in'?'≈ ':'')+text;
  }
  const format=inr=>formatAmount(convert(inr));
  const convertText=text=>String(text).replace(/₹\s*([\d,]+(?:\.\d+)?)/g,(_,number)=>format(Number(number.replace(/,/g,''))));
  function quote(tier,pages=0,copy=false,gallery=false){
    if(!Object.hasOwn(pricing.tiers,tier))tier='basic';
    pages=Math.max(0,Math.min(5,Math.trunc(Number(pages))||0));
    const baseInr=pricing.tiers[tier]+pages*pricing.extraPage+(copy?pricing.copy:0)+(gallery?pricing.gallery:0);
    // Convert and round each displayed unit first, so the visible items add to the total.
    const amount=round(convert(pricing.tiers[tier])+pages*convert(pricing.extraPage)+(copy?convert(pricing.copy):0)+(gallery?convert(pricing.gallery):0));
    return {baseInr,amount,text:formatAmount(amount),region:regionCode,regionName:region().name,currency:region().currency,date:regionCode==='in'?null:book.dates[region().currency]};
  }
  function url(path){
    const target=new URL(path,location.href);target.searchParams.set('region',regionCode);
    return target.pathname.split('/').pop()+target.search+target.hash;
  }
  function selectRegion(code){
    if(!Object.hasOwn(REGIONS,code))return false;
    regionCode=code;
    if(typeof document!=='undefined'){
      try{localStorage.setItem('highnet-region',code);}catch(_){}
      refresh();document.dispatchEvent(new CustomEvent('highnet:regionchange'));
    }
    return true;
  }
  window.HIGHNET_CURRENCY=Object.freeze({format,convertText,quote,url,selectRegion,code:()=>regionCode,currency:()=>region().currency,regionName:()=>region().name});
  // The calculation can also be verified without a browser or any network dependency.
  if(typeof document==='undefined')return;
  const select=document.getElementById('regionSelect');
  const originals=new WeakMap();let scheduled=false;
  function refreshPrices(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,textarea,#regionSelect')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      const previous=originals.get(node);let source;
      if(previous&&node.data===previous.rendered)source=previous.source;
      else if(/₹\s*[\d,]+/.test(node.data))source=node.data;
      else{originals.delete(node);continue;}
      const rendered=convertText(source);originals.set(node,{source,rendered});
      if(node.data!==rendered)node.data=rendered;
    }
    document.querySelectorAll('[data-currency-code]').forEach(el=>{if(el.textContent!==region().currency)el.textContent=region().currency;});
  }
  function decorateLinks(){
    const directory=new URL('.',location.href).pathname;
    document.querySelectorAll('a[href]').forEach(a=>{
      const raw=a.getAttribute('href');if(!raw||raw.startsWith('#'))return;
      let target;try{target=new URL(raw,location.href);}catch(_){return;}
      const file=target.pathname.slice(directory.length);
      if(target.origin!==location.origin||!target.pathname.startsWith(directory)||!['index.html','services.html','projects.html','demos.html'].includes(file))return;
      const next=url(raw);if(raw!==next)a.setAttribute('href',next);
    });
  }
  function refresh(){
    if(select){select.disabled=false;select.value=regionCode;}
    refreshPrices();decorateLinks();
    const strip=document.getElementById('regionPricingStrip'),note=document.getElementById('regionPricingNote');
    if(strip)strip.hidden=regionCode==='in';
    if(note){
      const date=regionCode==='in'?'':new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(book.dates[region().currency]+'T00:00:00Z'));
      const text=regionCode==='in'?'Studio prices are shown in INR.':`${region().name} · Approximate ${region().currency} equivalents of our INR prices · Reference rates: ${date}. Final quote confirmed before work starts.`;
      if(note.textContent!==text)note.textContent=text;
    }
  }
  const incoming=new URLSearchParams(location.search).get('region');
  let saved;try{saved=localStorage.getItem('highnet-region');}catch(_){}
  regionCode=Object.hasOwn(REGIONS,incoming)?incoming:Object.hasOwn(REGIONS,saved)?saved:'in';
  function validBook(candidate){
    return candidate&&Object.keys(FALLBACK.rates).every(code=>Number.isFinite(candidate.rates?.[code])&&candidate.rates[code]>0&&candidate.rates[code]<100&&/^20\d{2}-\d{2}-\d{2}$/.test(candidate.dates?.[code]||'')&&Number.isFinite(Date.parse(candidate.dates[code]+'T00:00:00Z')));
  }
  let cached=null;
  try{const value=JSON.parse(localStorage.getItem(CACHE_KEY));if(validBook(value)){book=value;cached=value;}}catch(_){}
  refresh();
  select?.addEventListener('change',()=>{
    if(!selectRegion(select.value))return;
    const current=new URL(location.href);current.searchParams.set('region',regionCode);
    try{history.replaceState(null,'',current);}catch(_){}
  });
  new MutationObserver(()=>{
    if(scheduled)return;scheduled=true;
    queueMicrotask(()=>{scheduled=false;refreshPrices();decorateLinks();});
  }).observe(document.body,{subtree:true,childList:true,characterData:true});
  // Refresh daily reference rates with a short timeout; never block the selector or pricing.
  async function refreshRates(){
    if(cached&&Number.isFinite(cached.savedAt)&&Date.now()-cached.savedAt>=0&&Date.now()-cached.savedAt<86400000)return;
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4500);
    try{
      const response=await fetch(ENDPOINT,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
      if(!response.ok)return;const rows=await response.json();if(!Array.isArray(rows))return;
      const next={rates:{},dates:{},savedAt:Date.now()};
      for(const row of rows){if(row.base==='INR'&&Object.hasOwn(FALLBACK.rates,row.quote)){next.rates[row.quote]=row.rate;next.dates[row.quote]=row.date;}}
      if(!validBook(next))return;book=next;
      try{localStorage.setItem(CACHE_KEY,JSON.stringify(next));}catch(_){}
      refresh();document.dispatchEvent(new CustomEvent('highnet:regionchange'));
    }catch(_){/* Use the dated cached or bundled reference rates. */}finally{clearTimeout(timer);}
  }
  refreshRates();
})();
