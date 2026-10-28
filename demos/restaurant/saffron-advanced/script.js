/* Saffron & Stone — Advanced. Content and behavior are intentionally editable. */
'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const money = n => '₹' + n.toLocaleString('en-IN');
const year = $('#year'); if(year)year.textContent = new Date().getFullYear();

// Navigation
const nav = $('#mainNav'), menuToggle = $('#menuToggle');
function closeNav(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');}
menuToggle.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');});
$$('a',nav).forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
window.addEventListener('resize',()=>{if(window.innerWidth>820)closeNav()});

// Coffee intro: a cup fills, then the identity fades into view.
const intro = $('#intro'); let hideTimer;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function hideIntro(){if(!intro)return;clearTimeout(hideTimer);intro.classList.add('done');intro.classList.remove('play');intro.setAttribute('aria-hidden','true');document.body.classList.remove('intro-locked');try{sessionStorage.setItem('ss-intro-played','yes')}catch(e){}}
function startIntro(force=false){if(!intro)return;let already=false;try{already=sessionStorage.getItem('ss-intro-played')==='yes'}catch(e){}
 if(reduceMotion||(!force&&already)){hideIntro();return;}
 intro.classList.remove('done'); intro.setAttribute('aria-hidden','false');document.body.classList.add('intro-locked');
 requestAnimationFrame(()=>requestAnimationFrame(()=>intro.classList.add('play')));
 hideTimer=setTimeout(hideIntro,3000);
}
if(intro){$('#introSkip').addEventListener('click',hideIntro);startIntro();}
const replay=$('#replayIntro');
if(replay){if(!intro){replay.hidden=true;}else{replay.addEventListener('click',()=>{hideIntro();if(!reduceMotion){setTimeout(()=>startIntro(true),20)}});}}

const DISHES = [
 {id:1,name:'Honey cinnamon latte',cat:'coffee',price:220,veg:true,art:'latte',desc:'Our gentle house latte with espresso, warm milk, honey and a dusting of cinnamon.',tags:['House signature','Contains dairy']},
 {id:2,name:'Classic cappuccino',cat:'coffee',price:190,veg:true,art:'cappuccino',desc:'Double espresso with cloud-like steamed milk and a cocoa finish.',tags:['Coffee','Contains dairy']},
 {id:3,name:'Flat white',cat:'coffee',price:200,veg:true,art:'latte',desc:'A small, balanced coffee with velvety microfoam.',tags:['Coffee','Contains dairy']},
 {id:4,name:'Masala chai',cat:'coffee',price:135,veg:true,art:'cappuccino',desc:'Strong black tea gently simmered with cardamom, ginger and milk.',tags:['Tea','Contains dairy']},
 {id:5,name:'Iced brown sugar coffee',cat:'cold',price:245,veg:true,art:'iced',desc:'Cold coffee over ice with brown sugar syrup and milk.',tags:['Cold favourite','Contains dairy']},
 {id:6,name:'Iced matcha',cat:'cold',price:250,veg:true,art:'matcha',desc:'Earthy matcha, chilled milk and a softly sweet finish.',tags:['Cold drinks','Contains dairy']},
 {id:7,name:'Citrus cooler',cat:'cold',price:160,veg:true,art:'iced',desc:'Fresh citrus, mint and soda water, served over plenty of ice.',tags:['Refreshing','Dairy-free']},
 {id:8,name:'Garden toast',cat:'breakfast',price:280,veg:true,art:'toast',desc:'Sourdough toast, smashed avocado, fresh herbs and toasted seeds.',tags:['Breakfast','Contains gluten']},
 {id:9,name:'Butter croissant',cat:'breakfast',price:165,veg:true,art:'pastry',desc:'Delicate layers, golden edges and a soft buttery centre.',tags:['Baked today','Contains wheat and dairy']},
 {id:10,name:'Breakfast sandwich',cat:'breakfast',price:285,veg:false,art:'sandwich',desc:'Grilled bread with herbed egg, cheddar and greens.',tags:['Contains egg','Contains wheat and dairy']},
 {id:11,name:'Harvest grain bowl',cat:'plates',price:320,veg:true,art:'bowl',desc:'Grains, seasonal greens, citrus dressing and crunchy vegetables.',tags:['Fresh plate','Ask about allergens']},
 {id:12,name:'Roasted tomato pasta',cat:'plates',price:340,veg:true,art:'pasta',desc:'Tender pasta tossed in slow-roasted tomato sauce with basil.',tags:['Lunch plate','Contains wheat']},
 {id:13,name:'Smoked chicken melt',cat:'plates',price:365,veg:false,art:'sandwich',desc:'Toasted sandwich with smoked chicken, cheese and pickled onion.',tags:['Contains meat','Contains wheat and dairy']},
 {id:14,name:'Herb garden sandwich',cat:'plates',price:290,veg:true,art:'sandwich',desc:'Grilled vegetables, green chutney and fresh lettuce in toasted bread.',tags:['Vegetarian','Contains wheat']},
 {id:15,name:'Carrot & walnut cake',cat:'bakery',price:195,veg:true,art:'cake',desc:'A gently spiced slice finished with silky cream cheese icing.',tags:['Cake','Contains nuts, wheat, dairy']},
 {id:16,name:'Almond butter croissant',cat:'bakery',price:205,veg:true,art:'pastry',desc:'Flaky pastry with a soft almond centre and toasted topping.',tags:['Bakery','Contains nuts, wheat, dairy']},
 {id:17,name:'Little citrus cake',cat:'bakery',price:185,veg:true,art:'cake',desc:'A light, bright slice with citrus zest and a soft vanilla crumb.',tags:['Bakery','Contains wheat and dairy']},
 {id:18,name:'Classic butter toast',cat:'breakfast',price:150,veg:true,art:'toast',desc:'Golden toast with butter and a little house-made fruit preserve.',tags:['Simple comfort','Contains wheat and dairy']}
];
const grid=$('#menuGrid');
if(grid){
  let activeCategory='all';
  const count=$('#menuCount'), search=$('#menuSearch'), veg=$('#vegOnly'), empty=$('#menuEmpty');
  function render(){const query=search.value.trim().toLowerCase();const filtered=DISHES.filter(d=>(activeCategory==='all'||d.cat===activeCategory)&&(!veg.checked||d.veg)&&(d.name+' '+d.desc+' '+d.tags.join(' ')).toLowerCase().includes(query));
   grid.replaceChildren();filtered.forEach(d=>{const el=document.createElement('article');el.className='menu-card';
    const photo=document.createElement('div');photo.className='menu-picture';const img=document.createElement('img');img.src=`assets/${d.art}.svg`;img.alt=`Illustration of ${d.name}`;img.loading='lazy';const pill=document.createElement('span');pill.className='diet-pill';pill.textContent=d.veg?'● VEG':'● CONTAINS EGG / MEAT';photo.append(img,pill);
    const body=document.createElement('div');body.className='menu-card-body';const head=document.createElement('div');head.className='menu-card-head';const title=document.createElement('h3');title.textContent=d.name;const price=document.createElement('strong');price.textContent=money(d.price);head.append(title,price);const desc=document.createElement('p');desc.textContent=d.desc;const bottom=document.createElement('div');bottom.className='menu-card-bottom';const label=document.createElement('small');label.textContent=d.tags[0];const btn=document.createElement('button');btn.type='button';btn.textContent='View details ↗';btn.setAttribute('aria-label',`View details for ${d.name}`);btn.addEventListener('click',()=>openDish(d));bottom.append(label,btn);body.append(head,desc,bottom);el.append(photo,body);grid.append(el);});
    count.textContent=`Showing ${filtered.length} of ${DISHES.length} dishes`;empty.hidden=filtered.length!==0;
  }
  $$('#menuCategories .category').forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.category;$$('#menuCategories .category').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});render();}));
  search.addEventListener('input',render);veg.addEventListener('change',render);
  $('#menuReset').addEventListener('click',()=>{search.value='';veg.checked=false;$('#menuCategories [data-category="all"]').click();render()});
  function openDish(d){const content=$('#dishDialogContent');content.replaceChildren();
    const image=document.createElement('img');image.className='modal-photo';image.src=`assets/${d.art}.svg`;image.alt=`Illustration of ${d.name}`;
    const body=document.createElement('div');body.className='modal-body';const sub=document.createElement('p');sub.className='eyebrow';sub.textContent=d.cat.replace(/^./,s=>s.toUpperCase());const h=document.createElement('h2');h.textContent=d.name;const description=document.createElement('p');description.textContent=d.desc;const tags=document.createElement('div');tags.className='modal-highlights';d.tags.forEach(t=>{const tag=document.createElement('span');tag.textContent=t;tags.append(tag)});const price=document.createElement('div');price.className='modal-price';price.textContent=money(d.price);const note=document.createElement('p');note.className='modal-warning';note.textContent='Concept menu data only. Check ingredients and allergies directly with the actual restaurant.';
    body.append(sub,h,description,tags,price,note);content.append(image,body);$('#dishDialog').showModal();}
  render();
}
// Dialog closing; native <dialog> traps focus, Escape works automatically.
$$('[data-close-dialog]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
$$('dialog.modal').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()}));

