'use strict';

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
$('#year').textContent = new Date().getFullYear();

// Responsive navigation.
const nav = $('#mainNav');
const menuButton = $('#menuButton');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
});
$$('a', nav).forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu()});

// All course information is editable in this list.
const PROGRAMS = [
  {name:'Strength Foundations', category:'strength', label:'STRENGTH', duration:'45 minutes', level:'Beginner friendly', image:'assets/program-strength.webp',desc:'Learn your way around common strength equipment and basic movements with a coach-led introduction.',tags:['Gym basics','Equipment'],long:'A welcoming introduction to weight-room equipment, controlled movements and how a gym session is structured. Suitable for people starting out or returning after a break.'},
  {name:'Functional Strength', category:'strength', label:'STRENGTH', duration:'50 minutes', level:'All levels', image:'assets/program-strength.webp',desc:'A varied group session using everyday movement patterns and optional equipment.',tags:['Small group','Movement'],long:'A coach-led session using simple movement patterns and different equipment stations. Trainers can explain modifications for different experience levels.'},
  {name:'Cardio Circuit', category:'cardio', label:'CARDIO', duration:'40 minutes', level:'Flexible pace', image:'assets/program-cardio.webp',desc:'Switch between easy-to-follow activity stations at a pace that works for you.',tags:['Group class','Active'],long:'A rotating selection of cardio stations in a supportive small-group format. Participants can adjust their pace and take breaks when needed.'},
  {name:'Dance Cardio', category:'cardio', label:'CARDIO', duration:'45 minutes', level:'Beginner friendly', image:'assets/program-cardio.webp',desc:'An upbeat music-led session with simple steps, movement and plenty of energy.',tags:['Music','Group class'],long:'An easy-to-follow class that blends movement with music in a welcoming atmosphere. No dance experience is required to take part.'},
  {name:'Mobility Flow', category:'mobility', label:'MIND & BODY', duration:'45 minutes', level:'All levels', image:'assets/program-mobility.webp',desc:'Gentle movement and stretching sequences to explore your range of motion.',tags:['Stretch','Movement'],long:'Guided movement and stretching with attention to comfort and control. A useful complement to other activities in the weekly timetable.'},
  {name:'Stretch & Reset', category:'mobility', label:'MIND & BODY', duration:'30 minutes', level:'Beginner friendly', image:'assets/program-mobility.webp',desc:'A calmer class with simple stretches and time to unwind between busy days.',tags:['Gentle','Calm'],long:'A quieter, accessible session focused on gentle stretches, comfortable movement and winding down. Ideal if you prefer a lower-key studio atmosphere.'}
];

const grid = $('#programGrid');
const programSearch = $('#programSearch');
const programCount = $('#programCount');
const programEmpty = $('#programEmpty');
let filter = 'all';
const cards = PROGRAMS.map((program,index)=>{
  const card=document.createElement('article');
  card.className='program-card';
  card.dataset.category=program.category;
  card.dataset.name=[program.name,program.desc,program.label,...program.tags].join(' ').toLowerCase();
  card.innerHTML=`
    <div class="program-visual"><img src="${program.image}" alt="Illustration representing ${program.name}" width="420" height="230"/><span class="program-pill">${program.label}</span></div>
    <div class="program-card-body"><h3>${program.name}</h3><p>${program.desc}</p><div class="program-meta"><span>${program.duration}</span><span>${program.level}</span></div><button type="button" class="program-detail-btn" data-index="${index}">View program details <span aria-hidden="true">↗</span></button></div>`;
  grid.appendChild(card);
  return card;
});
function renderPrograms(){
  const term=programSearch.value.trim().toLowerCase();let count=0;
  cards.forEach(card=>{
    const visible=(filter==='all'||filter===card.dataset.category)&&card.dataset.name.includes(term);
    card.hidden=!visible;if(visible)count++;
  });
  programCount.textContent=`Showing ${count} of ${PROGRAMS.length} programs`;
  programEmpty.hidden=count!==0;
}
programSearch.addEventListener('input',renderPrograms);
$('#programFilters').addEventListener('click',event=>{
  const selected=event.target.closest('[data-filter]');if(!selected)return;
  filter=selected.dataset.filter;
  $$('.filter', $('#programFilters')).forEach(button=>{
    const active=button===selected;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
  });
  renderPrograms();
});
$('#resetPrograms').addEventListener('click',()=>{
  filter='all'; programSearch.value='';
  $$('.filter').forEach(btn=>{const isAll=btn.dataset.filter==='all';btn.classList.toggle('active',isAll);btn.setAttribute('aria-pressed',String(isAll))});
  renderPrograms();programSearch.focus();
});
renderPrograms();

