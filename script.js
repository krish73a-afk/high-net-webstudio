/* Homepage: recommendations, live demo showcase and an honest email enquiry. */
(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const currency=window.HIGHNET_CURRENCY;
  // Keep old bookmarks useful after moving these sections to their own pages.
  const oldPages={'#services':'services.html#services','#web-packages':'services.html#web-packages','#estimate':'services.html#estimate','#selected-work':'projects.html#selected-work'};
  if(oldPages[location.hash]){location.replace(currency.url(oldPages[location.hash]));return;}
  const goals={
    web:{title:'A website with a clear purpose.',description:'Start with one focused page, or choose a larger brochure site when your story needs more room. Every tier includes a responsive layout.',price:'From ₹1,500',unit:'for a scoped one-page website',features:['Basic, Advanced and Premium options','Supplied content and one revision round','Optional pages, copy help and gallery'],href:'services.html#web-packages',cta:'Explore website packages'},
    content:{title:'Give your message a better shape.',description:'Turn supplied footage, photographs or copy into a clear reel, a cleaner image or a static visual ready to share.',price:'From ₹400',unit:'for one static post or thumbnail',features:['Video editing from ₹800 per short','Photo editing: ₹500 for five images','Clear limits on footage, formats and revisions'],href:'services.html?category=content#services',cta:'Explore creative services'},
    data:{title:'A little order goes a long way.',description:'Make supplied spreadsheets or documents clearer, more consistent and easier to use. We review a sample before agreeing on a data task.',price:'From ₹600',unit:'for formatting up to five document pages',features:['Data tasks from ₹750, capped at two hours','Spreadsheet entry, cleanup and organisation','Editable files and clearly defined deliverables'],href:'services.html?category=data#services',cta:'Explore data & document services'},
    support:{title:'Keep your digital presence current.',description:'Choose a manageable routine for small website updates or regular social posts. Each monthly service has an explicit allowance.',price:'From ₹750 / month',unit:'for limited static-website maintenance',features:['Two small update requests / one hour total','One-platform social support from ₹4,500/month','Monthly scope, with extra work quoted first'],href:'services.html?category=support#services',cta:'Explore ongoing support'}
  };
  function renderGoal(button){
    const goal=goals[button.dataset.goal];if(!goal)return;
    $$('[data-goal]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $('#goalTitle').textContent=goal.title;$('#goalDescription').textContent=goal.description;
    $('#goalPrice').replaceChildren(document.createTextNode(currency.convertText(goal.price)+' '));const unit=document.createElement('span');unit.textContent=goal.unit;$('#goalPrice').append(unit);
    $('#goalFeatures').replaceChildren(...goal.features.map(text=>{const li=document.createElement('li');li.textContent=currency.convertText(text);return li;}));
    $('#goalLink').href=currency.url(goal.href);$('#goalLink').textContent=goal.cta+' ↗';
  }
  $$('[data-goal]').forEach(button=>button.addEventListener('click',()=>renderGoal(button)));
  document.addEventListener('highnet:regionchange',()=>renderGoal($('[data-goal][aria-pressed="true"]')));
  const showcase={
    education:{name:'The Learning Collective',image:'collective-premium',href:'demos/education/collective-premium/index.html',category:'EDUCATION / PREMIUM',index:'01'},
    restaurant:{name:'Ember House',image:'ember-premium',href:'demos/restaurant/ember-premium/index.html',category:'RESTAURANT / PREMIUM',index:'02'},
    fitness:{name:'FORGE Performance',image:'forge-premium',href:'demos/fitness/forge-premium/index.html',category:'FITNESS / PREMIUM',index:'03'}
  };
  $$('[data-showcase]').forEach(button=>button.addEventListener('click',()=>{
    const item=showcase[button.dataset.showcase];if(!item)return;
    $$('[data-showcase]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $('#showcaseImage').src=`assets/previews/${item.image}-desktop-v2.webp`;$('#showcaseImage').alt=item.name+' desktop website preview';
    $('#showcaseLink').href=item.href;$('#showcaseLink').setAttribute('aria-label','Open '+item.name+' demo');
    $('#showcaseName').textContent=item.name;$('#showcaseCategory').textContent=item.category;$('#showcaseIndex').textContent=item.index+' / 03';
    $('#showcaseAnnouncement').textContent='Showing '+item.name+'. Open the preview to try the demo.';
  }));
  const form=$('#contactForm');if(!form)return;
  const CONTACT_EMAIL='krish73a@gmail.com';
  const params=new URLSearchParams(location.search),service=params.get('service');
  let estimateModel=null,generatedEstimate='';
  if(service&&[...$('#serviceSelect').options].some(o=>o.value===service))$('#serviceSelect').value=service;
  if(params.get('estimate')==='1'&&['Basic','Advanced','Premium'].includes(service)){
    const pages=Math.max(0,Math.min(5,Math.trunc(Number(params.get('pages')))||0));
    const copy=params.get('copy')==='1',gallery=params.get('gallery')==='1';
    estimateModel={tier:service.toLowerCase(),pages,copy,gallery};
  }
  function updateEnquiryEstimate(){
    if(!estimateModel)return;
    const m=estimateModel,q=currency.quote(m.tier,m.pages,m.copy,m.gallery);
    const text=`Website estimate: ${service}\nAdditional pages: ${m.pages}\nCopy help: ${m.copy?'Yes':'No'}\nGallery: ${m.gallery?'Yes':'No'}\nPricing region: ${q.regionName} (${q.currency})\nIllustrative starting estimate: ${q.text}`;
    const input=$('#projectMessage');
    if(!generatedEstimate&&!input.value.trim())input.value=text+'\n\nMy project details: ';
    else if(generatedEstimate&&input.value.includes(generatedEstimate))input.value=input.value.replace(generatedEstimate,text);
    else return;
    generatedEstimate=text;
  }
  updateEnquiryEstimate();document.addEventListener('highnet:regionchange',updateEnquiryEstimate);
  const enquiryText=()=>`Name: ${$('#clientName').value.trim()}\nReply-to: ${$('#clientEmail').value.trim()}\nService: ${$('#serviceSelect').value}\nPricing region: ${currency.regionName()}\nCurrency: ${currency.currency()}\n\nProject details:\n${$('#projectMessage').value.trim()}`;
  form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;
    location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project enquiry — '+$('#serviceSelect').value)}&body=${encodeURIComponent(enquiryText())}`;
    $('#formStatus').textContent='Your email app should open with the draft ready. Review it and press Send there.';
  });
  $('#copyEnquiry')?.addEventListener('click',async()=>{
    if(!form.reportValidity())return;
    try{await navigator.clipboard.writeText('To: '+CONTACT_EMAIL+'\n'+enquiryText());$('#formStatus').textContent='Enquiry copied. Paste it into an email to '+CONTACT_EMAIL+'.';}
    catch(_){$('#projectMessage').focus();$('#projectMessage').select();$('#formStatus').textContent='Your details are selected. Copy them manually and email '+CONTACT_EMAIL+'.';}
  });
})();
