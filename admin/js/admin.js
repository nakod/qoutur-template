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

  // Modales (popups) : ouverture / fermeture
  function closeModal(m) { m && m.classList.remove("show"); }
  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const m = document.querySelector(btn.getAttribute("data-modal-open"));
      if (m) m.classList.add("show");
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(btn.closest(".a-modal")));
  });
  document.querySelectorAll(".a-modal").forEach((m) => {
    m.addEventListener("click", (e) => { if (e.target === m) closeModal(m); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.querySelectorAll(".a-modal.show").forEach(closeModal);
  });
  const fdate = () => new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  const esc = (s) => (s || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Créer une notification (popup) : ajoute en tête de liste
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
        tr.innerHTML = `<td><strong>${esc(titre)}</strong></td><td>${cible}</td><td>${canaux}</td><td>${fdate()}</td><td><span class="badge-s s-green">Envoyée</span></td>`;
        tbody.prepend(tr);
      }
      notifForm.reset();
      closeModal(notifForm.closest(".a-modal"));
      const a = document.getElementById("notifAlert");
      if (a) { a.style.display = "flex"; setTimeout(() => { a.style.display = "none"; }, 4000); }
    });
  }

  // Créer un membre du personnel (popup)
  const staffForm = document.getElementById("staffForm");
  if (staffForm) {
    staffForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = (document.getElementById("sNom").value || "").trim();
      const email = (document.getElementById("sEmail").value || "").trim();
      const tel = (document.getElementById("sTel").value || "").trim();
      const role = document.getElementById("sRole").value;
      if (!nom || !email) return;
      const ini = nom.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
      const tbody = document.querySelector("#staffTable tbody");
      if (tbody) {
        const tr = document.createElement("tr");
        tr.setAttribute("data-status", "actif");
        tr.innerHTML = `<td><div class="a-name"><span class="a-avatar">${esc(ini)}</span><span><strong>${esc(nom)}</strong></span></div></td><td>${esc(role)}</td><td>${esc(email)}</td><td>${esc(tel)}</td><td><span class="badge-s s-green">Actif</span></td><td class="text-end"><button class="a-btn a-btn-red a-btn-sm" data-action="suspendre">Suspendre</button></td>`;
        tbody.prepend(tr);
      }
      staffForm.reset();
      closeModal(staffForm.closest(".a-modal"));
      const a = document.getElementById("staffAlert");
      if (a) { a.style.display = "flex"; setTimeout(() => { a.style.display = "none"; }, 4000); }
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
