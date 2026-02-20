/* =========================================================
   Boxfox1 Web — main.js (Optimized + Fixed)
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
     Navbar: estilo al hacer scroll (OPTIMIZADO)
     =============================== */
  const navbar = document.querySelector(".navbar.nav-glass");
  if (navbar) {
    let ticking = false;
    
    const updateNavbar = () => {
      const shouldScrolled = window.scrollY > 12;
      
      if (navbar.classList.contains("navbar-scrolled") !== shouldScrolled) {
        navbar.classList.toggle("navbar-scrolled", shouldScrolled);
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };
    
    updateNavbar(); // Initial check
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ===============================
     Navbar: estado activo automático
     =============================== */
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (navLinks.length) {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";
    const currentPage = currentFile.replace(".html", "");

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href || link.classList.contains("active")) return;

      // Handle index.html
      if ((currentFile === "" || currentFile === "index.html") && 
          (href === "index.html" || href === "./" || href === "/" || href === "")) {
        link.classList.add("active");
        return;
      }

      // Exact file match
      if (href === currentFile || href === currentFile + "#" + currentPage) {
        link.classList.add("active");
        return;
      }

      // Partial match for service pages
      if (href.includes(currentPage) && currentPage !== "index") {
        link.classList.add("active");
      }
    });
  }

  /* ===============================
     Scroll spy para navegación
     =============================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinksArray = Array.from(document.querySelectorAll(".navbar .nav-link[href^='#']"));
  
  if (sections.length > 0 && navLinksArray.length > 0 && window.IntersectionObserver) {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -80px 0px",
      threshold: 0
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          
          navLinksArray.forEach(link => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else if (href.startsWith("#")) {
              link.classList.remove("active");
            }
          });
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }

  /* ===============================
     Smooth scroll para enlaces internos
     =============================== */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse.show");
        
        if (navbarToggler && navbarCollapse) {
          navbarToggler.click();
        }
        
        // Smooth scroll
        const offset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
        
        // Update URL
        history.pushState(null, null, href);
      }
    });
  });

  /* ===============================
     Contact form (Formspree)
     =============================== */
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    // Add validation classes
    form.querySelectorAll("input, textarea, select").forEach(field => {
      field.addEventListener("invalid", (e) => {
        e.preventDefault();
        field.classList.add("is-invalid");
      });
      
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) {
          field.classList.remove("is-invalid");
        }
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
      }

      if (formMsg) {
        formMsg.className = "form-msg";
        formMsg.textContent = "";
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
            formMsg.textContent = "✅ Mensaje enviado correctamente. Te contactaremos pronto.";
          }
          
          // Track conversion
          if (typeof gtag !== "undefined") {
            gtag("event", "form_submission", {
              "event_category": "contact",
              "event_label": "contact_form"
            });
          }
        } else {
          throw new Error("Form error");
        }
      } catch (err) {
        console.error("Form error:", err);
        
        if (formMsg) {
          formMsg.className = "form-msg err";
          formMsg.innerHTML = '❌ Ocurrió un error. <a href="https://wa.me/5214444989198?text=WEB.Boxfox1%20Error%20en%20formulario" target="_blank">Contáctanos por WhatsApp</a>';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        
        // Auto-hide success message
        if (formMsg && formMsg.classList.contains("ok")) {
          setTimeout(() => {
            formMsg.style.opacity = "0";
            setTimeout(() => {
              formMsg.className = "form-msg";
              formMsg.textContent = "";
              formMsg.style.opacity = "1";
            }, 300);
          }, 8000);
        }
      }
    });
  }

  /* ===============================
     Lazy loading polyfill
     =============================== */
  if (!("loading" in HTMLImageElement.prototype)) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/loading-attribute-polyfill@2.1.1/dist/loading-attribute-polyfill.min.js";
    document.head.appendChild(script);
  }

  /* ===============================
     Connection detection
     =============================== */
  if ("connection" in navigator) {
    const connection = navigator.connection;
    
    if (connection && (connection.saveData || connection.effectiveType?.includes("2g"))) {
      document.body.classList.add("reduce-motion");
      
      const style = document.createElement("style");
      style.textContent = `
        .reduce-motion * {
          animation-duration: 0.001s !important;
          transition-duration: 0.001s !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ===============================
     Debug info (development only)
     =============================== */
  if (window.location.hostname === "localhost" || window.location.hostname.includes("staging")) {
    window.addEventListener("load", () => {
      if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log('Scroll enabled:', document.body.style.overscrollBehaviorY);
document.body.style.overscrollBehaviorY = ''; // Fuerza reset
      }
    });
  }

})();