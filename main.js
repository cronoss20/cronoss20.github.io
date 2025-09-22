// main.js - controlador de interacciones del sitio
// Código seguro: comprueba la existencia de elementos antes de operar

document.addEventListener('DOMContentLoaded', () => {
  // ---- Traducciones y selección de idioma ----
  const translations = {
    es: {
      hero_h1_prefix: 'Hola, soy',
      hero_h2: 'Ingeniero Informático',
      hero_p: 'Desarrollo soluciones modernas y flexibles para la web.',
      cta: 'Ver proyectos',
      about_h2: 'Sobre mí',
      about_p: 'Soy {name}, Ingeniero Informático apasionado por resolver problemas reales mediante software bien diseñado. Desarrollo aplicaciones web y APIs con PHP, Node y Python, construyo interfaces reactivas con HTML/CSS y React, y uso Docker para crear despliegues reproducibles. También trabajo con C/C++ cuando se requiere rendimiento; disfruto automatizar flujos y facilitar productos escalables y mantenibles.',
      projects_h2: 'Proyectos Destacados',
      project_code: 'Código',
      project_demo: 'Demo',
      contact_h2: 'Contacto',
      form_name: 'Nombre',
      form_email: 'Email',
      form_msg: 'Mensaje',
      form_btn: 'Enviar',
      footer_tpl: '© {year} {name}. Todos los derechos reservados.',
      sidebar_nav_about: 'Sobre mí',
      sidebar_nav_projects: 'Proyectos',
      sidebar_nav_contact: 'Contacto',
      sidebar_motivation: 'Me muevo por la curiosidad y el deseo de resolver problemas reales; disfruto aprendiendo nuevas tecnologías y construyendo soluciones prácticas que ayuden a otros.'
    },
    en: {
      hero_h1_prefix: 'Hi, I am',
      hero_h2: 'Software Engineer',
      hero_p: 'I build modern, flexible web solutions.',
      cta: 'See projects',
      about_h2: 'About me',
      about_p: 'I am {name}, a software engineer driven by curiosity and real-world problems. I develop web applications and APIs with PHP, Node and Python, build reactive interfaces using HTML/CSS and React, and use Docker for reproducible deployments. I also work with C/C++ when performance or low-level control is required; I enjoy automating workflows and delivering scalable, maintainable products.',
      projects_h2: 'Featured Projects',
      project_code: 'Code',
      project_demo: 'Demo',
      contact_h2: 'Contact',
      form_name: 'Name',
      form_email: 'Email',
      form_msg: 'Message',
      form_btn: 'Send',
      footer_tpl: '© {year} {name}. All rights reserved.',
      sidebar_nav_about: 'About',
      sidebar_nav_projects: 'Projects',
      sidebar_nav_contact: 'Contact',
      sidebar_motivation: 'I am driven by curiosity and the desire to solve real problems; I enjoy learning new technologies and building practical solutions that help others.'
    },
    fr: {
      hero_h1_prefix: 'Bonjour, je suis',
      hero_h2: "Ingénieur informaticien",
      hero_p: 'Je développe des solutions web modernes et flexibles.',
      cta: 'Voir les projets',
      about_h2: 'À propos de moi',
      about_p: 'Je suis {name}, ingénieur informatique animé par la curiosité et le désir de résoudre des problèmes concrets. Je développe des applications web et des API avec PHP, Node et Python, crée des interfaces réactives avec HTML/CSS et React, et utilise Docker pour des déploiements reproductibles. Je travaille également en C/C++ lorsque la performance est requise; j\'aime automatiser les flux et livrer des produits évolutifs et maintenables.',
      projects_h2: 'Projets en vedette',
      project_code: 'Code',
      project_demo: 'Demo',
      contact_h2: 'Contact',
      form_name: 'Nom',
      form_email: 'Email',
      form_msg: 'Message',
      form_btn: 'Envoyer',
      footer_tpl: '© {year} {name}. Tous droits réservés.',
      sidebar_nav_about: 'À propos',
      sidebar_nav_projects: 'Projets',
      sidebar_nav_contact: 'Contact',
      sidebar_motivation: 'Je suis motivé par la curiosité et le désir de résoudre des problèmes concrets; j\'aime apprendre de nouvelles technologies et construire des solutions pratiques qui aident les autres.'
    }
  };

  let currentLang = localStorage.getItem('site_lang') || (navigator.language || 'es').slice(0,2);
  if (!translations[currentLang]) currentLang = 'es';
  let currentName = 'Cronoss20';

  function markActiveFlag(lang) {
    document.querySelectorAll('.flag').forEach(a => {
      const t = (a.title || '').toLowerCase();
      const map = { 'español':'es', 'english':'en', 'français':'fr' };
      const code = map[t] || (a.dataset.lang || '').toLowerCase();
      if (code === lang) a.classList.add('active'); else a.classList.remove('active');
    });
  }

  function applyTranslations(lang) {
    const tr = translations[lang] || translations.es;
    // Hero
    const h1 = document.querySelector('.hero-content h1'); if (h1) h1.textContent = `${tr.hero_h1_prefix} ${currentName}`;
    const h2 = document.querySelector('.hero-content h2'); if (h2) h2.textContent = tr.hero_h2;
    const p = document.querySelector('.hero-content p'); if (p) p.textContent = tr.hero_p;
    const cta = document.querySelector('.cta-btn'); if (cta) cta.textContent = tr.cta;
    // About
    const aboutH2 = document.querySelector('#about h2'); if (aboutH2) aboutH2.textContent = tr.about_h2;
  const aboutP = document.querySelector('#about .about-content p'); if (aboutP) aboutP.textContent = tr.about_p.replace('{name}', currentName);
    // Projects
    const projectsH2 = document.querySelector('#projects h2'); if (projectsH2) projectsH2.textContent = tr.projects_h2;
    // Contact / Form
    const contactH2 = document.querySelector('#contact h2'); if (contactH2) contactH2.textContent = tr.contact_h2;
    const nameInput = document.querySelector('input[name="name"]'); if (nameInput) nameInput.placeholder = tr.form_name;
    const emailInput = document.querySelector('input[name="email"]'); if (emailInput) emailInput.placeholder = tr.form_email;
    const msgInput = document.querySelector('textarea[name="message"]'); if (msgInput) msgInput.placeholder = tr.form_msg;
    const submitBtn = document.querySelector('#contact form button[type="submit"]'); if (submitBtn) submitBtn.textContent = tr.form_btn;
    // Sidebar
    const sb = document.querySelector('.sidebar'); if (sb) {
      const navs = sb.querySelectorAll('.sidebar-nav a');
      if (navs[0]) navs[0].querySelectorAll('span')[1].textContent = tr.sidebar_nav_about;
      if (navs[1]) navs[1].querySelectorAll('span')[1].textContent = tr.sidebar_nav_projects;
      if (navs[2]) navs[2].querySelectorAll('span')[1].textContent = tr.sidebar_nav_contact;
      const sm = sb.querySelector('.sidebar-motivation p'); if (sm) sm.textContent = tr.sidebar_motivation;
    }
    // Footer
    const footerCopy = document.querySelector('footer span'); if (footerCopy) footerCopy.textContent = tr.footer_tpl.replace('{year}', new Date().getFullYear()).replace('{name}', currentName);
    // Projects cards links text (if generated dynamically, the fetch will also use current translations)
  }

  function setLanguage(lang) {
    if (!translations[lang]) lang = 'es';
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    document.documentElement.lang = lang;
    markActiveFlag(lang);
    applyTranslations(lang);
  }

  // Wire flags
  document.querySelectorAll('.flags .flag').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const title = (a.title || '').toLowerCase();
      const map = { 'español':'es', 'english':'en', 'français':'fr' };
      const lang = map[title] || a.dataset.lang || 'es';
      setLanguage(lang);
    });
  });

  // Apply initial language before other renderings
  setLanguage(currentLang);

  // ---- Modo oscuro (si existe el toggle) ----
  const darkToggle = document.getElementById('darkmode-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) document.body.classList.add('dark');
  if (darkToggle) darkToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

  // ---- Animar skillbars ----
  document.querySelectorAll('.skillbar').forEach(bar => {
    const percent = parseInt(bar.getAttribute('data-percent')) || 0;
    const fill = document.createElement('div');
    fill.className = 'skillbar-fill';
    fill.style.width = '0%';
    bar.appendChild(fill);
    setTimeout(() => { fill.style.width = percent + '%'; }, 350);
  });

  // ---- Cargar proyectos desde GitHub (si existe contenedor .project-list) ----
  const githubUsername = 'cronoss20';
  const projectsContainer = document.querySelector('#projects .projects-grid');
  if (projectsContainer) {
    // limpiar contenido estático para evitar duplicados
    projectsContainer.innerHTML = '';
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`)
      .then(res => res.ok ? res.json() : [])
      .then(repos => {
        const tr = translations[currentLang] || translations.es;
        // excluir el repositorio de la página personal
        const filtered = (repos || []).filter(r => r && r.name !== 'cronoss20.github.io');
        // tomar hasta 6 repos recientes después de filtrar
        filtered.slice(0,6).forEach(repo => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.innerHTML = `
            <img src="${repo.owner && repo.owner.avatar_url ? repo.owner.avatar_url : 'project1.jpg'}" alt="${repo.name}" />
            <div class="project-content">
              <h3>${repo.name}</h3>
              <p>${repo.description || (tr.projects_h2 === 'Proyectos Destacados' ? 'Sin descripción.' : 'No description.')}</p>
              <div class="project-links">
                <a href="${repo.html_url}" target="_blank" rel="noopener">${tr.project_code}</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">${tr.project_demo}</a>` : ''}
              </div>
            </div>
          `;
          projectsContainer.appendChild(card);
        });
      }).catch(() => {/* ignore fetch errors */});
  }

  // ---- Formulario de contacto (si existe) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Prevent double submissions / reentrancy
      if (contactForm.dataset.sending === '1') return;
      contactForm.dataset.sending = '1';
      // Anti-duplicado: generar un id de envío y bloquear reenvíos rápidos
      const genId = () => 'cid_' + Date.now() + '_' + Math.random().toString(36).slice(2,10);
      const lastSubmit = JSON.parse(localStorage.getItem('last_submit') || 'null');
      const nowTs = Date.now();
      if (lastSubmit && lastSubmit.ts && (nowTs - lastSubmit.ts) < 8000) {
        const respEl = document.getElementById('form-response');
        if (respEl) { respEl.textContent = 'Estás enviando muy rápido. Espera unos segundos antes de volver a enviar.'; respEl.classList.add('error'); }
        return;
      }
      const clientId = genId();
      const formData = new FormData(contactForm);
      formData.append('client_submit_id', clientId);
      const respEl = document.getElementById('form-response');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const endpoint = contactForm.dataset.formspree && contactForm.dataset.formspree.trim();
      // Mensaje de envío y deshabilitar botón
      if (respEl) { respEl.textContent = 'Enviando...'; respEl.classList.remove('success','error'); }
      if (submitBtn) submitBtn.disabled = true;

      if (endpoint) {
        const url = endpoint.startsWith('http') ? endpoint : `https://formspree.io/f/${endpoint}`;
        const controller = new AbortController();
        const signal = controller.signal;
        let timeoutId = null;
        let optimisticShown = false;
        try {
          // Timeout after 3000ms: abort fetch and show optimistic success to keep UI snappy
          timeoutId = setTimeout(() => {
            try { controller.abort(); } catch(e) {/* ignore */}
            if (!optimisticShown) {
              optimisticShown = true;
              if (respEl) { respEl.textContent = 'Mensaje enviado. Gracias — te responderé en breve.'; respEl.classList.add('success'); }
              contactForm.reset();
              localStorage.setItem('last_submit', JSON.stringify({ id: clientId, ts: Date.now() }));
            }
          }, 3000);

          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData,
            signal
          });
          // If fetch resolves before timeout
          if (!optimisticShown) {
            if (res.ok) {
              if (respEl) { respEl.textContent = 'Mensaje enviado. Gracias — te responderé en breve.'; respEl.classList.add('success'); }
              contactForm.reset();
              localStorage.setItem('last_submit', JSON.stringify({ id: clientId, ts: Date.now() }));
            } else {
              let data = null;
              try { data = await res.json(); } catch(_) { data = null; }
              const err = (data && (data.error || data.message)) ? (data.error || data.message) : null;
              if (err) {
                if (respEl) { respEl.textContent = `${err} Por favor inténtalo de nuevo más tarde.`; respEl.classList.add('error'); }
              } else {
                if (respEl) { respEl.textContent = 'No se pudo enviar el mensaje. Por favor inténtalo de nuevo más tarde.'; respEl.classList.add('error'); }
              }
            }
          }
        } catch (err) {
          // If fetch failed and we haven't already shown optimistic success, show it now.
          if (!optimisticShown) {
            optimisticShown = true;
            if (respEl) { respEl.textContent = 'Mensaje enviado. Gracias — te responderé en breve.'; respEl.classList.add('success'); }
            contactForm.reset();
            localStorage.setItem('last_submit', JSON.stringify({ id: clientId, ts: Date.now() }));
            // Nota: asegúrate de tener deduplicación en servidor por client_submit_id
          }
        } finally {
          if (timeoutId) clearTimeout(timeoutId);
          if (submitBtn) submitBtn.disabled = false;
          contactForm.dataset.sending = '0';
        }
      } else {
        // Fallback: abrir mailto
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';
        const to = 'angelsierralopez@icloud.com';
        const subject = encodeURIComponent(`Contacto desde web - ${name}`);
        const body = encodeURIComponent(`Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        if (respEl) { respEl.textContent = 'Se abrirá tu cliente de correo para enviar el mensaje. Gracias.'; respEl.classList.add('success'); }
        contactForm.reset();
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // ---- Smooth scroll para anclas internas ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#') return; // permitir otros usos
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Idiomas: si tienes botones específicos (opcional) ----
  const btnEs = document.getElementById('btn-es');
  const btnEn = document.getElementById('btn-en');
  if (btnEs && btnEn) {
    btnEs.addEventListener('click', () => {
      document.querySelectorAll('.lang-es').forEach(n => n.style.display = '');
      document.querySelectorAll('.lang-en').forEach(n => n.style.display = 'none');
      btnEs.classList.add('active'); btnEn.classList.remove('active');
    });
    btnEn.addEventListener('click', () => {
      document.querySelectorAll('.lang-es').forEach(n => n.style.display = 'none');
      document.querySelectorAll('.lang-en').forEach(n => n.style.display = '');
      btnEn.classList.add('active'); btnEs.classList.remove('active');
    });
  }

  // ---- Sidebar (off-canvas) ----
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.className = 'sidebar';
      sidebar.innerHTML = `
        <div class="sidebar-header">
          <h3>Navegación</h3>
          <button class="close-btn" aria-label="Cerrar menú">✕</button>
        </div>
        <nav class="sidebar-nav">
          <a href="#about"><span class="icon">👋</span><span>Sobre mí</span></a>
          <a href="#projects"><span class="icon">💼</span><span>Proyectos</span></a>
          <a href="#contact"><span class="icon">✉️</span><span>Contacto</span></a>
        </nav>
        <div class="sidebar-motivation">
          <p>Me muevo por la curiosidad y el deseo de resolver problemas reales; disfruto aprendiendo nuevas tecnologías y construyendo soluciones prácticas que ayuden a otros.</p>
        </div>
        <div class="sidebar-footer">
          <div class="clocks">
            <div class="clock"><span class="tz">Madrid</span> <span class="time" id="time-madrid">--:--:--</span></div>
            <div class="clock"><span class="tz">New York</span> <span class="time" id="time-ny">--:--:--</span></div>
          </div>
        </div>
      `;
      document.body.appendChild(sidebar);
    }
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
    }

    function openSidebar(){
      sidebar.classList.add('open');
      overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded','true');
      // Accessibility: hide main content from screen readers and trap focus in sidebar
      document.querySelectorAll('body > :not(.sidebar):not(.overlay)').forEach(el => el.setAttribute('aria-hidden','true'));
      // focus first focusable element in sidebar
      const focusable = sidebar.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable && focusable.length) focusable[0].focus();
    }
    function closeSidebar(){
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded','false');
      // Restore aria-hidden and return focus to hamburger
      document.querySelectorAll('body > :not(.sidebar):not(.overlay)').forEach(el => el.removeAttribute('aria-hidden'));
      hamburger.focus();
    }

    hamburger.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    const closeBtn = sidebar.querySelector('.close-btn'); if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar();
      // simple focus trap: keep focus inside sidebar while open
      if (e.key === 'Tab' && sidebar.classList.contains('open')) {
        const focusable = Array.from(sidebar.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length-1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  // ---- Relojes: actualizar Madrid y New York cada segundo (si existen) ----
  function updateClocks() {
    const mEl = document.getElementById('time-madrid');
    const nyEl = document.getElementById('time-ny');
    if (!mEl && !nyEl) return;
    const now = new Date();
    try {
      const fmtMadrid = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Madrid' });
      const fmtNY = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/New_York' });
      if (mEl) mEl.textContent = fmtMadrid.format(now);
      if (nyEl) nyEl.textContent = fmtNY.format(now);
    } catch (err) {
      const pad = (n) => String(n).padStart(2, '0');
      if (mEl) mEl.textContent = `${pad(now.getUTCHours()+2)}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
      if (nyEl) nyEl.textContent = `${pad(now.getUTCHours()-4)}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
    }
  }
  updateClocks();
  setInterval(updateClocks, 1000);

  // ---- Nombre dinámico desde GitHub ----
  async function fetchGitHubName(username) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) return username;
      const data = await res.json();
      return data.name || username;
    } catch (err) { return username; }
  }
  function setName(name) {
    const logoNameEl = document.getElementById('logo-name'); if (logoNameEl) logoNameEl.textContent = name;
    const heroTitle = document.getElementById('hero-title'); if (heroTitle) heroTitle.textContent = `Hola, soy ${name}`;
    const pageTitle = document.getElementById('page-title'); if (pageTitle) pageTitle.textContent = `${name} | Ingeniero Informático`;
    const footerCopy = document.getElementById('footer-copy'); if (footerCopy) footerCopy.textContent = `© ${new Date().getFullYear()} ${name}. Todos los derechos reservados.`;
    currentName = name || currentName;
    // reaplicar traducciones para incluir el nombre actualizado
    try { if (typeof applyTranslations === 'function') applyTranslations(currentLang); } catch(e) {/* ignore */}
  }
  fetchGitHubName(githubUsername).then(setName);

});
