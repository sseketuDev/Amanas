 /* ════════════════════════════════════════════════
   AMANAS · Salon de Belleza · main.js
   ════════════════════════════════════════════════ */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── NAV: shadow on scroll ── */
  const mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
 
  /* ── NAV: hamburger menu ── */
  window.toggleMenu = function () {
    document.getElementById('navLinks').classList.toggle('open');
  };
 
  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));
 
  /* ── SERVICE FILTER TABS ── */
  window.filterServices = function (cat, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.service-card').forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };
 
  /* ════════════════════════════════════════════════
     MODAL — SELECCIÓN DE ESTILISTA
     ════════════════════════════════════════════════
 
     Configuración: edita STYLISTS para personalizar
     los nombres, roles, fotos y links de cada estilista.
     La imagen debe ir en la carpeta images/ del sitio.
  ─────────────────────────────────────────────── */
 
  const STYLISTS = [
    {
      id: 'stylist1',
      name: 'Nombre Estilista 1',        // ← Cambia el nombre
      role: 'Estilista · Colorista',       // ← Cambia el rol
      photo: 'images/estilista-1.jpg',     // ← Ruta a la foto (o '' para mostrar inicial)
      initial: 'A',                        // ← Inicial de respaldo si no hay foto
      setmoreUrl: 'https://setmore.com/ESTILISTA_1',  // ← Link Setmore real
    },
    {
      id: 'stylist2',
      name: 'Nombre Estilista 2',
      role: 'Estilista · Colorista',
      photo: 'images/estilista-2.jpg',
      initial: 'B',
      setmoreUrl: 'https://setmore.com/ESTILISTA_2',
    },
  ];
 
  const modal        = document.getElementById('stylistModal');
  const modalLabel   = document.getElementById('modalServiceLabel');
  const modalTitle   = document.getElementById('modalTitle');
  const modalBody    = document.getElementById('modalBody');
 
  /* Build stylist buttons dynamically from STYLISTS config */
  function buildModalContent() {
    modalBody.innerHTML = '';
    STYLISTS.forEach((s, i) => {
      if (i > 0) {
        const div = document.createElement('div');
        div.className = 'modal-divider';
        div.textContent = 'o';
        modalBody.appendChild(div);
      }
 
      const a = document.createElement('a');
      a.href = s.setmoreUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'modal-stylist-btn';
      a.addEventListener('click', closeModal);
 
      // Photo or avatar fallback
      let avatarHTML;
      if (s.photo) {
        avatarHTML = `<img
          src="${s.photo}"
          alt="${s.name}"
          class="modal-stylist-photo"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        >
        <div class="modal-stylist-avatar" style="display:none;">${s.initial}</div>`;
      } else {
        avatarHTML = `<div class="modal-stylist-avatar">${s.initial}</div>`;
      }
 
      a.innerHTML = `
        ${avatarHTML}
        <div class="modal-stylist-info">
          <span class="modal-stylist-name">${s.name}</span>
          <span class="modal-stylist-role">${s.role}</span>
        </div>
        <span class="modal-stylist-arrow">→</span>
      `;
      modalBody.appendChild(a);
    });
  }
 
  buildModalContent();
 
  /* Open modal — called from each service card's "Reservar" button */
  window.openModal = function (btn) {
    const card = btn.closest('.service-card') || btn.closest('.corte-card');
    const serviceName = card?.querySelector('.service-name, .corte-name')?.textContent || 'este servicio';
    modalLabel.textContent = serviceName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.querySelector('.modal-close')?.focus(), 80);
  };
 
  /* Close modal */
  window.closeModal = function () {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
 
  /* Click outside modal box */
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
 
  /* Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
 
});