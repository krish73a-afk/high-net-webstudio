/* ELEVATE LEARNING · ADVANCED DEMO
   Editable demo course data is directly below.
   No backend, analytics, or personal-data storage.
*/
"use strict";
document.documentElement.classList.add("js");
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const COURSES = [
  {
    id: "maths", name: "Maths Foundation", category: "school", audience: "Grades 8–10",
    sessions: 3, color: "#efc96c", symbol: "π",
    description: "Make sense of the numbers, patterns and puzzles behind everyday maths.",
    topics: "Algebra, geometry, problem-solving and practical examples"
  },
  {
    id: "physics", name: "Physics Studio", category: "school", audience: "Grades 11–12",
    sessions: 2, color: "#80c9c4", symbol: "⚛",
    description: "Discover the ideas that explain motion, energy and the world around us.",
    topics: "Motion, forces, energy, experiments and calculations"
  },
  {
    id: "english", name: "English Expression", category: "school", audience: "Grades 8–12",
    sessions: 2, color: "#f2ae9e", symbol: "Aa",
    description: "Build confidence in reading, writing and putting your thoughts into words.",
    topics: "Reading, vocabulary, grammar, speaking and writing"
  },
  {
    id: "aptitude", name: "Aptitude Lab", category: "entrance", audience: "Entrance exam learners",
    sessions: 3, color: "#a4badf", symbol: "◎",
    description: "Approach reasoning problems with a method you can actually remember.",
    topics: "Quantitative reasoning, logic, patterns and time practice"
  },
  {
    id: "coding", name: "Coding Starter", category: "skills", audience: "Curious beginners",
    sessions: 2, color: "#f5d583", symbol: "{ }",
    description: "Turn small ideas into your first interactive projects, one step at a time.",
    topics: "Logic, HTML, CSS, JavaScript basics and mini projects"
  },
  {
    id: "strategy", name: "Exam Strategy", category: "entrance", audience: "Students planning assessments",
    sessions: 2, color: "#b6d4aa", symbol: "✓",
    description: "Build manageable study habits and get familiar with different question styles.",
    topics: "Practice planning, review methods, mock questions and focus"
  }
];

const CATEGORY_NAMES = {
  all: "All programs", school: "School subjects",
  entrance: "Entrance prep", skills: "Creative skills"
};

// Shared navigation, progress bar, and copyright year
const menuButton = $("#menuToggle");
const navLinks = $("#navLinks");
function closeMenu() {
  if (!navLinks || !menuButton) return;
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("a", navLinks).forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (innerWidth > 850) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", e => {
    if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
  });
}
if ($("#year")) $("#year").textContent = new Date().getFullYear();
if ($("#studioBack") && location.pathname.includes("/demos/education/")) {
  $("#studioBack").hidden = false;
  $("#studioBack").href = "../../../index.html";
}
const progress = $("#scrollIndicator");
let scrollScheduled = false;
function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (total > 0 ? scrollY / total * 100 : 0) + "%";
  scrollScheduled = false;
}
window.addEventListener("scroll", () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

// Short, skippable book opening. Only on first home visit in a tab.
const intro = $("#intro");
if (intro) {
  let seen = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { seen = sessionStorage.getItem("elevate-intro-seen") === "yes"; } catch (_) {}
  if (!seen && !reduced) {
    intro.classList.add("is-playing");
    document.body.style.overflow = "hidden";
    const skip = $("#skipIntro");
    let finished = false;
    let hideTimer;
    function finishIntro() {
      if (finished) return;
      finished = true;
      clearTimeout(hideTimer);
      intro.classList.add("is-hiding");
      document.body.style.overflow = "";
      try { sessionStorage.setItem("elevate-intro-seen", "yes"); } catch (_) {}
      setTimeout(() => { intro.classList.remove("is-playing", "is-hiding"); intro.hidden = true; }, 420);
    }
    skip.addEventListener("click", finishIntro);
    hideTimer = setTimeout(finishIntro, 2350);
  } else { intro.hidden = true; }
}

// Subtle section reveals; decorative only, no essential text concealed without JavaScript.
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const elements = $$(".section-head, .preview-course, .experience-card, .pillar-cards article, .philosophy-copy, .philosophy-image-wrap, .journey-steps, .form-shell");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .06, rootMargin: "0px 0px -20px 0px" });
  elements.forEach(element => { element.classList.add("reveal"); observer.observe(element); });
}

