"use strict";

/* URBAN BITES — EDITABLE SAMPLE MENU
 * Edit or replace these items to customize the restaurant.
 * Images live in assets/food/. This is a showcase, not an ordering system.
 */
const MENU_ITEMS = [
  {id:1, name:"Crispy Paneer Burger", category:"burgers", price:229, veg:true, badge:"Popular", image:"burger.svg", tint:"#f9ead8", description:"Golden crumbed paneer, crunchy slaw and a tangy house sauce on a soft toasted bun.", details:"Paneer, lettuce, cabbage, tomato, bun and house dressing."},
  {id:2, name:"Smoky Chicken Burger", category:"burgers", price:259, veg:false, badge:"", image:"burger.svg", tint:"#f4e0d2", description:"Grilled chicken, pickles and smoky sauce tucked into a pillowy bun.", details:"Chicken, lettuce, pickles, onion, bun and smoky dressing."},
  {id:3, name:"Grilled Veggie Club", category:"burgers", price:199, veg:true, badge:"", image:"sandwich.svg", tint:"#e5edda", description:"Toasty bread packed with grilled vegetables, cheese and bright herby mayo.", details:"Bread, seasonal vegetables, cheese and herbed mayonnaise."},
  {id:4, name:"Classic Margherita", category:"pizza", price:299, veg:true, badge:"Classic", image:"pizza.svg", tint:"#fae4d3", description:"Tomato, bubbly mozzarella and basil. A classic for a reason.", details:"Pizza dough, tomato sauce, mozzarella and basil."},
  {id:5, name:"Tandoori Paneer Pizza", category:"pizza", price:359, veg:true, badge:"Popular", image:"pizza.svg", tint:"#f8ecd0", description:"A little spice, lots of cheese, and generous tandoori paneer on top.", details:"Paneer, peppers, onions, cheese, tandoori sauce and pizza crust."},
  {id:6, name:"Barbecue Chicken Pizza", category:"pizza", price:389, veg:false, badge:"", image:"pizza.svg", tint:"#f4dccb", description:"Smoky chicken, sweet onions, mozzarella and a barbecue swirl.", details:"Chicken, onion, mozzarella, barbecue sauce and pizza crust."},
  {id:7, name:"Herb & Rice Bowl", category:"bowls", price:269, veg:true, badge:"Fresh pick", image:"bowl.svg", tint:"#e4eddb", description:"Warm rice, roasted vegetables, creamy dressing and something crunchy.", details:"Rice, roasted vegetables, chickpeas, herbs and house dressing."},
  {id:8, name:"Chickpea Crunch Bowl", category:"bowls", price:249, veg:true, badge:"", image:"bowl.svg", tint:"#e6efdc", description:"A colourful bowl with spiced chickpeas, greens and lemony dressing.", details:"Chickpeas, greens, tomato, cucumber and citrus dressing."},
  {id:9, name:"Teriyaki Chicken Bowl", category:"bowls", price:319, veg:false, badge:"", image:"bowl.svg", tint:"#e3ead7", description:"Tender glazed chicken with rice, sesame and crisp vegetables.", details:"Chicken, rice, vegetables, sesame and teriyaki glaze."},
  {id:10, name:"Garlic Cheese Bread", category:"sides", price:129, veg:true, badge:"", image:"bread.svg", tint:"#f8ead7", description:"Warm garlic bread, a generous layer of cheese and a little parsley.", details:"Bread, garlic butter, cheese and herbs."},
  {id:11, name:"Peri-Peri Fries", category:"sides", price:149, veg:true, badge:"Popular", image:"fries.svg", tint:"#f9e2ce", description:"Golden, crispy fries tossed in a punchy peri-peri seasoning.", details:"Potatoes, seasoning and dipping sauce."},
  {id:12, name:"Loaded Cheesy Nachos", category:"sides", price:189, veg:true, badge:"", image:"nachos.svg", tint:"#f8e8cd", description:"Crunchy nachos with warm cheese, salsa and spring onions.", details:"Corn chips, cheese sauce, tomato salsa and herbs."},
  {id:13, name:"Iced House Coffee", category:"drinks", price:159, veg:true, badge:"", image:"drink.svg", tint:"#e9e5d9", description:"Smooth coffee over ice, with milk and a mellow finish.", details:"Coffee, milk and ice."},
  {id:14, name:"Mint Lime Cooler", category:"drinks", price:119, veg:true, badge:"Refreshing", image:"lemonade.svg", tint:"#e3eedd", description:"Lime, fresh mint and lots of ice. A little glass of sunshine.", details:"Lime, mint, sparkling water and ice."},
  {id:15, name:"Fudgy Chocolate Brownie", category:"dessert", price:169, veg:true, badge:"", image:"dessert.svg", tint:"#eee1d6", description:"A rich chocolate brownie with a soft centre and a scoop of ice cream.", details:"Cocoa, flour, dairy, chocolate and ice cream (illustrative recipe)."},
  {id:16, name:"Berry Cheesecake Cup", category:"dessert", price:189, veg:true, badge:"", image:"dessert.svg", tint:"#f2e0df", description:"Creamy cheesecake in a cup, finished with bright berry compote.", details:"Cream cheese, biscuit crumb and berry topping."}
];

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const rupees = amount => new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(amount);

$("#year").textContent = new Date().getFullYear();

