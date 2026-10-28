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
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .08, rootMargin:'0px 0px -10px 0px'});
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

const DISHES = [
  {title:'Woodfire Tenderloin', category:'grills', price:'₹2,650', chef:true, veg:false, tags:['beef','charcoal','signature'], desc:'Slow-rested tenderloin with pepper jus, root vegetables and roasted garlic mash.', image:'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80'},
  {title:'Smoked Ribeye', category:'grills', price:'₹2,450', chef:true, veg:false, tags:['beef','smoked'], desc:'Ribeye finished with ember butter and crispy shallots.', image:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80'},
  {title:'Herb Roast Chicken', category:'mains', price:'₹1,480', chef:false, veg:false, tags:['poultry','comfort'], desc:'Half roast chicken with herb glaze, jus and buttered greens.', image:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80'},
  {title:'Lobster Saffron Risotto', category:'seafood', price:'₹2,350', chef:true, veg:false, tags:['seafood','risotto'], desc:'Saffron risotto finished with butter-poached lobster and citrus oil.', image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'},
  {title:'Pan-Seared Sea Bass', category:'seafood', price:'₹2,150', chef:false, veg:false, tags:['fish','light'], desc:'Sea bass with beurre blanc, baby carrots and fennel ribbons.', image:'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80'},
  {title:'Truffle Mushroom Pappardelle', category:'pasta', price:'₹1,420', chef:true, veg:true, tags:['truffle','pasta','vegetarian'], desc:'Fresh ribbons, woodland mushrooms, cream reduction and shaved parmesan.', image:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80'},
  {title:'Burnt Butter Ravioli', category:'pasta', price:'₹1,390', chef:false, veg:true, tags:['pasta','vegetarian'], desc:'Ricotta ravioli with sage, browned butter and toasted pine nuts.', image:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80'},
  {title:'Burrata & Heirloom Tomatoes', category:'starters', price:'₹980', chef:false, veg:true, tags:['starter','fresh'], desc:'Creamy burrata, tomatoes, basil oil and aged balsamic.', image:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'},
  {title:'Beef Carpaccio', category:'starters', price:'₹1,150', chef:true, veg:false, tags:['starter','beef'], desc:'Thin-sliced beef, capers, arugula and parmesan dust.', image:'https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=900&q=80'},
  {title:'Charred Asparagus', category:'starters', price:'₹860', chef:false, veg:true, tags:['vegetarian','starter'], desc:'Asparagus with whipped feta, lemon crumbs and toasted almonds.', image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'},
  {title:'Duck Confit Croquettes', category:'starters', price:'₹1,040', chef:false, veg:false, tags:['duck','starter'], desc:'Crisp duck croquettes with mustard aioli.', image:'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80'},
  {title:'Signature Lamb Chops', category:'grills', price:'₹2,280', chef:true, veg:false, tags:['lamb','signature'], desc:'Charcoal-finished chops with rosemary glaze and pomme purée.', image:'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80'},
  {title:'Porcini Barley Bowl', category:'mains', price:'₹1,260', chef:false, veg:true, tags:['grain','vegetarian'], desc:'Barley, porcini broth, grilled roots and herb salad.', image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'},
  {title:'Glazed Salmon', category:'seafood', price:'₹1,980', chef:false, veg:false, tags:['salmon','seafood'], desc:'Maple glaze, charred bok choy and sesame-lime butter.', image:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80'},
  {title:'Wild Mushroom Velouté', category:'starters', price:'₹760', chef:false, veg:true, tags:['soup','vegetarian'], desc:'Velvety mushroom soup with herb oil and crisp sourdough.', image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80'},
  {title:'Truffle Fries', category:'sides', price:'₹520', chef:false, veg:true, tags:['side','vegetarian'], desc:'Hand-cut fries with parmesan, truffle salt and herbs.', image:'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80'},
  {title:'Roasted Garlic Mash', category:'sides', price:'₹490', chef:false, veg:true, tags:['side'], desc:'Creamy mashed potatoes infused with roasted garlic.', image:'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80'},
  {title:'Charred Greens', category:'sides', price:'₹540', chef:false, veg:true, tags:['side','vegetarian'], desc:'Seasonal greens with browned butter and toasted seeds.', image:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80'},
  {title:'Hazelnut Opera Slice', category:'desserts', price:'₹740', chef:true, veg:true, tags:['dessert'], desc:'A rich layered dessert with praline, cream and bittersweet chocolate.', image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'},
  {title:'Vanilla Bean Crème Brûlée', category:'desserts', price:'₹690', chef:false, veg:true, tags:['dessert'], desc:'Silky vanilla custard with crackled caramel top.', image:'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80'},
  {title:'Tiramisu House Style', category:'desserts', price:'₹760', chef:false, veg:true, tags:['dessert','coffee'], desc:'Mascarpone layers, espresso sponge and cocoa dust.', image:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80'},
  {title:'Basil Citrus Cooler', category:'drinks', price:'₹420', chef:false, veg:true, tags:['mocktail'], desc:'Citrus, basil and sparkling tonic with herb ice.', image:'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80'},
  {title:'Smoked Cherry Old Fashioned', category:'drinks', price:'₹620', chef:true, veg:true, tags:['cocktail'], desc:'Aromatic bitters, smoked cherry and orange oils.', image:'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80'},
  {title:'Vintage Espresso Tonic', category:'drinks', price:'₹470', chef:false, veg:true, tags:['coffee'], desc:'Double espresso, tonic, orange zest and a gentle bitter finish.', image:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'}
];

function cardMarkup(dish, buttonLabel='View details'){
  const tagHtml = dish.tags.slice(0,3).map(tag=>`<span>${tag}</span>`).join('');
  const isMenu = buttonLabel === 'View details';
  const action = isMenu
    ? `<button type="button" class="detail-btn" data-title="${encodeURIComponent(dish.title)}">${buttonLabel} ↗</button>`
    : `<a class="detail-btn" href="menu.html?dish=${encodeURIComponent(dish.title)}">${buttonLabel} ↗</a>`;
  return `
    <article class="${isMenu?'menu-item':'dish-card'}">
      <img src="${dish.image}" alt="${dish.title}">
      <div class="dish-body">
        <div class="dish-top">
          <h4>${dish.title}</h4>
          <span class="dish-price">${dish.price}</span>
        </div>
        <p>${dish.desc}</p>
        <div class="dish-tags">${tagHtml}</div>
        ${action}
      </div>
    </article>`;
}

if(document.getElementById('featuredDishes')){
  document.getElementById('featuredDishes').innerHTML = DISHES.filter(d=>d.chef).slice(0,6).map(d=>cardMarkup(d,'Discover dish')).join('');
}

const menuGrid = document.getElementById('menuGrid');
const menuFilters = document.getElementById('menuFilters');
const menuSearch = document.getElementById('menuSearch');
const menuCount = document.getElementById('menuCount');
const vegOnly = document.getElementById('vegOnly');
const chefOnly = document.getElementById('chefOnly');
let currentCategory = 'all';

if(menuGrid){
  const categories = ['all', ...new Set(DISHES.map(d=>d.category))];
  menuFilters.innerHTML = categories.map(cat=>`<button class="chip ${cat==='all'?'active':''}" data-category="${cat}">${cat==='all'?'All dishes':cat}</button>`).join('');

  function renderMenu(){
    const term = menuSearch.value.trim().toLowerCase();
    const filtered = DISHES.filter(d=>{
      const categoryMatch = currentCategory === 'all' || d.category === currentCategory;
      const vegMatch = !vegOnly.checked || d.veg;
      const chefMatch = !chefOnly.checked || d.chef;
      const textMatch = !term || [d.title,d.desc,d.category,...d.tags].join(' ').toLowerCase().includes(term);
      return categoryMatch && vegMatch && chefMatch && textMatch;
    });
    menuGrid.innerHTML = filtered.map(d=>cardMarkup(d)).join('');
    menuCount.textContent = `Showing ${filtered.length} of ${DISHES.length} dishes`;
  }

  menuFilters.addEventListener('click', e=>{
    const btn = e.target.closest('[data-category]');
    if(!btn) return;
    currentCategory = btn.dataset.category;
    [...menuFilters.children].forEach(chip=>chip.classList.toggle('active', chip===btn));
    renderMenu();
  });

  [menuSearch, vegOnly, chefOnly].forEach(el=>el.addEventListener('input', renderMenu));
  renderMenu();
}

const dishModal = document.getElementById('dishModal');
let focusBeforeDish = null;
function openDish(title) {
  const dish = DISHES.find(d => d.title === title);
  if (!dish || !dishModal) return;
  focusBeforeDish = document.activeElement;
  document.getElementById('modalImage').src = dish.image;
  document.getElementById('modalImage').alt = dish.title;
  document.getElementById('modalCategory').textContent = `${dish.category.toUpperCase()} · ${dish.chef ? 'CHEF FAVOURITE' : 'HOUSE SELECTION'}`;
  document.getElementById('modalTitle').textContent = dish.title;
  document.getElementById('modalDesc').textContent = dish.desc;
  document.getElementById('modalTags').textContent = dish.tags.join(' · ');
  document.getElementById('modalPrice').textContent = dish.price;
  dishModal.hidden = false;
  document.body.classList.add('modal-open');
  dishModal.querySelector('.modal-close')?.focus();
}
function closeDish() {
  if (!dishModal || dishModal.hidden) return;
  dishModal.hidden = true;
  document.body.classList.remove('modal-open');
  focusBeforeDish?.focus?.();
}

document.addEventListener('click', event => {
  const button = event.target.closest('button.detail-btn');
  if (button) openDish(decodeURIComponent(button.dataset.title));
  if (event.target.hasAttribute('data-close')) closeDish();
});

if (menuGrid) {
  const requestedDish = new URLSearchParams(location.search).get('dish');
  if (requestedDish && DISHES.some(d => d.title === requestedDish)) {
    setTimeout(() => openDish(requestedDish), 150);
  }
}

const timeSlots = document.getElementById('timeSlots');
let selectedTime = '7:30 PM';
if (timeSlots) {
  ['6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'].forEach((time, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `time-slot ${index === 2 ? 'active' : ''}`;
    button.textContent = time;
    button.setAttribute('aria-pressed', String(index === 2));
    button.addEventListener('click', () => {
      selectedTime = time;
      timeSlots.querySelectorAll('button').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed','false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    });
    timeSlots.appendChild(button);
  });
}

// Construct previews with textContent, never HTML containing untrusted form values.
const summaryModal = document.getElementById('summaryModal');
let focusBeforeSummary = null;
function openSummary(title, fields) {
  if (!summaryModal) return;
  focusBeforeSummary = document.activeElement;
  document.getElementById('summaryTitle').textContent = title;
  const list = document.createElement('ul');
  fields.forEach(([label,value]) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    li.append(strong, document.createTextNode(String(value)));
    list.appendChild(li);
  });
  document.getElementById('summaryBody').replaceChildren(list);
  summaryModal.hidden = false;
  document.body.classList.add('modal-open');
  summaryModal.querySelector('.modal-close')?.focus();
}
function closeSummary() {
  if (!summaryModal || summaryModal.hidden) return;
  summaryModal.hidden = true;
  document.body.classList.remove('modal-open');
  focusBeforeSummary?.focus?.();
}
document.addEventListener('click', e => {
  if (e.target.hasAttribute('data-summary-close')) closeSummary();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDish(); closeSummary();
    if (siteNav) {
      siteNav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded','false');
    }
  }
});

const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  const dateInput = document.getElementById('visitDate');
  const now = new Date();
  const localToday = [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
  dateInput.min = localToday;
  reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!reservationForm.reportValidity()) return;
    const date = dateInput.value;
    if (date < localToday) {
      dateInput.setCustomValidity('Please choose today or a future date.');
      dateInput.reportValidity();
      return;
    }
    dateInput.setCustomValidity('');
    openSummary('Reservation Preview', [
      ['Guest', document.getElementById('guestName').value.trim()],
      ['Email', document.getElementById('guestEmail').value.trim()],
      ['Date', date], ['Preferred time', selectedTime],
      ['Party size', document.getElementById('guestCount').value],
      ['Seating', document.getElementById('seatingPref').value],
      ['Occasion', document.getElementById('occasion').value],
      ['Notes', document.getElementById('specialNotes').value.trim() || 'No special requests']
    ]);
  });
  dateInput.addEventListener('input', ()=>dateInput.setCustomValidity(''));
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    openSummary('Host Team Message Preview', [
      ['Name', document.getElementById('contactName').value.trim()],
      ['Email', document.getElementById('contactEmail').value.trim()],
      ['Topic', document.getElementById('contactTopic').value],
      ['Message', document.getElementById('contactMessage').value.trim()]
    ]);
  });
}

// Remote photography is optional: guarantee artwork even without internet.
function localImageFallback(image) {
  if (!(image instanceof HTMLImageElement) || image.dataset.fallback === 'true') return;
  image.dataset.fallback = 'true';
  image.src = image.closest('.hero-media') ? 'assets/hero-fallback.svg' : 'assets/food-fallback.svg';
}
document.addEventListener('error', event => localImageFallback(event.target), true);
// Images sometimes fail before this deferred script attaches the error handler.
document.querySelectorAll('img').forEach(image => {
  if (image.complete && image.naturalWidth === 0) localImageFallback(image);
});
