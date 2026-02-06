/* =========================================================
   Boxfox1 Web — main.js
   Funciones globales, seguras y reutilizables
   ========================================================= */

(function () {
  "use strict";

  /* ===============================
     Año automático en footer
     =============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===============================
     Navbar: estilo al hacer scroll
     =============================== */
  const navbar = document.querySelector(".navbar.nav-glass");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =====================================================
     Navbar: estado activo automático (fallback)
     - Si el HTML ya trae .active, no lo toca
     - Si no, lo infiere por URL
     ===================================================== */
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (navLinks.length) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Ignora anchors puros (#)
      if (href.startsWith("#")) return;

      // Coincidencia por archivo
      if (href.includes(currentPath)) {
        link.classList.add("active");
      }
    });
  }

  /* =====================================================
     Contact form (Formspree) — UX básico
     ===================================================== */
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validación nativa
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Enviando...";
      }

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          form.reset();
          form.classList.remove("was-validated");

          if (formMsg) {
            formMsg.className = "form-msg ok";
            formMsg.textContent = "Mensaje enviado correctamente. Te contactaremos pronto.";
          }
        } else {
          throw new Error("Form error");
        }
      } catch (err) {
        if (formMsg) {
          formMsg.className = "form-msg err";
          formMsg.textContent = "Ocurrió un error. Intenta nuevamente o contáctanos por WhatsApp.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalText || "Enviar";
        }
      }
    });
  }

})();
