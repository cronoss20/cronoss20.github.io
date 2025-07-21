// Proyectos destacados desde GitHub API
const githubUsername = "cronoss20";
const projectsList = document.getElementById("projects");

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    repos.slice(0, 5).forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>: ${repo.description || ""}`;
      projectsList.appendChild(li);
    });
  });

// Formulario de contacto (simulado)
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("form-response").textContent = "¡Gracias por tu mensaje! Me pondré en contacto pronto.";
  this.reset();
});
