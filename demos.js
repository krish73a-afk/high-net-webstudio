/* HIGH NET WEBSTUDIO — DEMO GALLERY SETTINGS

   HOW TO ADD A FINISHED WEBSITE:
   Find its entry below and replace url: "" with your live URL.
   Examples:
     url: "https://your-domain.com/my-website/"
     url: "demos/education/apex-basic/index.html"
   Leave url: "" until the website is ready: no clickable demo link is shown.

   You can change names, categories, descriptions, preview images here too.
*/
"use strict";
document.documentElement.classList.add('js');
const DEMO_PROJECTS = [
  { name:"Apex Academy", category:"education", tier:"basic", description:"Straightforward, friendly, and built around course enquiries.", image:"assets/previews/apex-basic-desktop-v2.webp", mobile:"assets/previews/apex-basic-mobile-v2.webp", url:"demos/education/apex-basic/index.html" },
  { name:"Elevate Learning", category:"education", tier:"advanced", description:"Course discovery with thoughtful interactions and a modern identity.", image:"assets/previews/elevate-advanced-desktop-v2.webp", mobile:"assets/previews/elevate-advanced-mobile-v2.webp", url:"demos/education/elevate-advanced/index.html" },
  { name:"The Learning Collective", category:"education", tier:"premium", description:"An editorial learning experience with immersive storytelling.", image:"assets/previews/collective-premium-desktop-v2.webp", mobile:"assets/previews/collective-premium-mobile-v2.webp", url:"demos/education/collective-premium/index.html" },
  { name:"Urban Bites", category:"restaurant", tier:"basic", description:"A warm introduction to the menu, story and essential details.", image:"assets/previews/urban-basic-desktop-v2.webp", mobile:"assets/previews/urban-basic-mobile-v2.webp", url:"demos/restaurant/urban-basic/index.html" },
  { name:"Saffron & Stone", category:"restaurant", tier:"advanced", description:"A tasteful, interactive dining experience with richer imagery.", image:"assets/previews/saffron-advanced-desktop-v2.webp", mobile:"assets/previews/saffron-advanced-mobile-v2.webp", url:"demos/restaurant/saffron-advanced/index.html" },
  { name:"Ember House", category:"restaurant", tier:"premium", description:"Atmospheric storytelling for a restaurant with a point of view.", image:"assets/previews/ember-premium-desktop-v2.webp", mobile:"assets/previews/ember-premium-mobile-v2.webp", url:"demos/restaurant/ember-premium/index.html" },
  { name:"FitZone", category:"fitness", tier:"basic", description:"A focused gym presence: programs, schedules and easy contact.", image:"assets/previews/fitzone-basic-desktop-v2.webp", mobile:"assets/previews/fitzone-basic-mobile-v2.webp", url:"demos/fitness/fitzone-basic/index.html" },
  { name:"Momentum Fitness", category:"fitness", tier:"advanced", description:"An energetic studio experience with interactive training content.", image:"assets/previews/momentum-advanced-desktop-v2.webp", mobile:"assets/previews/momentum-advanced-mobile-v2.webp", url:"demos/fitness/momentum-advanced/index.html" },
  { name:"FORGE Performance", category:"fitness", tier:"premium", description:"A striking, editorial design for ambitious performance brands.", image:"assets/previews/forge-premium-desktop-v2.webp", mobile:"assets/previews/forge-premium-mobile-v2.webp", url:"demos/fitness/forge-premium/index.html" }
];

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const nice = str => str.charAt(0).toUpperCase()+str.slice(1);
// Safe link validation prevents accidental unsupported protocols.
function validLink(url){
  if(!url || !url.trim())return false;
  try{const parsed=new URL(url,location.href);return ["https:","http:","file:"].includes(parsed.protocol);}catch(_){return false;}
}

