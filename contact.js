/* Project enquiries: validate locally and prepare a WhatsApp draft only after the visitor chooses it. */
(() => {
  'use strict';
  const form=document.getElementById('contactForm');
  if(!form)return;
  const $=id=>document.getElementById(id),config=window.HIGHNET_CONFIG||{};
  const currency=window.HIGHNET_CURRENCY;
  const whatsappNumber=String(config.whatsappNumber||'').replace(/[+()\s-]/g,'');
  const whatsappReady=/^[1-9]\d{6,14}$/.test(whatsappNumber);
  const whatsappButton=$('whatsappEnquiry'),status=$('formStatus');
  const whatsappUrl=message=>`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  if(whatsappReady&&$('whatsappContact'))$('whatsappContact').href=whatsappUrl('Hi High Net Webstudio, I would like to discuss a project.');

  let estimateModel=null,generatedEstimate='';
  const params=new URLSearchParams(location.search),service=params.get('service');
  const industryNames={'restaurant-websites':'Restaurant website','fitness-websites':'Gym and fitness website','education-websites':'Education website','business-websites':'Business or portfolio website'};
  const demoNames=['Apex Academy','Elevate Learning','The Learning Collective','Urban Bites','Saffron & Stone','Ember House','FitZone','Momentum Fitness','FORGE Performance'];
  const selectedDemo=demoNames.includes(params.get('demo'))?params.get('demo'):null;
  const industry=industryNames[params.get('industry')];
  if(service&&[...$('serviceSelect').options].some(option=>option.value===service))$('serviceSelect').value=service;
  else if(service==='Website'||industry||selectedDemo)$('serviceSelect').value='Not sure yet';
  if(params.get('estimate')==='1'&&['Basic','Advanced','Premium'].includes(service)){
    estimateModel={tier:service.toLowerCase(),pages:Math.max(0,Math.min(5,Math.trunc(Number(params.get('pages')))||0)),copy:params.get('copy')==='1',gallery:params.get('gallery')==='1'};
  }
  function updateEstimate(){
    if(!estimateModel||!currency)return;
    const model=estimateModel,quote=currency.quote(model.tier,model.pages,model.copy,model.gallery);
    const estimate=`Website estimate: ${service}\nAdditional pages: ${model.pages}\nCopy help: ${model.copy?'Yes':'No'}\nGallery: ${model.gallery?'Yes':'No'}\nPricing region: ${quote.regionName} (${quote.currency})\nIllustrative starting estimate: ${quote.text}`;
    const input=$('projectMessage');
    if(!generatedEstimate&&!input.value.trim())input.value=estimate+'\n\nMy project details: ';
    else if(generatedEstimate&&input.value.includes(generatedEstimate))input.value=input.value.replace(generatedEstimate,estimate);
    else return;
    generatedEstimate=estimate;
  }
  updateEstimate();
  document.addEventListener('highnet:regionchange',updateEstimate);
  if(!estimateModel&&(selectedDemo||industry)){
    const context=[selectedDemo?'Reference concept: '+selectedDemo:'',industry?'Website type: '+industry:''].filter(Boolean).join('\n');
    $('projectMessage').value=context+'\n\nMy project requirements: ';
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
    for(const id of validated){
      const input=$(id),message=fieldMessage(input);
      $(id+'Error').textContent=message;
      input.setAttribute('aria-invalid',String(Boolean(message)));
      if(message&&!first)first=input;
    }
    $('formErrors').hidden=!first;
    if(first){$('formErrors').textContent='Please check the highlighted fields before continuing.';first.focus();return false;}
    return true;
  }
  validated.forEach(id=>$(id).addEventListener('input',()=>{
    if($(id).getAttribute('aria-invalid')==='true'){
      const message=fieldMessage($(id));
      $(id+'Error').textContent=message;
      $(id).setAttribute('aria-invalid',String(Boolean(message)));
    }
    if(validated.every(key=>$(key).getAttribute('aria-invalid')!=='true'))$('formErrors').hidden=true;
  }));
  function enquiryText(){
    const region=currency?`${currency.regionName()} (${currency.currency()})`:'selected region';
    return `Name: ${$('clientName').value.trim()}\nReply-to: ${$('clientEmail').value.trim()}\nPhone: ${$('clientPhone').value.trim()||'Not supplied'}\nBusiness: ${$('businessName').value.trim()||'Not supplied'}\nService: ${$('serviceSelect').value}\nApproximate budget (base INR band): ${$('budgetSelect').value}\nPreferred completion: ${$('preferredPeriod').value.trim()||'Flexible / not supplied'}\nPricing region: ${region}\n\nProject description:\n${$('projectMessage').value.trim()}`;
  }
  if(whatsappReady&&whatsappButton){
    whatsappButton.hidden=false;
    $('whatsappEnquiryHelp')?.removeAttribute('hidden');
    whatsappButton.addEventListener('click',event=>{
      if(!validate()){event.preventDefault();return;}
      if(form.elements._gotcha?.value){
        event.preventDefault();
        status.textContent='This enquiry could not be prepared. Please try again or use the WhatsApp contact above.';
        return;
      }
      whatsappButton.href=whatsappUrl('Hello High Net Webstudio,\nI would like to enquire about a project.\n\n'+enquiryText());
      status.textContent='WhatsApp will open with your enquiry draft. Review the message and tap Send there. Nothing is sent automatically.';
    });
    form.addEventListener('submit',event=>{
      event.preventDefault();
      status.textContent='Choose Continue on WhatsApp to review your enquiry before sending.';
      whatsappButton.focus();
    });
  }else{
    whatsappButton&&(whatsappButton.hidden=true);
    status.textContent='WhatsApp is unavailable right now. Use the WhatsApp contact link or email address beside this form.';
  }
})();
