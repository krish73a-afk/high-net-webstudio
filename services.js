/* Services page: service categories and a URL-based website estimate handoff. */
(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const params=new URLSearchParams(location.search);
  const pricing=window.HIGHNET_PRICING;
  const currency=window.HIGHNET_CURRENCY;
  function filter(category){
    if(!['all','web','content','data','support'].includes(category))category='all';
    $$('[data-service-filter]').forEach(b=>{const active=b.dataset.serviceFilter===category;b.setAttribute('aria-pressed',String(active));b.classList.toggle('active',active);});
    let count=0;$$('[data-service-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.serviceCategory!==category;if(!card.hidden)count++;});
    $('#serviceResults').textContent=`${count} service${count===1?'':'s'} to explore`;
  }
  filter(params.get('category')||'all');$$('[data-service-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.serviceFilter)));
  const tier=$('#tierSelect'),pages=$('#extraPages'),copy=$('#copyAddon'),gallery=$('#galleryAddon');
  $('#estimateForm').addEventListener('submit',e=>e.preventDefault());
  function estimate(){
    const quote=currency.quote(tier.value,pages.value,copy.checked,gallery.checked);
    const included=pricing.includedPages[tier.value];
    $('#packageScope').textContent=`${tier.value[0].toUpperCase()+tier.value.slice(1)} includes ${included} page${included===1?'':'s'}. Extra brochure pages: +${currency.format(pricing.extraPage)} each.`;
    $('#pagesOutput').textContent=pages.value;$('#estimateTotal').textContent=quote.text;
    const breakdown=$('#estimateBreakdown');
    if(breakdown)breakdown.replaceChildren(...quote.items.map(item=>{const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=item.label;dd.textContent=item.text;row.append(dt,dd);return row;}));
    const query=new URLSearchParams({service:tier.value[0].toUpperCase()+tier.value.slice(1),estimate:'1',pages:pages.value,copy:copy.checked?'1':'0',gallery:gallery.checked?'1':'0'});
    $('#estimateCTA').href=currency.url('index.html?'+query+'#contact');
  }
  [tier,pages,copy,gallery].forEach(input=>input.addEventListener('input',estimate));estimate();
  document.addEventListener('highnet:regionchange',estimate);
})();
