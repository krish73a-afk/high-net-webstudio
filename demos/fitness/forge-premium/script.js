document.documentElement.classList.add('js');
const yearEls = document.querySelectorAll('#year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());

const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

const PROGRAMS = [
  {
    title: 'Foundational Strength',
    category: 'strength',
    duration: '60 min',
    level: 'All levels',
    description: 'A premium strength pathway focused on technique, confidence, and long-term progression quality.',
    focus: ['Barbell quality', 'Progression', 'Form integrity']
  },
  {
    title: 'Conditioning Atelier',
    category: 'conditioning',
    duration: '50 min',
    level: 'Intermediate',
    description: 'Conditioning delivered with more precision than chaos, built to increase work capacity and composure.',
    focus: ['Intervals', 'Aerobic base', 'Capacity']
  },
  {
    title: 'Movement Restoration',
    category: 'recovery',
    duration: '45 min',
    level: 'All levels',
    description: 'Mobility, range, breath, and tissue-focused work that supports better lifting and better recovery.',
    focus: ['Mobility', 'Recovery', 'Control']
  },
  {
    title: 'Black Label Physique',
    category: 'physique',
    duration: '65 min',
    level: 'Advanced',
    description: 'A premium physique pathway pairing strength and conditioning with a more refined training flow.',
    focus: ['Hypertrophy', 'Body composition', 'Detail']
  }
];

const SCHEDULE = {
  Monday: [ ['6:30 AM', 'Foundational Strength', 'Coach Arjun'], ['6:15 PM', 'Conditioning Atelier', 'Coach Isha'] ],
  Tuesday: [ ['7:00 AM', 'Movement Restoration', 'Coach Kavya'], ['7:00 PM', 'Black Label Physique', 'Coach Arjun'] ],
  Wednesday: [ ['6:30 AM', 'Foundational Strength', 'Coach Arjun'], ['6:30 PM', 'Movement Restoration', 'Coach Kavya'] ],
  Thursday: [ ['7:00 AM', 'Conditioning Atelier', 'Coach Isha'], ['7:00 PM', 'Black Label Physique', 'Coach Arjun'] ],
  Friday: [ ['6:30 AM', 'Foundational Strength', 'Coach Arjun'], ['6:15 PM', 'Conditioning Atelier', 'Coach Isha'] ],
  Saturday: [ ['8:00 AM', 'Movement Restoration', 'Coach Kavya'], ['9:30 AM', 'Black Label Physique', 'Coach Arjun'] ]
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]));
}

const homeProgramsGrid = document.getElementById('homeProgramsGrid');
if (homeProgramsGrid) {
  homeProgramsGrid.innerHTML = PROGRAMS.map(program => `
    <article class="signature-card reveal visible">
      <div class="signature-top">
        <span class="signature-badge">${program.category.toUpperCase()}</span>
        <span class="mini-tag">${program.level}</span>
      </div>
      <h4>${program.title}</h4>
      <p>${program.description}</p>
      <div class="signature-meta">
        <span>${program.duration}</span>
        ${program.focus.map(item => `<span>${item}</span>`).join('')}
      </div>
      <a href="programs.html" class="btn btn-outline small-btn signature-btn">View pathway</a>
    </article>
  `).join('');
}

const daySwitcher = document.getElementById('daySwitcher');
const scheduleBoard = document.getElementById('scheduleBoard');
let activeDay = 'Monday';
function renderSchedule() {
  if (!scheduleBoard) return;
  scheduleBoard.innerHTML = SCHEDULE[activeDay].map(session => `
    <article class="class-item">
      <div>
        <strong>${session[1]}</strong>
        <small>${session[2]}</small>
      </div>
      <span>${session[0]}</span>
    </article>
  `).join('');
}
if (daySwitcher) {
  Object.keys(SCHEDULE).forEach((day, index) => {
    const btn = document.createElement('button');
    btn.className = `day-btn ${index === 0 ? 'active' : ''}`;
    btn.type = 'button';
    btn.textContent = day;
    btn.setAttribute('aria-pressed', String(index === 0));
    btn.addEventListener('click', () => {
      activeDay = day;
      [...daySwitcher.children].forEach(child => { child.classList.remove('active'); child.setAttribute('aria-pressed','false'); });
      btn.setAttribute('aria-pressed','true');
      btn.classList.add('active');
      renderSchedule();
    });
    daySwitcher.appendChild(btn);
  });
  renderSchedule();
}

