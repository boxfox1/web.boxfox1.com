// /assets/js/main.js

// Año automático en footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar: estilo cuando hay scroll
const navbar = document.querySelector(".navbar");
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
