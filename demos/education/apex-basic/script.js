/* APEX ACADEMY — BASIC WEBSITE INTERACTIONS
   Minimal animation, no framework, no libraries, no submitted data.
   Edit course information and example schedule in the objects below. */
"use strict";

const courses = {
  maths910: {
    title: "Mathematics, made clearer",
    description: "A friendly starting point for students who want to strengthen core ideas before moving on to more challenging questions.",
    topics: ["Algebra and equations", "Geometry and shapes", "Working through word problems", "Practice and revision methods"]
  },
  science910: {
    title: "Science in everyday life",
    description: "Connect classroom science with familiar examples, and explore the key principles one idea at a time.",
    topics: ["Motion and forces", "Atoms and materials", "Living systems", "Observation and guided experiments"]
  },
  maths1112: {
    title: "Maths for the next level",
    description: "Build fluency in senior-secondary mathematics with clear explanations and structured problem-solving.",
    topics: ["Functions and graphs", "Trigonometry", "Introduction to calculus", "Step-by-step practice sets"]
  },
  physics1112: {
    title: "Physics, from first principles",
    description: "Explore the why behind physical laws before applying formulas to problems and examples.",
    topics: ["Motion and mechanics", "Work and energy", "Electricity", "Numerical problem solving"]
  },
  jee: {
    title: "Engineering exam foundations",
    description: "An introductory structure for organizing engineering entrance preparation without overwhelming the learner.",
    topics: ["Maths fundamentals", "Physics reasoning", "Chemistry foundations", "Practice and revision planning"]
  },
  neet: {
    title: "Medical exam foundations",
    description: "An example study path for reviewing essential science concepts and organizing consistent practice.",
    topics: ["Biology concepts", "Chemistry basics", "Physics fundamentals", "Structured revision"]
  }
};

const schedule = {
  mon: {time:"4:00 – 5:00 PM", title:"Build the concept", desc:"Explore a new maths idea, then walk through a few examples together.",tags:["Concepts","Worked examples"], index:"01 / 03"},
  wed: {time:"4:00 – 5:00 PM", title:"Put ideas to work",desc:"Practise with short questions, compare approaches, and talk through tricky steps.",tags:["Practice","Questions"],index:"02 / 03"},
  sat: {time:"10:00 – 11:00 AM", title:"Review the week",desc:"Revisit important ideas, spot gaps in understanding, and plan what comes next.",tags:["Revision","Feedback"],index:"03 / 03"}
};

const el = id => document.getElementById(id);
const nav = el("mainNav");
const menuButton = el("menuButton");
const courseCards = [...document.querySelectorAll(".course-card")];
let selectedCategory = "all";

// Responsive navigation
function closeMenu(){nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open menu");}
menuButton.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded",String(open));
  menuButton.setAttribute("aria-label",open?"Close menu":"Open menu");
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
window.addEventListener("resize",()=>{if(window.innerWidth>810)closeMenu();});

// Course filters and live search
function updateCourses(){
  const query = el("courseSearch").value.trim().toLocaleLowerCase();
  let visible = 0;
  for(const card of courseCards){
    const categoryMatches = selectedCategory==="all" || card.dataset.category===selectedCategory;
    const searchMatches = (card.dataset.search+" "+card.innerText).toLocaleLowerCase().includes(query);
    card.hidden = !(categoryMatches && searchMatches);
    if(!card.hidden)visible++;
  }
  el("emptyCourses").hidden = visible!==0;
}
function setCategory(category){
  selectedCategory=category;
  document.querySelectorAll("#courseFilters button").forEach(button=>{
    const isActive=button.dataset.category===category;
    button.classList.toggle("active",isActive);
    button.setAttribute("aria-pressed",String(isActive));
  });
  updateCourses();
}
document.querySelectorAll("#courseFilters button").forEach(button=>button.addEventListener("click",()=>setCategory(button.dataset.category)));
el("courseSearch").addEventListener("input",updateCourses);

// Course details, accessible native dialog with focus management
const dialog = el("courseDialog");
const closeDialog=()=>dialog.close();
function showCourse(id){
  const info = courses[id];
  if(!info)return;
  el("dialogHeading").textContent = info.title;
  el("dialogDescription").textContent = info.description;
  el("dialogTopics").replaceChildren();
  for(const topic of info.topics){const li=document.createElement("li");li.textContent=topic;el("dialogTopics").append(li);}
  el("askAboutCourse").dataset.course=info.title;
  dialog.showModal();
  el("dialogClose").focus();
}
document.querySelectorAll("[data-course]").forEach(button=>button.addEventListener("click",()=>showCourse(button.dataset.course)));
el("dialogClose").addEventListener("click",closeDialog);
el("dialogDismiss").addEventListener("click",closeDialog);
dialog.addEventListener("click",event=>{if(event.target===dialog)closeDialog();});
el("askAboutCourse").addEventListener("click",event=>{
  const course=event.currentTarget.dataset.course;
  el("visitorCourse").value=course;
  closeDialog();
  el("contact").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  // Deliberately does not send or store data.
});

// Interactive example weekly schedule
const dayButtons=[...document.querySelectorAll(".day-tab")];
for(const button of dayButtons){
  button.addEventListener("click",()=>{
    const item=schedule[button.dataset.day];
    if(!item)return;
    dayButtons.forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
    el("lessonTime").textContent=item.time;
    el("lessonTitle").textContent=item.title;
    el("lessonDesc").textContent=item.desc;
    el("lessonIndex").textContent=item.index;
    el("lessonTags").replaceChildren();
    item.tags.forEach(tag=>{const s=document.createElement("span");s.textContent=tag;el("lessonTags").append(s);});
  });
}

// This is just a user-interface demo. Never save, log, or transmit fields.
el("enquiryForm").addEventListener("submit",event=>{
  event.preventDefault();
  if(!event.currentTarget.reportValidity())return;
  const feedback=el("formFeedback");
  feedback.classList.add("success");
  feedback.textContent="✓ Enquiry preview complete. In a real academy website, this is where the submission would be connected. No information was sent or saved.";
  event.currentTarget.reset();
});
el("enquiryForm").addEventListener("input",()=>{
  const f=el("formFeedback");f.classList.remove("success");f.textContent="This interaction is for demonstration only.";
});

el("year").textContent=new Date().getFullYear();
