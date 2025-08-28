// Modo oscuro automático y por botón
const darkToggle = document.getElementById('darkmode-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) document.body.classList.add('dark');
darkToggle.onclick = () => document.body.classList.toggle('dark');

// Animar skillbars al cargar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skillbar').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    const fill = document.createElement('div');
    fill.className = 'skillbar-fill';
    fill.style.width = '0';
    bar.appendChild(fill);
    setTimeout(() => {
      fill.style.width = percent + '%';
    }, 400);
  });
});

// Proyectos destacados dinámicos desde GitHub
const githubUsername = "cronoss20";
const projectsContainer = document.querySelector(".project-list");
fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card animate-in";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Sin descripción."}</p>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> Código</a>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ""}
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  });

// Formulario de contacto interactivo
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const es = document.querySelector('.lang-es').style.display !== 'none';
  document.getElementById("form-response").textContent = es
    ? "¡Gracias por tu mensaje! Me pondré en contacto pronto."
    : "Thank you for your message! I will get in touch soon.";
  contactForm.reset();
});

// Smooth Scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({behavior: "smooth"});
    }
  });
});

// Cambiar idioma entre español e inglés
document.getElementById('btn-es').onclick = function() {
  document.querySelectorAll('.lang-es').forEach(e => e.style.display = '');
  document.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none');
  document.getElementById('btn-es').classList.add('active');
  document.getElementById('btn-en').classList.remove('active');
};
document.getElementById('btn-en').onclick = function() {
  document.querySelectorAll('.lang-es').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.lang-en').forEach(e => e.style.display = '');
  document.getElementById('btn-en').classList.add('active');
  document.getElementById('btn-es').classList.remove('active');
};

// Tu usuario de GitHub
const githubUser = "cronoss20";

async function fetchGitHubName(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) return username; // Si no hay nombre, usa el username
  const data = await res.json();
  return data.name || username;
}

function setName(name) {
  document.getElementById("logo-name").textContent = name;
  document.getElementById("hero-title").textContent = `Hola, soy ${name}`;
  document.getElementById("page-title").textContent = `${name} | Ingeniero Informático`;
  const year = new Date().getFullYear();
  document.getElementById("footer-copy").textContent = `© ${year} ${name}. Todos los derechos reservados.`;
}

// Inicializa: busca el nombre y lo pone en la web
fetchGitHubName(githubUser).then(setName);
