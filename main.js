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
  document.getElementById("form-response").textContent = "¡Gracias por tu mensaje! Me pondré en contacto pronto.";
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