// Accessible course finder, detail dialogs, and a two-course shortlist.
const grid = $("#courseGrid");
if (grid) {
  const search = $("#courseSearch");
  const sort = $("#sortCourses");
  const categoryButtons = $$(".chip[data-category]");
  const selected = new Set();
  let category = "all";
  const params = new URLSearchParams(location.search);
  if (CATEGORY_NAMES[params.get("category")]) category = params.get("category");

  const courseDialog = $("#courseDialog");
  const compareDialog = $("#compareDialog");
  let lastTrigger = null;

  function updateChips() {
    categoryButtons.forEach(button => {
      const pressed = button.dataset.category === category;
      button.classList.toggle("selected", pressed);
      button.setAttribute("aria-pressed", String(pressed));
    });
  }
  function visibleCourses() {
    const q = search.value.trim().toLowerCase();
    let found = COURSES.filter(c =>
      (category === "all" || c.category === category) &&
      [c.name, c.description, c.topics, c.audience].join(" ").toLowerCase().includes(q)
    );
    if (sort.value === "az") found = found.sort((a, b) => a.name.localeCompare(b.name));
    if (sort.value === "hours") found = found.sort((a, b) => b.sessions - a.sessions);
    return found;
  }
  function updateDock() {
    const dock = $("#compareDock");
    dock.hidden = selected.size === 0;
    $("#compareLabel").textContent = `${selected.size} of 2 selected`;
    $("#openCompare").disabled = selected.size !== 2;
  }
  function makeCard(c) {
    const article = document.createElement("article");
    article.className = "catalog-card";
    const checked = selected.has(c.id);
    article.innerHTML = `
      <div class="catalog-art" style="background:${c.color}">
        <span class="tag">${CATEGORY_NAMES[c.category].toUpperCase()}</span>
        <span class="big-symbol" aria-hidden="true">${c.symbol}</span>
      </div>
      <div class="catalog-content">
        <h3>${c.name}</h3>
        <p>${c.description}</p>
        <div class="catalog-meta"><span>${c.audience}</span><span>${c.sessions} sessions / week</span></div>
        <div class="catalog-actions">
          <button class="view-course" type="button" data-open="${c.id}" aria-label="Details for ${c.name}">View details ↗</button>
          <button class="compare-button" type="button" data-compare="${c.id}" aria-pressed="${checked}" aria-label="${checked ? 'Remove' : 'Compare'} ${c.name}">${checked ? '✓ Added' : '+ Compare'}</button>
        </div>
      </div>`;
    return article;
  }
  function renderCourses() {
    const found = visibleCourses();
    grid.replaceChildren(...found.map(makeCard));
    $("#catalogCount").textContent = `${found.length} program${found.length === 1 ? "" : "s"} found`;
    $("#catalogEmpty").hidden = found.length !== 0;
    updateChips();
    updateDock();
  }
  categoryButtons.forEach(button => button.addEventListener("click", () => {
    category = button.dataset.category;
    renderCourses();
  }));
  search.addEventListener("input", renderCourses);
  sort.addEventListener("change", renderCourses);
  $("#clearCourseFilters").addEventListener("click", () => {
    category = "all"; search.value = ""; sort.value = "recommended"; renderCourses(); search.focus();
  });
  grid.addEventListener("click", e => {
    const open = e.target.closest("[data-open]");
    const compare = e.target.closest("[data-compare]");
    if (open) {
      const c = COURSES.find(item => item.id === open.dataset.open);
      if (!c) return;
      lastTrigger = open;
      $("#dialogTop").style.background = c.color;
      $("#dialogCategory").textContent = CATEGORY_NAMES[c.category].toUpperCase();
      $("#dialogTitle").textContent = c.name;
      $("#dialogSummary").textContent = c.description;
      $("#dialogAudience").textContent = c.audience;
      $("#dialogSessions").textContent = `${c.sessions} sample sessions per week`;
      $("#dialogTopics").textContent = c.topics;
      $("#courseEnquire").href = `admissions.html?course=${encodeURIComponent(c.name)}`;
      courseDialog.showModal();
      $("#closeCourseDialog").focus();
    }
    if (compare) {
      const id = compare.dataset.compare;
      if (selected.has(id)) selected.delete(id);
      else if (selected.size < 2) selected.add(id);
      else {
        // Keep a two-item comparison simple and predictable.
        $("#compareLabel").textContent = "Remove a course before adding another";
        return;
      }
      renderCourses();
      grid.querySelector(`[data-compare="${id}"]`)?.focus();
    }
  });
  $("#closeCourseDialog").addEventListener("click", () => courseDialog.close());
  courseDialog.addEventListener("close", () => lastTrigger?.focus());
  courseDialog.addEventListener("click", e => { if (e.target === courseDialog) courseDialog.close(); });
  $("#clearCompare").addEventListener("click", () => { selected.clear(); renderCourses(); });
  $("#openCompare").addEventListener("click", () => {
    if (selected.size !== 2) return;
    const courses = COURSES.filter(c => selected.has(c.id));
    $("#compareColumns").replaceChildren(...courses.map(c => {
      const col = document.createElement("div");
      col.className = "compare-column";
      const title = document.createElement("h3"); title.textContent = c.name;
      const desc = document.createElement("p"); desc.textContent = c.description;
      const dl = document.createElement("dl");
      [["Good for",c.audience],["Weekly rhythm",`${c.sessions} sessions`],["Topics",c.topics]].forEach(([key,value]) => {
        const dt = document.createElement("dt");dt.textContent=key;
        const dd = document.createElement("dd");dd.textContent=value;
        dl.append(dt,dd);
      });
      col.append(title,desc,dl);
      return col;
    }));
    compareDialog.showModal();
    $("#closeCompareDialog").focus();
  });
  $("#closeCompareDialog").addEventListener("click", () => compareDialog.close());
  compareDialog.addEventListener("click", e => { if (e.target === compareDialog) compareDialog.close(); });
  renderCourses();
}