// Mobile navigation
const menuButton = $("#menuToggle");
const navLinks = $("#navLinks");
function closeNav(){navLinks.classList.remove("open");menuButton.setAttribute("aria-expanded", "false");menuButton.setAttribute("aria-label", "Open menu");}
menuButton.addEventListener("click",()=>{const expanded=navLinks.classList.toggle("open");menuButton.setAttribute("aria-expanded", String(expanded));menuButton.setAttribute("aria-label", expanded?"Close menu":"Open menu");});
$$("a", navLinks).forEach(a=>a.addEventListener("click",closeNav));
window.addEventListener("resize",()=>{if(innerWidth>760)closeNav();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeNav();});

// Menu searching + category filtering
let activeCategory = "all";
const search = $("#menuSearch"), vegOnly = $("#vegOnly"), grid = $("#menuGrid"), count = $("#resultCount"), empty = $("#emptyState"), clearSearch = $("#clearSearch");

function cardFor(item){
  const card = document.createElement("article");
  card.className="dish-card";
  const fig=document.createElement("div");fig.className="dish-visual";fig.style.background=item.tint;
  const img=document.createElement("img");img.src=`assets/food/${item.image}`;img.alt="";img.width=270;img.height=220;img.loading="eager";
  fig.appendChild(img);
  if(item.badge){const badge=document.createElement("span");badge.className="food-badge";badge.textContent=item.badge;fig.appendChild(badge);}
  const content=document.createElement("div");content.className="dish-body";
  const meta=document.createElement("div");meta.className="dish-meta";
  const veg=document.createElement("span");veg.className=`diet-tag ${item.veg?"vegetarian":"nonveg"}`;veg.textContent=item.veg?"Vegetarian":"Non-veg";meta.appendChild(veg);
  const price=document.createElement("span");price.className="dish-price";price.textContent=rupees(item.price);meta.appendChild(price);
  const title=document.createElement("h3");title.textContent=item.name;
  const desc=document.createElement("p");desc.textContent=item.description;
  const button=document.createElement("button");button.type="button";button.className="dish-more";button.textContent="View details  ↗";button.dataset.id=String(item.id);button.setAttribute("aria-label",`View details for ${item.name}`);
  content.append(meta,title,desc,button);card.append(fig,content);return card;
}
function renderMenu(){
  const q=search.value.toLocaleLowerCase().trim();
  const visible=MENU_ITEMS.filter(item=>{
    const matchesCategory = activeCategory==="all" || item.category===activeCategory;
    const matchesDiet = !vegOnly.checked || item.veg;
    const matchesSearch = `${item.name} ${item.description} ${item.details} ${item.category}`.toLocaleLowerCase().includes(q);
    return matchesCategory && matchesDiet && matchesSearch;
  });
  grid.replaceChildren(...visible.map(cardFor));
  empty.hidden=visible.length>0;
  count.textContent=`Showing ${visible.length} of ${MENU_ITEMS.length} dishes`;
  clearSearch.hidden=search.value.length===0;
}
$$(".chip",$("#categoryFilters")).forEach(button=>button.addEventListener("click",()=>{
  activeCategory=button.dataset.category;
  $$(".chip",$("#categoryFilters")).forEach(chip=>{const on=chip===button;chip.classList.toggle("active",on);chip.setAttribute("aria-pressed",String(on));});
  renderMenu();
}));
search.addEventListener("input",renderMenu);
vegOnly.addEventListener("change",renderMenu);
clearSearch.addEventListener("click",()=>{search.value="";renderMenu();search.focus();});
function resetFilters(){search.value="";vegOnly.checked=false;activeCategory="all";$$(".chip",$("#categoryFilters")).forEach(chip=>{const on=chip.dataset.category==="all";chip.classList.toggle("active",on);chip.setAttribute("aria-pressed",String(on));});renderMenu();}
$("#resetFilters").addEventListener("click",resetFilters);
renderMenu();

// Dish information dialog (no ordering or payment)
const dialog = $("#dishDialog");let previousTrigger=null;
grid.addEventListener("click",event=>{
  const trigger=event.target.closest("button[data-id]");if(!trigger)return;
  const item=MENU_ITEMS.find(entry=>entry.id===Number(trigger.dataset.id));if(!item)return;
  previousTrigger=trigger;
  $("#dishTitle").textContent=item.name;
  $("#dishPrice").textContent=rupees(item.price);
  $("#dishDescription").textContent=item.description;
  $("#dishImage").src=`assets/food/${item.image}`;
  $("#dishTags").replaceChildren();
  [item.veg?"Vegetarian":"Non-vegetarian",item.details].forEach(text=>{const tag=document.createElement("span");tag.textContent=text;$("#dishTags").appendChild(tag);});
  dialog.showModal();$("#closeDialog").focus();
});
function closeDialog(){dialog.close();}
$("#closeDialog").addEventListener("click",closeDialog);
$("#dialogBack").addEventListener("click",closeDialog);
dialog.addEventListener("click",event=>{if(event.target===dialog)closeDialog();});
dialog.addEventListener("close",()=>{if(previousTrigger && previousTrigger.isConnected)previousTrigger.focus();});

// Contact demo: prepare email, don't claim it sent.
$("#contactForm").addEventListener("submit",event=>{
  event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
  const name=$("#contactName").value.trim(), email=$("#contactEmail").value.trim(), message=$("#contactMessage").value.trim();
  if(name.length<2 || message.length<5){$("#formNote").textContent="Please enter your name and a message before preparing your email.";return;}
  const subject=encodeURIComponent("Urban Bites concept — website enquiry");
  const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Urban Bites portfolio concept.`);
  window.location.href=`mailto:krish73a@gmail.com?subject=${subject}&body=${body}`;
  $("#formNote").textContent="Your email app should open now. Review and send the message from there.";
});
