// Mobile nav toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Split-flap style reveal for the hero hours badge (only if motion is allowed)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const flapTime = document.getElementById('flapTime');
if (flapTime && !prefersReducedMotion) {
  const finalText = flapTime.textContent;
  const chars = '0123456789H— :'.split('');
  let frame = 0;
  const totalFrames = 14;
  const interval = setInterval(() => {
    frame++;
    if (frame >= totalFrames) {
      flapTime.textContent = finalText;
      clearInterval(interval);
      return;
    }
    flapTime.textContent = finalText
      .split('')
      .map((ch, i) => {
        if (ch === ' ' || ch === '—') return ch;
        if (i < (frame / totalFrames) * finalText.length) return ch;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
  }, 45);
}

// Scroll reveal for menu board rows + generic .reveal elements
const rows = document.querySelectorAll('.board-row, .reveal');
if ('IntersectionObserver' in window && rows.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), index * 50);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  rows.forEach(row => observer.observe(row));
} else {
  rows.forEach(row => row.classList.add('is-visible'));
}

// Parallax on hero background layers
const parallaxLayers = document.querySelectorAll('.hero-bg');
if (parallaxLayers.length && !prefersReducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxLayers.forEach(layer => {
          layer.style.transform = `translateY(${y * 0.18}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Floating call button — appears after scrolling past the hero
const fabCall = document.getElementById('fabCall');
if (fabCall) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) fabCall.classList.add('is-visible');
    else fabCall.classList.remove('is-visible');
  });
}

// Lightbox for gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.g-item img');
if (lightbox && lightboxImg && galleryItems.length) {
  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src.replace('w=900', 'w=1600');
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
    });
  });
  const closeLightbox = () => lightbox.classList.remove('is-open');
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Accordion for the menu categories
const accItems = document.querySelectorAll('.acc-item');
if (accItems.length) {
  accItems.forEach(item => {
    const head = item.querySelector('.acc-head');
    const panel = item.querySelector('.acc-panel');
    head.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(isOpen));
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';
    });
  });
  // Open the first category by default
  const firstItem = accItems[0];
  firstItem.classList.add('is-open');
  const firstHead = firstItem.querySelector('.acc-head');
  const firstPanel = firstItem.querySelector('.acc-panel');
  firstHead.setAttribute('aria-expanded', 'true');
  firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';

  // Recalculate open panel heights on resize (text reflow)
  window.addEventListener('resize', () => {
    document.querySelectorAll('.acc-item.is-open .acc-panel').forEach(panel => {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
}

// Custom flag dropdown (used by the entry gate)
function initCustomSelect(root) {
  const btn = root.querySelector('.cselect-btn');
  const list = root.querySelector('.cselect-list');
  const hiddenInput = root.querySelector('input[type="hidden"]');
  const label = btn.querySelector('.cselect-btn-label');
  const options = Array.from(list.querySelectorAll('li'));

  function close() {
    root.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function open() {
    root.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  btn.addEventListener('click', () => {
    root.classList.contains('is-open') ? close() : open();
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const value = opt.dataset.value;
      const imgSrc = opt.querySelector('img').src;
      hiddenInput.value = value;
      label.innerHTML = `<img src="${imgSrc}" alt="" width="20" height="15"><span>${value}</span>`;
      btn.classList.add('has-value');
      btn.classList.remove('has-error');
      options.forEach(o => o.classList.remove('is-active'));
      opt.classList.add('is-active');
      close();
      hiddenInput.dispatchEvent(new Event('change'));
    });
  });

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
document.querySelectorAll('.cselect').forEach(initCustomSelect);

// Entry gate — first-visit registration before the site unlocks
const entryGate = document.getElementById('entryGate');
if (entryGate) {
  /* ============================================================
     CONFIGURATION — à renseigner par le propriétaire du site
     ============================================================
     1. Créez un Google Form avec les champs : Pays de résidence,
        Prénom, Nom, Téléphone/E-mail.
     2. Ouvrez le formulaire en mode "aperçu", clic droit sur
        chaque champ > Inspecter, repérez name="entry.XXXXXXXXX".
     3. Reportez ces identifiants dans les attributs "name" des
        champs de la porte d'entrée dans index.html (déjà
        présents, à remplacer : entry.111111111 etc.).
     4. Remplacez FORM_ACTION_URL ci-dessous, en changeant
        "viewform" par "formResponse" à la fin du lien du formulaire.
     ============================================================ */
  const FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

  const gateForm = document.getElementById('gateForm');
  const gateFeedback = document.getElementById('gateFeedback');
  const gateCountryValue = document.getElementById('gateCountryValue');
  const gateCountryBtn = document.getElementById('gateCountryBtn');
  const gateSkip = document.getElementById('gateSkip');

  function unlockSite() {
    localStorage.setItem('ezzahra_gate_done', '1');
    entryGate.style.opacity = '0';
    entryGate.style.transition = 'opacity 0.35s ease';
    document.body.classList.remove('gate-active');
    setTimeout(() => { entryGate.style.display = 'none'; }, 350);
  }

  gateSkip.addEventListener('click', unlockSite);

  gateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    gateFeedback.className = 'form-feedback';
    gateFeedback.textContent = '';

    if (!gateCountryValue.value) {
      gateCountryBtn.classList.add('has-error');
      gateFeedback.textContent = 'Merci de sélectionner votre pays pour continuer.';
      gateFeedback.classList.add('is-error');
      return;
    }

    if (FORM_ACTION_URL.indexOf('YOUR_FORM_ID') !== -1) {
      // Not configured yet: don't block the visitor, just let them in.
      unlockSite();
      return;
    }

    try {
      const data = new FormData(gateForm);
      await fetch(FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body: data });
    } catch (err) {
      // Network issue: still let the visitor in rather than trapping them.
    }
    unlockSite();
  });
}
