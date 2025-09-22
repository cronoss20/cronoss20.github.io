// tools/generate_projects.js
// Script para generar projects.json con la lista pública de repositorios de un usuario
// Uso: GITHUB_TOKEN=ghp_xxx node tools/generate_projects.js <github-username>

const fs = require('fs');
const https = require('https');

const username = process.argv[2] || 'cronoss20';
const token = process.env.GITHUB_TOKEN || null;

function fetchJSON(url) {
  const headers = { 'User-Agent': 'node-script' };
  if (token) headers['Authorization'] = `token ${token}`;
  return new Promise((resolve, reject) => {
    const opts = { headers };
    https.get(url, opts, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(body)); } catch(e) { reject(e); }
        } else {
          reject(new Error(`HTTP ${res.statusCode} - ${res.statusMessage}: ${body}`));
        }
      });
    }).on('error', err => reject(err));
  });
}

(async () => {
  try {
    console.log('Obteniendo repositorios de', username);
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    const repos = await fetchJSON(url);
    // Filtrar y mapear los campos que necesitamos
    const filtered = (repos || [])
      .filter(r => r && r.name !== `${username}.github.io`)
      .map(r => ({ name: r.name, description: r.description, html_url: r.html_url, homepage: r.homepage, avatar: r.owner && r.owner.avatar_url }));
    const out = filtered.slice(0, 12);
    fs.writeFileSync('projects.json', JSON.stringify(out, null, 2), 'utf8');
    console.log('projects.json generado con', out.length, 'entradas');
  } catch (err) {
    console.error('Error generando projects.json:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
