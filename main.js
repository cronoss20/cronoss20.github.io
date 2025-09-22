// main.js - controlador de interacciones del sitio
// Código seguro: comprueba la existencia de elementos antes de operar

document.addEventListener('DOMContentLoaded', () => {
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
  const projectsContainer = document.querySelector('.project-list');
  if (projectsContainer) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then(res => res.ok ? res.json() : [])
      .then(repos => {
        (repos || []).slice(0,6).forEach(repo => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Sin descripción.'}</p>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" rel="noopener">Código</a>
              ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener">Demo</a>` : ''}
            </div>
          `;
          projectsContainer.appendChild(card);
        });
      }).catch(() => {/* ignore fetch errors */});
  }

  // ---- Formulario de contacto (si existe) ----
  const contactForm = document.querySelector('#contact form') || document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const respEl = document.getElementById('form-response');
      if (respEl) respEl.textContent = '¡Gracias por tu mensaje! Me pondré en contacto pronto.';
      contactForm.reset();
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
    }
    function closeSidebar(){
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded','false');
    }

    hamburger.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    const closeBtn = sidebar.querySelector('.close-btn'); if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });
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
  }
  fetchGitHubName(githubUsername).then(setName);

});
