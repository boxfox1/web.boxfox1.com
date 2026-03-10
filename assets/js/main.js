/* =========================================================
   Boxfox1 Web — main.js (Clean / Stable / Reusable)
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

    updateNavbar();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ===============================
     Navbar: estado activo por archivo actual
     =============================== */
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (navLinks.length) {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const hrefFile = href.split("#")[0] || "index.html";

      if (
        (currentFile === "" || currentFile === "index.html") &&
        (hrefFile === "index.html" || href === "./" || href === "/")
      ) {
        link.classList.add("active");
        return;
      }

      if (hrefFile === currentFile) {
        link.classList.add("active");
      }
    });
  }

  /* ===============================
     Scroll spy para navegación interna
     Compatible con href="#id" e href="index.html#id"
     =============================== */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinksWithHash = Array.from(
    document.querySelectorAll('.navbar .nav-link[href*="#"]'),
  );

  if (
    sections.length > 0 &&
    navLinksWithHash.length > 0 &&
    "IntersectionObserver" in window
  ) {
    const observerOptions = {
      root: null,
      rootMargin: "-90px 0px -55% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinksWithHash.forEach((link) => {
          const href = link.getAttribute("href");
          const hash =
            href && href.includes("#") ? href.substring(href.indexOf("#")) : "";

          if (hash === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ===============================
     Smooth scroll para enlaces internos
     Compatible con href="#id" e href="index.html#id"
     =============================== */
  document
    .querySelectorAll('a[href*="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href) return;

        const hashIndex = href.indexOf("#");
        if (hashIndex === -1) return;

        const hash = href.substring(hashIndex);
        const targetElement = document.querySelector(hash);

        const currentFile =
          window.location.pathname.split("/").pop() || "index.html";
        const hrefFile = href.split("#")[0];

        const samePage =
          href.startsWith("#") ||
          hrefFile === "" ||
          hrefFile === currentFile ||
          (currentFile === "index.html" && hrefFile === "index.html");

        if (targetElement && samePage) {
          e.preventDefault();

          const navbarToggler = document.querySelector(".navbar-toggler");
          const navbarCollapse = document.querySelector(
            ".navbar-collapse.show",
          );

          if (navbarToggler && navbarCollapse) {
            navbarToggler.click();
          }

          const offset = 80;
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY - offset;

          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;

          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? "auto" : "smooth",
          });

          history.replaceState(null, "", hash);
        }
      });
    });

  /* ===============================
     Contact form (Formspree)
     =============================== */
  const form = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  if (form) {
    form.querySelectorAll("input, textarea, select").forEach((field) => {
      field.addEventListener("invalid", (e) => {
        e.preventDefault();
        field.classList.add("is-invalid");
      });

      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) {
          field.classList.remove("is-invalid");
        }
      });

      field.addEventListener("change", () => {
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
          firstInvalid.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstInvalid.focus();
        }

        return;
      }

      if (!form.action) {
        console.error("Form action is missing.");
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando...';
      }

      if (formMsg) {
        formMsg.className = "form-msg";
        formMsg.textContent = "";
      }

      try {
        const response = await fetch(form.action, {
          method: form.method || "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        form.reset();
        form.classList.remove("was-validated");

        if (formMsg) {
          formMsg.className = "form-msg ok";
          formMsg.textContent =
            "✅ Mensaje enviado correctamente. Te contactaremos pronto.";
        }

        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "form_submission", {
            event_category: "contact",
            event_label: "contact_form",
          });
        }
      } catch (error) {
        console.error("Form error:", error);

        if (formMsg) {
          formMsg.className = "form-msg err";
          formMsg.innerHTML =
            '❌ Ocurrió un error. <a href="https://wa.me/5214444989198?text=WEB.Boxfox1%20Error%20en%20formulario" target="_blank" rel="noopener noreferrer">Contáctanos por WhatsApp</a>';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

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
    script.src =
      "https://cdn.jsdelivr.net/npm/loading-attribute-polyfill@2.1.1/dist/loading-attribute-polyfill.min.js";
    document.head.appendChild(script);
  }

  /* ===============================
     Connection detection
     =============================== */
  if ("connection" in navigator) {
    const connection = navigator.connection;

    if (
      connection &&
      (connection.saveData || connection.effectiveType?.includes("2g"))
    ) {
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
     Debug solo en local / staging
     =============================== */
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("staging")
  ) {
    window.addEventListener("load", () => {
      const navEntry = performance.getEntriesByType("navigation")[0];

      if (navEntry) {
        console.log("Page load time:", Math.round(navEntry.loadEventEnd), "ms");
      }
    });
  }
})();
