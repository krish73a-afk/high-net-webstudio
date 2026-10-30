/* Optional aggregate analytics. Inactive until the owner supplies an account script. */
(() => {
  'use strict';
  const settings=window.HIGHNET_CONFIG?.analytics;
  const demos=['Apex Academy','Elevate Learning','The Learning Collective','Urban Bites','Saffron & Stone','Ember House','FitZone','Momentum Fitness','FORGE Performance'];
  const services=['Basic','Advanced','Premium','Data management','Video editing','Photo editing','Social media management','Post & thumbnail design','Landing page','Website maintenance','Document formatting'];
  const allowed=new Set(['Demo Preview','Service Enquiry','Contact Email','Contact WhatsApp','Quote Prepared','Enquiry Submitted',...demos.map(name=>'Demo Preview: '+name),...services.map(name=>'Service Enquiry: '+name)]);
  let active=false;
  window.HIGHNET_TRACK=name=>{if(active&&allowed.has(name))window.plausible?.(name);};
  const formReady=/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(window.HIGHNET_CONFIG?.formEndpoint||'');
  const formState=document.getElementById('privacyFormState');
  if(formReady&&formState)formState.textContent='Online submission is activated. Sending this form shares the supplied enquiry with Formspree for processing and delivery to the studio. Preparing an email draft and copying remain available alternatives.';
  const analyticsState=document.getElementById('privacyAnalyticsState');
  if(settings?.enabled&&analyticsState)analyticsState.textContent='Plausible is configured. It is inactive when Do Not Track is enabled, during local preview, or when its script is unavailable.';
  if(!settings?.enabled||!/^https:\/\/plausible\.io\/js\/pa-[a-zA-Z0-9_-]+\.js$/.test(settings.scriptUrl||'')||navigator.doNotTrack==='1'||!['https:','http:'].includes(location.protocol)||['localhost','127.0.0.1'].includes(location.hostname))return;
  const clean=value=>{try{const url=new URL(value);return url.origin+url.pathname;}catch(_){return '';}};
  window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments);};
  window.plausible.init=window.plausible.init||function(options){window.plausible.o=options||{};};
  window.plausible.init({autoCapturePageviews:false,outboundLinks:false,formSubmissions:false,logging:false,transformRequest:payload=>({...payload,u:clean(payload.u||location.href),r:clean(payload.r||document.referrer)})});
  const script=document.createElement('script');script.async=true;script.src=settings.scriptUrl;script.referrerPolicy='no-referrer';
  script.addEventListener('load',()=>{
    active=true;window.plausible('pageview',{url:location.origin+location.pathname});
    const notice=document.getElementById('privacyAnalyticsState');if(notice)notice.textContent='Plausible aggregate analytics is enabled. It measures clean page paths and the limited actions described below without sending enquiry values.';
  });
  document.head.append(script);
  document.addEventListener('click',event=>{
    const link=event.target.closest('a');if(!link||event.defaultPrevented)return;
    const href=link.getAttribute('href')||'';
    if(href.startsWith('mailto:'))window.HIGHNET_TRACK('Contact Email');
    else if(demos.includes(link.dataset.analyticsDemo))window.HIGHNET_TRACK('Demo Preview: '+link.dataset.analyticsDemo);
    else if(link.dataset.analytics)window.HIGHNET_TRACK(link.dataset.analytics);
    else if(link.dataset.service||link.dataset.package||href.includes('#contact')){
      const name=link.dataset.service||link.dataset.package;
      window.HIGHNET_TRACK(services.includes(name)?'Service Enquiry: '+name:'Service Enquiry');
    }
  });
})();