// Reservation request preview: no table is actually reserved or checked.
const bookingForm=$('#bookingForm');
if(bookingForm){
  const date=$('#bookDate');const now=new Date();const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');date.min=today;
  bookingForm.addEventListener('submit',e=>{e.preventDefault();if(!bookingForm.reportValidity())return;
    if(date.value<today){date.setCustomValidity('Choose today or a future date.');date.reportValidity();return;}date.setCustomValidity('');
    const guest=$('#bookGuests').value;const readableDate=new Date(date.value+'T12:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    const rawTime=$('#bookTime').value;const [h,m]=rawTime.split(':').map(Number);const ampm=h>=12?'PM':'AM';const prettyTime=`${(h%12)||12}:${String(m).padStart(2,'0')} ${ampm}`;
    const rows=[['Name',$('#bookName').value.trim()],['Date',readableDate],['Time',prettyTime],['Guests',guest+' '+(guest==='1'?'guest':'guests')],['Occasion',$('#bookOccasion').value],['Special requests',$('#bookNote').value.trim()||'None']];
    const box=$('#bookingSummary');box.replaceChildren();const inner=document.createElement('div');inner.className='modal-body';const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='REQUEST PREVIEW · NO REAL BOOKING';const heading=document.createElement('h2');heading.textContent='Your table, on paper.';inner.append(eyebrow,heading);rows.forEach(([key,value])=>{const row=document.createElement('div');row.className='summary-row';const a=document.createElement('span');a.textContent=key;const b=document.createElement('strong');b.textContent=value;row.append(a,b);inner.append(row)});const note=document.createElement('p');note.className='modal-warning';note.textContent='This is a portfolio demonstration. No availability has been checked, no reservation has been confirmed, and no details have been submitted or stored.';inner.append(note);box.append(inner);$('#bookingDialog').showModal();
  });
  date.addEventListener('input',()=>date.setCustomValidity(''));
}
// General restaurant message preview, not a college-style admissions form.
const messageForm=$('#messageForm');
if(messageForm){messageForm.addEventListener('submit',e=>{e.preventDefault();if(!messageForm.reportValidity())return;
const content=$('#messageSummary');content.replaceChildren();const body=document.createElement('div');body.className='modal-body';const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent='MESSAGE PREVIEW · NOT SENT';const title=document.createElement('h2');title.textContent='A note for the team.';body.append(eyebrow,title);
[['From',$('#messageName').value.trim()],['Email',$('#messageEmail').value.trim()],['About',$('#messageTopic').value]].forEach(([k,v])=>{const row=document.createElement('div');row.className='summary-row';const a=document.createElement('span');a.textContent=k;const b=document.createElement('strong');b.textContent=v;row.append(a,b);body.append(row)});const p=document.createElement('p');p.className='summary-message';p.textContent=$('#messageText').value.trim();const info=document.createElement('p');info.className='modal-warning';info.textContent='Demo only. This message has not been emailed, sent, or stored.';body.append(p,info);content.append(body);$('#messageDialog').showModal();});}
