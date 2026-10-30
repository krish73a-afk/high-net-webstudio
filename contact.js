/* Enquiries: verified provider response, honest fallbacks, clean internal URLs. */
(() => {
  'use strict';
  const form=document.getElementById('contactForm');
  if(!form)return;
  const $=id=>document.getElementById(id),config=window.HIGHNET_CONFIG||{};
  const currency=window.HIGHNET_CURRENCY,email=config.contactEmail||'highnet00@gmail.com';
  const whatsappNumber=String(config.whatsappNumber||'').replace(/[+()\s-]/g,'');
  const whatsappReady=/^[1-9]\d{6,14}$/.test(whatsappNumber);
  const whatsappButton=$('whatsappEnquiry');
  const whatsappUrl=message=>`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  if(whatsappReady&&$('whatsappContact'))$('whatsappContact').href=whatsappUrl('Hi High Net Webstudio, I would like to discuss a project.');
  const endpoint=typeof config.formEndpoint==='string'?config.formEndpoint.trim():'';
  const configured=/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(endpoint);
  const status=$('formStatus'),submit=$('submitEnquiry'),label=$('submitLabel');
  let sending=false,estimateModel=null,generatedEstimate='';
  const params=new URLSearchParams(location.search),service=params.get('service');
  const industryNames={'restaurant-websites':'Restaurant website','fitness-websites':'Gym and fitness website','education-websites':'Education website','business-websites':'Business or portfolio website'};
  const demoNames=['Apex Academy','Elevate Learning','The Learning Collective','Urban Bites','Saffron & Stone','Ember House','FitZone','Momentum Fitness','FORGE Performance'];
  const selectedDemo=demoNames.includes(params.get('demo'))?params.get('demo'):null;
  const industry=industryNames[params.get('industry')];
  if(service&&[...$('serviceSelect').options].some(o=>o.value===service))$('serviceSelect').value=service;
  else if(service==='Website'||industry||selectedDemo)$('serviceSelect').value='Not sure yet';
  if(params.get('estimate')==='1'&&['Basic','Advanced','Premium'].includes(service)){
    estimateModel={tier:service.toLowerCase(),pages:Math.max(0,Math.min(5,Math.trunc(Number(params.get('pages')))||0)),copy:params.get('copy')==='1',gallery:params.get('gallery')==='1'};
  }
  function updateEstimate(){
    if(!estimateModel)return;
    const m=estimateModel,q=currency.quote(m.tier,m.pages,m.copy,m.gallery);
    const text=`Website estimate: ${service}\nAdditional pages: ${m.pages}\nCopy help: ${m.copy?'Yes':'No'}\nGallery: ${m.gallery?'Yes':'No'}\nPricing region: ${q.regionName} (${q.currency})\nIllustrative starting estimate: ${q.text}`;
    const input=$('projectMessage');
    if(!generatedEstimate&&!input.value.trim())input.value=text+'\n\nMy project details: ';
    else if(generatedEstimate&&input.value.includes(generatedEstimate))input.value=input.value.replace(generatedEstimate,text);
    else return;
    generatedEstimate=text;
  }
  updateEstimate();document.addEventListener('highnet:regionchange',updateEstimate);
  if(!estimateModel&&(selectedDemo||industry))$('projectMessage').value=(selectedDemo?'Reference concept: '+selectedDemo+'\n':'')+(industry?'Website type: '+industry+'\n':'')+'\nMy project requirements: ';
  if(configured){
    $('formMode').textContent='Continue on WhatsApp, or send your brief securely. We can reply to your email.';
    label.textContent='Send project enquiry';$('emailFallback').hidden=false;
    status.textContent='Online submissions are processed by Formspree. You can also prepare an email draft.';
  }
  form.noValidate=true;
  const validated=['clientName','clientEmail','projectMessage'];
  function fieldMessage(input){
    const value=input.value.trim();
    if(!value)return input.id==='clientName'?'Enter your full name.':input.id==='clientEmail'?'Enter an email address so we can reply.':'Describe what you would like to create.';
    if(input.id==='clientEmail'&&input.validity.typeMismatch)return 'Enter a valid email address, such as name@example.com.';
    if(input.id==='projectMessage'&&value.length<20)return 'Add a little more detail: at least 20 characters.';
    if(value.length>input.maxLength&&input.maxLength>0)return 'Shorten this field to the displayed limit.';
    return '';
  }
  function validate(){
    let first=null;
    for(const id of validated){const input=$(id),message=fieldMessage(input);$(id+'Error').textContent=message;input.setAttribute('aria-invalid',String(Boolean(message)));if(message&&!first)first=input;}
    $('formErrors').hidden=!first;
    if(first){$('formErrors').textContent='Please check the highlighted fields before continuing.';first.focus();return false;}
    return true;
  }
  validated.forEach(id=>$(id).addEventListener('input',()=>{
    if($(id).getAttribute('aria-invalid')==='true'){const message=fieldMessage($(id));$(id+'Error').textContent=message;$(id).setAttribute('aria-invalid',String(Boolean(message)));}
    if(validated.every(key=>$(key).getAttribute('aria-invalid')!=='true'))$('formErrors').hidden=true;
  }));
  function text(){
    return `Name: ${$('clientName').value.trim()}\nReply-to: ${$('clientEmail').value.trim()}\nPhone: ${$('clientPhone').value.trim()||'Not supplied'}\nBusiness: ${$('businessName').value.trim()||'Not supplied'}\nService: ${$('serviceSelect').value}\nApproximate budget (base INR band): ${$('budgetSelect').value}\nPreferred completion: ${$('preferredPeriod').value.trim()||'Flexible / not supplied'}\nPricing region: ${currency.regionName()} (${currency.currency()})\n\nProject description:\n${$('projectMessage').value.trim()}`;
  }
  function prepareEmail(){
    if(sending||!validate())return;
    const subject='Project enquiry — '+$('serviceSelect').value;
    location.href=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text())}`;
    status.textContent='Your email app should open with a draft. Review it and press Send there. If it does not open, use Copy enquiry below.';
    window.HIGHNET_TRACK?.('Quote Prepared');
  }
  if(whatsappReady&&whatsappButton){
    whatsappButton.hidden=false;
    $('whatsappEnquiryHelp')?.removeAttribute('hidden');
    whatsappButton.addEventListener('click',event=>{
      if(sending||!validate()){event.preventDefault();return;}
      if(form.elements._gotcha.value){event.preventDefault();status.textContent='This enquiry could not be accepted. Please email '+email+' directly.';return;}
      // Build the draft only after the visitor chooses WhatsApp. The site's URL
      // stays clean, and the visitor reviews and sends inside WhatsApp.
      whatsappButton.href=whatsappUrl('Hello High Net Webstudio,\nI would like to enquire about a project.\n\n'+text());
      status.textContent='WhatsApp will open with your enquiry draft. Review the message and tap Send there. Nothing is sent automatically. If it does not open, use the email draft or copy option below.';
    });
  }
  $('emailFallback').addEventListener('click',prepareEmail);
  $('copyEnquiry').addEventListener('click',async()=>{
    if(sending||!validate())return;
    const content='To: '+email+'\n'+text();
    try{await navigator.clipboard.writeText(content);status.textContent='Complete enquiry copied. Paste it into an email to '+email+'.';}
    catch(_){$('copyText').value=content;$('manualCopy').hidden=false;$('copyText').focus();$('copyText').select();status.textContent='Automatic copying is unavailable. Copy the complete enquiry in the selected box, then email '+email+'.';}
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending||!validate())return;
    if(form.elements._gotcha.value){status.textContent='This enquiry could not be accepted. Please email '+email+' directly.';return;}
    if(!configured){prepareEmail();return;}
    sending=true;submit.disabled=true;whatsappButton?.setAttribute('aria-disabled','true');form.setAttribute('aria-busy','true');label.textContent='Sending enquiry…';
    status.textContent='Sending your enquiry securely…';
    const controls=[...form.querySelectorAll('input,select,textarea,button')];
    const data=new FormData(form);data.set('email',$('clientEmail').value.trim());data.set('name',$('clientName').value.trim());data.set('message',$('projectMessage').value.trim());data.set('_subject','High Net Webstudio project enquiry');data.set('pricing_region',currency.regionName()+' ('+currency.currency()+')');
    controls.forEach(control=>control.disabled=true);
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{
      // Domain restriction needs the site origin. Never send page queries or fragments.
      const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},credentials:'omit',referrerPolicy:'origin',redirect:'error',signal:controller.signal});
      let result;try{result=await response.json();}catch(_){throw new Error('unconfirmed');}
      if(!response.ok)throw new Error(response.status===429?'limit':response.status===422?'rejected':'provider');
      if(result?.ok!==true&&result?.success!==true)throw new Error('unconfirmed');
      status.textContent='Your enquiry was submitted successfully. We will reply to the email you provided. Thank you for sharing your project.';
      window.HIGHNET_TRACK?.('Enquiry Submitted');
      form.reset();$('manualCopy').hidden=true;$('copyText').value='';generatedEstimate='';estimateModel=null;
      label.textContent='Send another enquiry';
    }catch(error){
      const reason=error.message;
      status.textContent=reason==='limit'?'The form provider is limiting submissions. Wait a little before retrying, or use the email option.':reason==='rejected'?'The provider could not accept the enquiry. Check your details, then retry or use the email option.':reason==='unconfirmed'?'The provider did not confirm the submission. Check before resending to avoid a duplicate, or contact us by email.':error.name==='AbortError'?'The request timed out, so delivery could not be confirmed. Check before retrying, or use the email option.':'We could not confirm delivery. Your details are still here. Retry when your connection is ready, or prepare an email draft instead.';
      label.textContent='Retry enquiry';
    }finally{clearTimeout(timer);sending=false;controls.forEach(control=>control.disabled=false);whatsappButton?.removeAttribute('aria-disabled');form.removeAttribute('aria-busy');}
  });
})();