// Program detail dialog.
const programDialog = $('#programDialog');
let currentProgram = null;
let lastDialogFocus = null;
function openProgram(index){
  const p=PROGRAMS[index];if(!p)return;
  currentProgram=p;lastDialogFocus=document.activeElement;
  $('#dialogArt').replaceChildren();
  const art=document.createElement('img');art.src=p.image;art.alt=`Illustration for ${p.name}`;$('#dialogArt').append(art);
  $('#dialogCategory').textContent=p.label;
  $('#dialogTitle').textContent=p.name;
  $('#dialogDescription').textContent=p.long;
  $('#dialogDuration').textContent=p.duration;
  $('#dialogLevel').textContent=p.level;
  programDialog.showModal();
}
grid.addEventListener('click',event=>{const btn=event.target.closest('[data-index]');if(btn)openProgram(Number(btn.dataset.index));});
$('#dialogClose').addEventListener('click',()=>programDialog.close());
programDialog.addEventListener('click',event=>{if(event.target===programDialog)programDialog.close()});
programDialog.addEventListener('close',()=>{lastDialogFocus?.focus?.();});

// Front-end-only interest selector. No user info is sent or stored.
const interestSelect=$('#contactInterest');
function selectInterest(interest){
  let option=$$('option',interestSelect).find(opt=>opt.value===interest);
  if(!option){option=document.createElement('option');option.value=interest;option.textContent=interest;interestSelect.append(option)}
  interestSelect.value=interest;
  if(programDialog.open)programDialog.close();
  $('#enquiryPreview').hidden=true;
  $('#contact').scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'start'});
}
$('#dialogInterest').addEventListener('click',()=>{if(currentProgram)selectInterest(currentProgram.name)});
$$('.plan-btn').forEach(btn=>btn.addEventListener('click',()=>selectInterest(btn.dataset.plan)));

// Sample class timetable: change this data to match a real gym.
const TIMETABLE={
  Mon:[['7:00 AM','Strength Foundations','Samira · Studio A'],['5:30 PM','Dance Cardio','Aarav · Studio B'],['7:00 PM','Mobility Flow','Neha · Studio B']],
  Tue:[['6:30 AM','Cardio Circuit','Aarav · Studio A'],['5:00 PM','Functional Strength','Samira · Studio A'],['7:30 PM','Stretch & Reset','Neha · Studio B']],
  Wed:[['7:30 AM','Mobility Flow','Neha · Studio B'],['6:00 PM','Strength Foundations','Samira · Studio A'],['7:30 PM','Dance Cardio','Aarav · Studio B']],
  Thu:[['7:00 AM','Functional Strength','Samira · Studio A'],['5:30 PM','Cardio Circuit','Aarav · Studio A'],['7:00 PM','Stretch & Reset','Neha · Studio B']],
  Fri:[['6:30 AM','Strength Foundations','Samira · Studio A'],['5:30 PM','Dance Cardio','Aarav · Studio B'],['7:30 PM','Mobility Flow','Neha · Studio B']],
  Sat:[['9:00 AM','Cardio Circuit','Aarav · Studio A'],['10:30 AM','Functional Strength','Samira · Studio A'],['12:00 PM','Stretch & Reset','Neha · Studio B']]
};
const days=$('#scheduleDays');const events=$('#scheduleEvents');let activeDay='Mon';
function renderSchedule(){
  [...days.children].forEach(btn=>{
    const active=btn.dataset.day===activeDay;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',String(active));
  });
  events.replaceChildren();
  TIMETABLE[activeDay].forEach(([time,title,info])=>{
    const row=document.createElement('article');row.className='class-row';
    const clock=document.createElement('span');clock.className='class-time';clock.textContent=time;
    const details=document.createElement('div');details.className='class-details';
    const name=document.createElement('strong');name.textContent=title;
    const meta=document.createElement('small');meta.textContent=info;
    details.append(name,meta);
    const ask=document.createElement('button');ask.type='button';ask.className='class-ask';ask.textContent='Ask about class ↗';ask.addEventListener('click',()=>selectInterest(title));
    row.append(clock,details,ask);events.append(row);
  });
}
Object.keys(TIMETABLE).forEach(day=>{
  const button=document.createElement('button');button.type='button';button.className='day-tab';button.dataset.day=day;button.textContent=day;button.setAttribute('aria-pressed','false');
  button.addEventListener('click',()=>{activeDay=day;renderSchedule()});days.append(button);
});
renderSchedule();

// Safe preview: avoid injecting form values into HTML.
const contactForm=$('#contactForm');
contactForm.addEventListener('submit',event=>{
  event.preventDefault();if(!contactForm.reportValidity())return;
  const data=[
    ['Name',$('#contactName').value.trim()],
    ['Email',$('#contactEmail').value.trim()],
    ['Interested in',interestSelect.value],
    ['Message',$('#contactMessage').value.trim()]
  ];
  if(!data[0][1]||!data[3][1]){contactForm.reportValidity();return}
  const dl=$('#previewFields');dl.replaceChildren();
  data.forEach(([key,value])=>{
    const div=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');
    dt.textContent=key;dd.textContent=value;div.append(dt,dd);dl.append(div);
  });
  $('#enquiryPreview').hidden=false;
  $('#enquiryPreview').scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'nearest'});
});
$('#editEnquiry').addEventListener('click',()=>{$('#enquiryPreview').hidden=true;$('#contactName').focus()});

// Close menu with Escape or when tapping outside it.
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu()});
