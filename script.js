// AS NILORA CONTACT DETAILS
const SHOP_DETAILS = {
  whatsappNumber: "918098827156",
  email: "asnilora26@gmail.com"
};

const products = window.AS_NILORA_PRODUCTS || [];
const categories = [...new Set(products.map(p => p.category))];
const categoryGrid = document.getElementById("categoryGrid");
const productGrid = document.getElementById("productGrid");
const filterRow = document.getElementById("filterRow");
const productHeading = document.getElementById("productHeading");
let activeCategory = "All";
let currentProduct = null;
let currentImage = 0;
let touchStartX = 0;

const categoryCover = {};
products.forEach(p => { if (!categoryCover[p.category]) categoryCover[p.category] = p.images[0]; });

function renderCategories() {
  categoryGrid.innerHTML = categories.map(category => `
    <button class="category-card" data-category="${category}">
      <img src="${categoryCover[category]}" alt="${category}" loading="lazy">
      <span>${category}<small>Explore collection ↗</small></span>
    </button>`).join("");
  categoryGrid.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => selectCategory(button.dataset.category));
  });
}

function renderFilters() {
  const options = ["All", ...categories];
  filterRow.innerHTML = options.map(name => `<button class="filter-chip ${name === activeCategory ? "active" : ""}" data-filter="${name}">${name}</button>`).join("");
  filterRow.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => selectCategory(button.dataset.filter)));
}

function renderProducts() {
  const visible = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  productHeading.textContent = activeCategory === "All" ? "Selected designs" : activeCategory;
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card" tabindex="0" role="button" aria-label="View ${p.name}" data-product="${p.id}">
      <div class="product-photo">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
        ${p.images.length > 1 ? `<span class="photo-count">${p.images.length} PHOTOS</span>` : ""}
      </div>
      <div class="product-meta"><small>${p.category}</small><h3>${p.name}</h3><p>View design & details ↗</p></div>
    </article>`).join("");
  productGrid.querySelectorAll("[data-product]").forEach(card => {
    const open = () => openGallery(card.dataset.product);
    card.addEventListener("click", open);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
}

function selectCategory(category) {
  activeCategory = category;
  renderFilters();
  renderProducts();
  document.getElementById("productHeading").scrollIntoView({behavior:"smooth",block:"center"});
}
function openGallery(id) {
  currentProduct = products.find(p => p.id === id);
  currentImage = 0;
  updateGallery();
  const modal = document.getElementById("galleryModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function updateGallery() {
  if (!currentProduct) return;
  const image = currentProduct.images[currentImage];
  const modalImage = document.getElementById("modalImage");
  modalImage.src = image;
  modalImage.alt = `${currentProduct.name}, photo ${currentImage + 1}`;
  document.getElementById("modalTitle").textContent = currentProduct.name;
  document.getElementById("modalCategory").textContent = currentProduct.category;
  document.getElementById("imageCount").textContent = `${currentImage + 1} / ${currentProduct.images.length}`;
  document.getElementById("prevImage").style.display = currentProduct.images.length > 1 ? "" : "none";
  document.getElementById("nextImage").style.display = currentProduct.images.length > 1 ? "" : "none";
  document.getElementById("galleryDots").innerHTML = currentProduct.images.map((_,i) => `<button class="dot ${i === currentImage ? "active" : ""}" aria-label="Show photo ${i+1}" data-dot="${i}"></button>`).join("");
  document.querySelectorAll("[data-dot]").forEach(dot => dot.addEventListener("click", () => { currentImage = Number(dot.dataset.dot); updateGallery(); }));
}
function moveImage(direction) {
  if (!currentProduct || currentProduct.images.length < 2) return;
  currentImage = (currentImage + direction + currentProduct.images.length) % currentProduct.images.length;
  updateGallery();
}
function closeGallery() {
  document.getElementById("galleryModal").classList.remove("open");
  document.getElementById("galleryModal").setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  currentProduct = null;
}

document.getElementById("prevImage").addEventListener("click", () => moveImage(-1));
document.getElementById("nextImage").addEventListener("click", () => moveImage(1));
document.getElementById("modalClose").addEventListener("click", closeGallery);
document.querySelector(".modal-backdrop").addEventListener("click", closeGallery);
document.addEventListener("keydown", event => {
  if (!document.getElementById("galleryModal").classList.contains("open")) return;
  if (event.key === "ArrowLeft") moveImage(-1);
  if (event.key === "ArrowRight") moveImage(1);
  if (event.key === "Escape") closeGallery();
});
const photoWrap = document.querySelector(".modal-photo-wrap");
photoWrap.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].screenX; }, {passive:true});
photoWrap.addEventListener("touchend", event => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 35) moveImage(delta < 0 ? 1 : -1);
}, {passive:true});

document.getElementById("showAll").addEventListener("click", () => selectCategory("All"));
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("show"));
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => document.getElementById("mainNav").classList.remove("show")));


const contactActions = document.getElementById("contactActions");

const whatsappLink = "https://wa.me/" + SHOP_DETAILS.whatsappNumber.replace(/\D/g, "");

const emailLink = "mailto:" + SHOP_DETAILS.email;

contactActions.innerHTML = `
  <a class="contact-link whatsapp-link"
     href="${whatsappLink}"
     target="_blank"
     rel="noopener noreferrer">
     <span class="whatsapp-icon">☏</span>
     Chat with us
  </a>

  <a class="contact-link email-link"
     href="${emailLink}">
     ✉ Email us
  </a>
`;
renderCategories();
renderFilters();
renderProducts();
document.getElementById("year").textContent = new Date().getFullYear();
