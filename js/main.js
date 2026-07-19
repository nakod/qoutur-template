/* =========================================================
   QOUTUR — JS commun (navigation + i18n FR/EN)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Internationalisation (FR / EN) ---------- */
  const LANG_KEY = "qoutur_lang";

  function getLang() {
    return window.__qLang || "fr";
  }

  function applyLang(lang) {
    if (lang !== "fr" && lang !== "en") lang = "fr";
    window.__qLang = lang;
    document.documentElement.lang = lang;

    // Textes avec attributs data-fr / data-en
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = el.getAttribute("data-" + lang);
      if (val !== null) el.innerHTML = val;
    });

    // Placeholders : data-ph-fr / data-ph-en
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const val = el.getAttribute("data-ph-" + lang);
      if (val !== null) el.setAttribute("placeholder", val);
    });

    // Lien/bouton de bascule : affiche la LANGUE CIBLE (EN sur une page FR)
    const target = lang === "fr" ? "EN" : "FR";
    document.querySelectorAll(".lang-toggle").forEach((b) => {
      const label = b.querySelector(".lang-label");
      if (label) label.textContent = target; else b.textContent = target;
      b.setAttribute("aria-label", lang === "fr" ? "Switch to English" : "Passer en français");
      b.setAttribute("title", lang === "fr" ? "English" : "Français");
    });

    // (compat) Dropdown de langue éventuel
    document.querySelectorAll(".lang-current").forEach((el) => { el.textContent = lang.toUpperCase(); });
    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}

    // Notifie les composants dynamiques (FAQ, fonctionnalités…)
    document.dispatchEvent(new CustomEvent("qlangchange", { detail: lang }));
  }

  // Exposé pour les scripts de page
  window.qSetLang = applyLang;
  window.qGetLang = getLang;

  function initLang() {
    // Anglais désactivé : le site est forcé en français
    applyLang("fr");
    // Bouton bascule simple (compat)
    document.querySelectorAll(".lang-toggle").forEach((b) => {
      b.addEventListener("click", () => applyLang(getLang() === "fr" ? "en" : "fr"));
    });
    // Options du dropdown de langue
    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.addEventListener("click", () => applyLang(opt.getAttribute("data-lang")));
    });
  }

  /* ---------- Navbar : ombre au scroll ---------- */
  function initNavbar() {
    const navbar = document.querySelector(".q-navbar");
    if (!navbar) return;
    const onScroll = () => {
      navbar.style.boxShadow = window.scrollY > 10 ? "0 4px 20px rgba(13,40,69,0.08)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Défilement fluide des ancres ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            const collapse = document.querySelector(".navbar-collapse.show");
            if (collapse && window.bootstrap) {
              bootstrap.Collapse.getInstance(collapse)?.hide();
            }
          }
        }
      });
    });
  }

  // Init immédiat pour la langue (les scripts de page peuvent aussi appeler qSetLang)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { initLang(); initNavbar(); initSmoothScroll(); });
  } else {
    initLang(); initNavbar(); initSmoothScroll();
  }
})();