const programGrid = document.getElementById('programGrid');
const programFilters = document.getElementById('programFilters');
const programSearch = document.getElementById('programSearch');
const programCount = document.getElementById('programCount');
let currentFilter = 'all';

function renderProgramGrid() {
  if (!programGrid) return;
  const term = (programSearch?.value || '').trim().toLowerCase();
  const filtered = PROGRAMS.filter(program => {
    const filterMatch = currentFilter === 'all' || program.category === currentFilter;
    const textMatch = !term || [program.title, program.category, program.duration, program.level, program.description, ...program.focus].join(' ').toLowerCase().includes(term);
    return filterMatch && textMatch;
  });

  programGrid.innerHTML = filtered.length ? filtered.map(program => `
    <article class="program-card reveal visible">
      <span class="signature-badge">${program.category.toUpperCase()}</span>
      <h4>${program.title}</h4>
      <p>${program.description}</p>
      <div class="meta-row">
        <span class="mini-tag">${program.duration}</span>
        <span class="mini-tag">${program.level}</span>
      </div>
      <button class="btn btn-outline small-btn open-program" type="button" data-title="${encodeURIComponent(program.title)}">Open details</button>
    </article>
  `).join('') : `<article class="program-card reveal visible"><h4>No pathway found</h4><p>Try a different search term or switch the selected filter.</p></article>`;

  if (programCount) programCount.textContent = `Showing ${filtered.length} of ${PROGRAMS.length} pathways`;
}

if (programFilters) {
  ['all', 'strength', 'conditioning', 'recovery', 'physique'].forEach((filter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `pill ${index === 0 ? 'active' : ''}`;
    button.textContent = filter === 'all' ? 'All pathways' : filter;
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      currentFilter = filter;
      [...programFilters.children].forEach(child => { child.classList.remove('active'); child.setAttribute('aria-pressed','false'); });
      button.setAttribute('aria-pressed','true');
      button.classList.add('active');
      renderProgramGrid();
    });
    programFilters.appendChild(button);
  });
  programSearch?.addEventListener('input', renderProgramGrid);
  renderProgramGrid();
}

const programModal = document.getElementById('programModal');
function openProgramModal(title) {
  if (!programModal) return;
  const program = PROGRAMS.find(item => item.title === decodeURIComponent(title));
  if (!program) return;
  document.getElementById('modalCategory').textContent = `${program.category.toUpperCase()} · ${program.level}`;
  document.getElementById('modalTitle').textContent = program.title;
  document.getElementById('modalText').textContent = program.description;
  document.getElementById('modalMeta').innerHTML = `
    <span>Duration: ${escapeHtml(program.duration)}</span>
    <span>Focus: ${program.focus.map(escapeHtml).join(' · ')}</span>
  `;
  programModal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeProgramModal() {
  if (programModal) {
    programModal.hidden = true;
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', (event) => {
  const openProgram = event.target.closest('.open-program');
  if (openProgram) openProgramModal(openProgram.dataset.title);
  if (event.target.hasAttribute('data-close-modal')) closeProgramModal();
});

const joinForm = document.getElementById('joinForm');
const enquiryModal = document.getElementById('enquiryModal');
function closeEnquiryModal() {
  if (enquiryModal) {
    enquiryModal.hidden = true;
    document.body.style.overflow = '';
  }
}
if (joinForm) {
  const params = new URLSearchParams(location.search);
  const planParam = params.get('plan');
  const preferredPlan = document.getElementById('preferredPlan');
  const mapping = {
    'essential-forge': 'Essential FORGE',
    'performance-membership': 'Performance Membership',
    'black-label-coaching': 'Black Label Coaching'
  };
  if (planParam && mapping[planParam]) preferredPlan.value = mapping[planParam];

  joinForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!joinForm.reportValidity()) return;

    const fields = [
      ['Name', document.getElementById('memberName').value],
      ['Email', document.getElementById('memberEmail').value],
      ['Phone', document.getElementById('memberPhone').value],
      ['Plan', preferredPlan.value],
      ['Main goal', document.getElementById('mainGoal').value],
      ['Preferred start', document.getElementById('startTime').value],
      ['Training background', document.getElementById('memberNotes').value || 'No extra background added.']
    ];

    document.getElementById('enquirySummary').innerHTML = fields.map(([label, value]) => `
      <div class="summary-item"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</div>
    `).join('');

    enquiryModal.hidden = false;
    document.body.style.overflow = 'hidden';
  });
}

document.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-close-enquiry')) closeEnquiryModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProgramModal();
    closeEnquiryModal();
  }
});