// Example timetable on the Approach page.
const timetable = {
  Monday: [
    ["4:00 PM", "Maths Foundation", "Algebra, made practical", "School"],
    ["5:30 PM", "English Expression", "Writing with confidence", "School"],
    ["7:00 PM", "Coding Starter", "Your first mini project", "Skills"]
  ],
  Wednesday: [
    ["4:00 PM", "Physics Studio", "Energy and motion", "School"],
    ["5:30 PM", "Aptitude Lab", "Patterns and reasoning", "Prep"],
    ["7:00 PM", "Maths Foundation", "Practice together", "School"]
  ],
  Saturday: [
    ["9:30 AM", "Exam Strategy", "Review and reflect", "Prep"],
    ["11:00 AM", "Coding Starter", "Make a webpage", "Skills"],
    ["1:00 PM", "Aptitude Lab", "Problem-solving studio", "Prep"]
  ]
};
if ($("#scheduleEvents")) {
  const eventList = $("#scheduleEvents");
  function showDay(day) {
    if (!timetable[day]) return;
    $("#dayHeading").textContent = day.toUpperCase();
    eventList.replaceChildren(...timetable[day].map(([time,name,desc,category]) => {
      const row = document.createElement("div"); row.className="schedule-event";
      const t=document.createElement("time");t.textContent=time;
      const descWrap=document.createElement("div");
      const h=document.createElement("h3");h.textContent=name;
      const p=document.createElement("p");p.textContent=desc;
      const label=document.createElement("span");label.textContent=category;
      descWrap.append(h,p);row.append(t,descWrap,label);return row;
    }));
    $$(".day-btn").forEach(btn => {
      const active=btn.dataset.day===day;
      btn.classList.toggle("selected",active);
      btn.setAttribute("aria-pressed",String(active));
    });
  }
  $$(".day-btn").forEach(btn => btn.addEventListener("click", () => showDay(btn.dataset.day)));
  showDay("Monday");
}

// Admissions: frontend-only preview. No requests or storage of personal details.
const admissionForm = $("#admissionForm");
if (admissionForm) {
  const requestedCourse = new URLSearchParams(location.search).get("course");
  if (COURSES.some(c => c.name === requestedCourse)) $("#enquiryCourse").value = requestedCourse;
  admissionForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!admissionForm.reportValidity()) return;
    const data = new FormData(admissionForm);
    const firstName = String(data.get("studentName") || "").trim().split(/\s+/)[0].slice(0,50);
    $("#successMessage").textContent = `Thanks, ${firstName}. You explored ${data.get("area")} with a preference for ${String(data.get("time")).toLowerCase()}. On a live academy site, this is where the team would explain the next steps.`;
    $("#admissionError").hidden = true;
    admissionForm.reset(); // Forget what was entered immediately after preview.
    admissionForm.hidden = true;
    $("#admissionSuccess").hidden = false;
    $("#resetEnquiry").focus();
  });
  $("#resetEnquiry").addEventListener("click", () => {
    $("#admissionSuccess").hidden = true;
    admissionForm.hidden = false;
    admissionForm.reset();
    $("#enquiryCourse").focus();
  });
}