const grid=$("#projectsGrid");
const DEMO_FEATURES=[["Course filters", "Course details", "Enquiry preview"], ["Course comparison", "Program search", "Admissions guide"], ["Learning pathways", "Journal stories", "Admissions preview"], ["Menu search", "Dietary filter", "Dish details"], ["Menu discovery", "Dish details", "Reservation preview"], ["Menu filters", "Experience pages", "Reservation preview"], ["Program details", "Plan selection", "Weekly timetable"], ["Program filters", "Training details", "Membership preview"], ["Program search", "Membership selection", "Application preview"]];
DEMO_PROJECTS.forEach((item,index)=>{
  const card=document.createElement("article");
  card.className="project-card";
  card.dataset.industry=item.category;
  card.dataset.tier=item.tier;
  card.dataset.name=(item.name+" "+item.description+" "+DEMO_FEATURES[index].join(" ")).toLowerCase();
  const preview=document.createElement("a");preview.className=`preview preview-${item.category}`;
  preview.href=item.url;preview.setAttribute('aria-label',`Preview and open ${item.name} website demo`);
  preview.dataset.analyticsDemo=item.name;
  const desktop=document.createElement('div');desktop.className='preview-desktop';
  const img=document.createElement('img');img.src=item.image;img.alt=`Current desktop homepage of ${item.name}`;
  img.width=1280;img.height=720;img.loading='lazy';img.decoding='async';desktop.append(img);
  const phone=document.createElement('div');phone.className='preview-phone';phone.setAttribute('aria-hidden','true');
  const mobile=document.createElement('img');mobile.src=item.mobile;mobile.alt='';mobile.width=390;mobile.height=844;mobile.loading='lazy';mobile.decoding='async';phone.append(mobile);
  mobile.addEventListener('error',()=>{phone.hidden=true;},{once:true});
  img.addEventListener('error',()=>{
    desktop.hidden=true;phone.hidden=true;
    const fallback=document.createElement('div');fallback.className='preview-fallback';
    const title=document.createElement('span');title.textContent=item.name;
    const note=document.createElement('small');note.textContent='Preview unavailable · Open the working demo';
    fallback.append(title,note);preview.prepend(fallback);
  },{once:true});
  const badge=document.createElement('span');badge.className='preview-tag';badge.textContent=`${String(index+1).padStart(2,'0')} / DESKTOP + MOBILE`;
  preview.append(desktop,phone,badge);
  const details=document.createElement("div");details.className="project-bottom";
  const block=document.createElement("div");
  const subtitle=document.createElement("span");subtitle.textContent=`${item.category.toUpperCase()} · ${item.tier.toUpperCase()}`;
  const name=document.createElement("h3");name.textContent=item.name;block.append(subtitle,name);
  details.appendChild(block);
  const description=document.createElement("p");description.className="project-description";description.textContent=item.description;
  const status=document.createElement("p");status.className="project-status";
  const dot=document.createElement("span");dot.className="status-mini-dot";dot.setAttribute("aria-hidden","true");
  status.appendChild(dot);
  if(validLink(item.url)){
    const link=document.createElement("a");link.className="demo-preview-link";link.href=item.url;link.textContent="Live Preview ↗";link.dataset.analyticsDemo=item.name;link.setAttribute("aria-label",`Open ${item.name} website demo`);
    if(/^https?:\/\//i.test(item.url)){link.target="_blank";link.rel="noopener noreferrer";}
    status.classList.add("available");status.appendChild(document.createTextNode("Live preview available"));
    const features=document.createElement('ul');features.className='demo-features';DEMO_FEATURES[index].forEach(text=>{const li=document.createElement('li');li.textContent=text;features.append(li);});
    const compatible=document.createElement('p');compatible.className='demo-compatibility';compatible.textContent='Responsive · Desktop & mobile · Fictional concept';
    const actions=document.createElement('div');actions.className='demo-actions';
    const quote=document.createElement('a');quote.textContent='Request a Similar Website ↗';quote.dataset.package=nice(item.tier);quote.href=window.HIGHNET_CURRENCY.url('index.html?'+new URLSearchParams({demo:item.name,service:nice(item.tier)})+'#contact');quote.setAttribute('aria-label','Request a website inspired by '+item.name);
    actions.append(link,quote);card.append(preview,details,description,features,compatible,actions);
  }else{
    status.appendChild(document.createTextNode("Website preview coming soon"));
    card.append(preview,details,description,status);
  }
  grid.appendChild(card);
});

// Gallery filters and search.
const incoming=new URLSearchParams(location.search);
let industry=['education','restaurant','fitness'].includes(incoming.get('industry'))?incoming.get('industry'):'all';
let tier=['basic','advanced','premium'].includes(incoming.get('tier'))?incoming.get('tier'):'all';
$$('#industryFilters button').forEach(button=>{const on=button.dataset.industry===industry;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
$$('#tierFilters button').forEach(button=>{const on=button.dataset.tier===tier;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
function renderFilters(){
  const query=$("#demoSearch").value.trim().toLowerCase();let count=0;
  $$(".project-card",grid).forEach(card=>{
    const visible=(industry==="all"||industry===card.dataset.industry)&&(tier==="all"||tier===card.dataset.tier)&&card.dataset.name.includes(query);
    card.hidden=!visible;if(visible)count++;
  });
  $("#projectCount").textContent=`Showing ${count} of ${DEMO_PROJECTS.length} formats`;
  $("#emptyState").hidden=count!==0;
}
function wireFilters(id,key,callback){
  $$(".filter",$(id)).forEach(button=>button.addEventListener("click",()=>{
    $$(".filter",$(id)).forEach(other=>{const selected=other===button;other.classList.toggle("active",selected);other.setAttribute("aria-pressed",String(selected));});
    callback(button.dataset[key]);renderFilters();
  }));
}
wireFilters("#industryFilters","industry",x=>industry=x);
wireFilters("#tierFilters","tier",x=>tier=x);
$("#demoSearch").addEventListener("input",renderFilters);
$("#resetFilters").addEventListener("click",()=>{
  industry=tier="all";
  $$(".filter").forEach(btn=>{const active=btn.dataset.industry==="all"||btn.dataset.tier==="all";btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
  $("#demoSearch").value="";renderFilters();
});
renderFilters();
