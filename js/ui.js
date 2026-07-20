/* =========================================================
   QOUTUR — Comportements UI (remplacement de bootstrap.bundle.js)

   Chargé uniquement par les pages migrées vers Tailwind.
   Couvre les 3 comportements JS que Bootstrap fournissait :
     - navbar : menu mobile
     - accordéon : un seul panneau ouvert à la fois
     - modale : ouverture/fermeture, fond, Échap, focus
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Navbar (menu mobile) ---------- */
  function initNavToggle() {
    document.querySelectorAll("[data-nav-toggle]").forEach(function (btn) {
      var target = document.getElementById(btn.getAttribute("data-nav-toggle"));
      if (!target) return;
      btn.addEventListener("click", function () {
        var open = target.classList.toggle("hidden") === false;
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* ---------- Accordéon ---------- */
  // Équivaut au comportement data-bs-parent : un seul panneau ouvert.
  // Le contenu pouvant être re-rendu (changement de langue), l'écouteur
  // est délégué et branché une seule fois par conteneur.
  function initAccordion(root) {
    if (!root || root.dataset.accordionReady) return;
    root.dataset.accordionReady = "1";
    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".accordion-button");
      if (!btn || !root.contains(btn)) return;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var isOpen = !btn.classList.contains("collapsed");

      root.querySelectorAll(".accordion-button").forEach(function (b) {
        b.classList.add("collapsed");
        b.setAttribute("aria-expanded", "false");
      });
      root.querySelectorAll(".accordion-collapse").forEach(function (p) {
        p.hidden = true;
      });

      if (!isOpen && panel) {
        btn.classList.remove("collapsed");
        btn.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  }

  /* ---------- Modale ---------- */
  var openModal = null;
  var lastFocus = null;

  function showModal(el) {
    if (!el) return;
    if (openModal && openModal !== el) hideModal(openModal);
    lastFocus = document.activeElement;
    el.hidden = false;
    el.classList.add("is-open");
    document.body.classList.add("modal-open");
    openModal = el;
    var focusable = el.querySelector(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    if (focusable) focusable.focus();
  }

  function hideModal(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.hidden = true;
    if (openModal === el) openModal = null;
    if (!openModal) document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
      lastFocus = null;
    }
  }

  function initModals() {
    // Ouverture : <button data-modal-open="idDeLaModale">
    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-modal-open]");
      if (opener) {
        e.preventDefault();
        showModal(document.getElementById(opener.getAttribute("data-modal-open")));
        return;
      }
      // Fermeture : [data-modal-close] ou clic sur le fond
      var closer = e.target.closest("[data-modal-close]");
      if (closer) {
        e.preventDefault();
        hideModal(closer.closest(".modal"));
        return;
      }
      if (openModal && e.target === openModal) hideModal(openModal);
    });

    // Échap
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openModal) hideModal(openModal);
    });
  }

  /* ---------- API publique ---------- */
  window.qUI = {
    showModal: showModal,
    hideModal: hideModal,
    initAccordion: initAccordion,
  };

  function init() {
    initNavToggle();
    initModals();
    document.querySelectorAll("[data-accordion]").forEach(initAccordion);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
