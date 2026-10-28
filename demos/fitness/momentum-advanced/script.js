document.documentElement.classList.add('js');
const yearEls = document.querySelectorAll('#year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealEls = document.querySelectorAll('.reveal');
let revealObserver = null;
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

const page = document.body.dataset.page;

// Rolling dumbbell welcome — skippable, first visit per tab, and fail-safe.
// The overlay starts hidden in HTML so a blocked script cannot cover the site.
const introOverlay = document.getElementById('introOverlay');
const skipIntro = document.getElementById('skipIntro');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (introOverlay) {
  const forceIntro = new URLSearchParams(location.search).get('intro') === '1';
  let previouslySeen = false;
  try { previouslySeen = sessionStorage.getItem('momentum-intro-v2') === 'seen'; } catch (_) {}
  if (page === 'home' && !reducedMotion && (!previouslySeen || forceIntro)) {
    introOverlay.hidden = false;
    introOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('intro-lock');
    // Apply the playing class on the next frame to start all the animations together.
    requestAnimationFrame(() => requestAnimationFrame(() => introOverlay.classList.add('is-playing')));
    let finished = false;
    let introTimeout;
    const finishIntro = () => {
      if (finished) return;
      finished = true;
      clearTimeout(introTimeout);
      introOverlay.classList.add('done');
      introOverlay.classList.remove('is-playing');
      introOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('intro-lock');
      try { sessionStorage.setItem('momentum-intro-v2', 'seen'); } catch (_) {}
      window.setTimeout(() => { introOverlay.hidden = true; }, 700);
    };
    skipIntro?.addEventListener('click', finishIntro);
    introTimeout = window.setTimeout(finishIntro, 3450);
  } else {
    introOverlay.hidden = true;
  }
}

const PROGRAMS = [
  { title:'Strength Base', category:'strength', level:'All levels', duration:'60 min', description:'A foundation program focused on compound lifts, technique and progressive overload.', focus:['Barbell basics','Progression','Confidence'] },
  { title:'HIIT Engine', category:'cardio', level:'Intermediate', duration:'45 min', description:'Short, intense interval sessions built for conditioning, stamina and fast-paced training.', focus:['Intervals','Sweat','Work capacity'] },
  { title:'Mobility Flow', category:'recovery', level:'All levels', duration:'40 min', description:'A guided mobility and recovery system to improve movement, flexibility and control.', focus:['Mobility','Recovery','Breathing'] },
  { title:'Body Recomp', category:'strength', level:'Beginner+', duration:'50 min', description:'A structured path for fat loss and muscle development using resistance and conditioning.', focus:['Fat loss','Strength','Structure'] },
  { title:'Athlete Build', category:'performance', level:'Advanced', duration:'70 min', description:'A power and agility program for members seeking athletic movement and speed.', focus:['Power','Speed','Athleticism'] },
  { title:'Core & Balance', category:'recovery', level:'Beginner', duration:'35 min', description:'A lower-impact option built around trunk strength, balance and movement quality.', focus:['Core control','Balance','Stability'] }
];

const SCHEDULE = {
  Monday: [ ['6:30 AM','Strength Base','Coach Riya'], ['7:30 AM','Mobility Flow','Coach Aman'], ['6:30 PM','HIIT Engine','Coach Zaid'] ],
  Tuesday:[ ['6:30 AM','Body Recomp','Coach Riya'], ['5:30 PM','Core & Balance','Coach Meera'], ['7:00 PM','Athlete Build','Coach Zaid'] ],
  Wednesday:[ ['7:00 AM','Strength Base','Coach Aman'], ['6:00 PM','Mobility Flow','Coach Meera'], ['7:30 PM','HIIT Engine','Coach Zaid'] ],
  Thursday:[ ['6:30 AM','Body Recomp','Coach Riya'], ['5:30 PM','Athlete Build','Coach Aman'], ['7:00 PM','Core & Balance','Coach Meera'] ],
  Friday:[ ['7:00 AM','Strength Base','Coach Aman'], ['6:00 PM','HIIT Engine','Coach Zaid'], ['7:15 PM','Mobility Flow','Coach Meera'] ],
  Saturday:[ ['8:00 AM','Athlete Build','Coach Zaid'], ['9:15 AM','Body Recomp','Coach Riya'], ['10:30 AM','Core & Balance','Coach Meera'] ]
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}

// Home preview cards
const previewGrid = document.getElementById('programPreviewGrid');
if (previewGrid) {
  previewGrid.innerHTML = PROGRAMS.slice(0, 3).map(p => `
    <article class="preview-card reveal">
      <span class="chip">${p.category.toUpperCase()}</span>
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <div class="preview-meta"><span>${p.duration}</span><span>${p.level}</span></div>
    </article>
  `).join('');
  // These cards were created after the first observer pass; register them now.
  previewGrid.querySelectorAll('.reveal').forEach(el => {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('visible');
  });
}

// Schedule
const daySwitcher = document.getElementById('daySwitcher');
const scheduleBoard = document.getElementById('scheduleBoard');
let activeDay = 'Monday';
function renderSchedule() {
  if (!scheduleBoard) return;
  scheduleBoard.innerHTML = SCHEDULE[activeDay].map(item => `
    <article class="class-item">
      <div><strong>${item[1]}</strong><small>${item[2]}</small></div>
      <span>${item[0]}</span>
    </article>
  `).join('');
}
if (daySwitcher) {
  Object.keys(SCHEDULE).forEach((day, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `day-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = day;
    btn.setAttribute('aria-pressed', String(index === 0));
    btn.addEventListener('click', () => {
      activeDay = day;
      [...daySwitcher.children].forEach(ch => { ch.classList.remove('active'); ch.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');
      renderSchedule();
    });
    daySwitcher.appendChild(btn);
  });
  renderSchedule();
}

// Program explorer page
const programGrid = document.getElementById('programGrid');
const programFilters = document.getElementById('programFilters');
const programSearch = document.getElementById('programSearch');
const programCount = document.getElementById('programCount');
let currentFilter = 'all';
function renderProgramGrid() {
  if (!programGrid) return;
  const term = (programSearch?.value || '').trim().toLowerCase();
  const filtered = PROGRAMS.filter(p => {
    const filterMatch = currentFilter === 'all' || p.category === currentFilter;
    const textMatch = !term || [p.title, p.category, p.level, p.duration, p.description, ...p.focus].join(' ').toLowerCase().includes(term);
    return filterMatch && textMatch;
  });
  programGrid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="program-card">
      <span class="mini-tag">${p.category.toUpperCase()}</span>
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <div class="meta-row"><span class="mini-tag">${p.duration}</span><span class="mini-tag">${p.level}</span></div>
      <button class="btn btn-outline small-btn open-program" data-title="${encodeURIComponent(p.title)}" type="button">View details</button>
    </article>
  `).join('') : '<p class="empty-results">No programs match your search. Try a different word or category.</p>';
  programCount.textContent = `Showing ${filtered.length} of ${PROGRAMS.length} programs`;
}
if (programFilters) {
  ['all','strength','cardio','recovery','performance'].forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = `pill ${i === 0 ? 'active' : ''}`;
    btn.type = 'button';
    btn.textContent = cat === 'all' ? 'All programs' : cat;
    btn.setAttribute('aria-pressed', String(i === 0));
    btn.addEventListener('click', () => {
      currentFilter = cat;
      [...programFilters.children].forEach(el => { el.classList.remove('active'); el.setAttribute('aria-pressed','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      renderProgramGrid();
    });
    programFilters.appendChild(btn);
  });
  programSearch?.addEventListener('input', renderProgramGrid);
  renderProgramGrid();
}

const programModal = document.getElementById('programModal');
let previousProgramFocus = null;
function openProgramModal(title) {
  if (!programModal) return;
  const program = PROGRAMS.find(p => p.title === decodeURIComponent(title));
  if (!program) return;
  previousProgramFocus = document.activeElement;
  document.getElementById('modalCategory').textContent = `${program.category.toUpperCase()} · ${program.level}`;
  document.getElementById('modalTitle').textContent = program.title;
  document.getElementById('modalText').textContent = program.description;
  document.getElementById('modalMeta').innerHTML = `
    <span>Duration: ${escapeHtml(program.duration)}</span>
    <span>Focus: ${program.focus.map(escapeHtml).join(' · ')}</span>
  `;
  programModal.hidden = false;
  document.body.style.overflow = 'hidden';
  programModal.querySelector('.modal-close')?.focus();
}
function closeProgramModal() {
  if (programModal && !programModal.hidden) {
    programModal.hidden = true;
    document.body.style.overflow = '';
    previousProgramFocus?.focus?.();
  }
}

document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('.open-program');
  if (openBtn) openProgramModal(openBtn.dataset.title);
  if (e.target.hasAttribute('data-close-modal')) closeProgramModal();
});

// Join form page
const joinForm = document.getElementById('joinForm');
const enquiryModal = document.getElementById('enquiryModal');
let previousEnquiryFocus = null;
function closeEnquiryModal() {
  if (enquiryModal && !enquiryModal.hidden) {
    enquiryModal.hidden = true;
    document.body.style.overflow = '';
    previousEnquiryFocus?.focus?.();
  }
}
if (joinForm) {
  const params = new URLSearchParams(location.search);
  const planParam = params.get('plan');
  const preferredPlan = document.getElementById('preferredPlan');
  if (planParam) {
    const normalized = {
      'gym-access':'Gym Access',
      'classes-gym':'Classes + Gym',
      'elite-coaching':'Elite Coaching'
    }[planParam];
    if (normalized) preferredPlan.value = normalized;
  }

  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!joinForm.reportValidity()) return;
    const items = [
      ['Name', document.getElementById('memberName').value],
      ['Email', document.getElementById('memberEmail').value],
      ['Phone', document.getElementById('memberPhone').value],
      ['Plan', preferredPlan.value],
      ['Goal', document.getElementById('mainGoal').value],
      ['Preferred start', document.getElementById('startTime').value],
      ['Notes', document.getElementById('memberNotes').value || 'No extra notes added.']
    ];
    document.getElementById('enquirySummary').innerHTML = items.map(([label, value]) => `
      <div class="summary-item"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</div>
    `).join('');
    previousEnquiryFocus = document.activeElement;
    enquiryModal.hidden = false;
    document.body.style.overflow = 'hidden';
    enquiryModal.querySelector('.modal-close')?.focus();
  });
}

document.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close-enquiry')) closeEnquiryModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (introOverlay && !introOverlay.hidden) skipIntro?.click();
    closeProgramModal();
    closeEnquiryModal();
    if (siteNav?.classList.contains('open')) {
      siteNav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded','false');
      menuToggle?.focus();
    }
  }
});
