/* =========================================================
   QOUTUR ADMIN — interactions
   ========================================================= */
(function () {
  "use strict";

  // Menus déroulants topbar (notifications, compte)
  document.querySelectorAll(".a-dd-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = btn.parentElement.querySelector(".a-menu");
      document.querySelectorAll(".a-menu.show").forEach((m) => { if (m !== menu) m.classList.remove("show"); });
      menu?.classList.toggle("show");
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".a-menu.show").forEach((m) => m.classList.remove("show"));
  });

  // Sidebar mobile
  const sidebar = document.querySelector(".a-sidebar");
  const backdrop = document.querySelector(".a-backdrop");
  const burger = document.querySelector(".a-burger");
  function closeSidebar() { sidebar?.classList.remove("show"); backdrop?.classList.remove("show"); }
  burger?.addEventListener("click", () => {
    sidebar?.classList.toggle("show");
    backdrop?.classList.toggle("show");
  });
  backdrop?.addEventListener("click", closeSidebar);

  // Filtres de liste (onglets) : filtre les lignes par data-status
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSel = group.getAttribute("data-target");
    const rows = () => document.querySelectorAll(targetSel + " [data-status]");
    group.querySelectorAll(".a-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".a-filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const val = btn.getAttribute("data-value");
        let shown = 0;
        rows().forEach((r) => {
          const ok = val === "all" || r.getAttribute("data-status") === val;
          r.style.display = ok ? "" : "none";
          if (ok) shown++;
        });
        const empty = document.querySelector(targetSel + " .a-empty");
        if (empty) empty.style.display = shown === 0 ? "" : "none";
      });
    });
  });

  // Recherche simple dans un tableau
  document.querySelectorAll("[data-search-target]").forEach((input) => {
    const sel = input.getAttribute("data-search-target");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      document.querySelectorAll(sel + " tbody tr").forEach((tr) => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  });

  // Formulaire Profil : message de succès en ligne
  const profilForm = document.getElementById("profilForm");
  if (profilForm) {
    profilForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const a = document.getElementById("profilAlert");
      if (a) a.style.display = "flex";
    });
  }
  // Formulaire Sécurité (paramètres)
  const secForm = document.getElementById("secForm");
  if (secForm) {
    secForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Paramètres de sécurité mis à jour.");
    });
  }

  // Formulaire Notifications : ajoute la notif en tête de liste + succès
  const notifForm = document.getElementById("notifForm");
  if (notifForm) {
    notifForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titre = (document.getElementById("nTitre").value || "").trim();
      const cible = document.getElementById("nCible").value;
      const canaux = ["cInapp:In-app", "cEmail:E-mail", "cSms:SMS"]
        .filter((c) => document.getElementById(c.split(":")[0]).checked)
        .map((c) => c.split(":")[1]).join(" · ") || "In-app";
      if (!titre) return;
      const tbody = document.querySelector("#notifTable tbody");
      if (tbody) {
        const tr = document.createElement("tr");
        const today = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
        tr.innerHTML = `<td><strong>${titre.replace(/</g,"&lt;")}</strong></td><td>${cible}</td><td>${canaux}</td><td>${today}</td><td><span class="badge-s s-green">Envoyée</span></td>`;
        tbody.prepend(tr);
      }
      const a = document.getElementById("notifAlert");
      if (a) a.style.display = "flex";
      notifForm.reset();
    });
  }

  // Actions de démonstration (valider / suspendre / retrait…)
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const label = btn.getAttribute("data-action");
      const row = btn.closest("tr, .a-card, .a-thread");
      if (label === "valider" && row) {
        const badge = row.querySelector(".badge-s");
        if (badge) { badge.className = "badge-s s-green"; badge.textContent = "Actif"; }
        row.setAttribute("data-status", "actif");
        btn.remove();
      } else if (label === "suspendre" && row) {
        const badge = row.querySelector(".badge-s");
        if (badge) { badge.className = "badge-s s-red"; badge.textContent = "Suspendu"; }
        row.setAttribute("data-status", "suspendu");
      } else {
        alert("Action de démonstration : « " + label + " ».");
      }
    });
  });
})();
