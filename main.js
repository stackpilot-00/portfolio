/* Portfolio logic: intro, navigation, rendering data from js/data.js, contact form. */
(function () {
  const S = window.SITE || {};
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const root = document.documentElement;

  /* ---------- Intro animation ---------- */
  function ready() { root.classList.add('ready'); }
  const intro = $('#intro');
  if (intro && root.classList.contains('intro-on')) {
    try { sessionStorage.setItem('msIntro', '1'); } catch (e) {}
    setTimeout(() => { intro.classList.add('done'); ready(); }, 3000);   // total ~3s
    setTimeout(() => intro.remove(), 3700);
  } else { ready(); }
  setTimeout(ready, 4500); // safety net if anything fails

  /* ---------- Shared pieces ---------- */
  const logo = n => `<svg class="logo" width="${n}" height="${n}" viewBox="0 0 100 100" role="img" aria-label="MS logo"><circle cx="50" cy="50" r="46" fill="#080D18" stroke="#4F8CFF" stroke-width="4"/><text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="36" fill="#F5F7FC">MS</text></svg>`;
  const L = S.links || {};
  const icons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 2H3.6A1.6 1.6 0 0 0 2 3.6v16.8A1.6 1.6 0 0 0 3.6 22h16.8a1.6 1.6 0 0 0 1.6-1.6V3.6A1.6 1.6 0 0 0 20.4 2ZM8 18.5H5.5V10H8v8.5ZM6.75 8.9a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM18.5 18.5H16v-4.1c0-1 0-2.2-1.35-2.2s-1.55 1-1.55 2.1v4.2h-2.5V10h2.4v1.1h.03a2.6 2.6 0 0 1 2.35-1.3c2.5 0 3 1.65 3 3.8v4.9Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };
  const socials = () => [['github', 'GitHub', L.github], ['linkedin', 'LinkedIn', L.linkedin], ['email', 'Email', L.email && 'mailto:' + L.email]]
    .filter(x => x[2]).map(([k, n, u]) => `<a href="${esc(u)}" aria-label="${n}" ${k === 'email' ? '' : 'target="_blank" rel="noopener"'}>${icons[k]}</a>`).join('');

  /* ---------- Header and footer ---------- */
  const NAV = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['education', 'Education'], ['certificates', 'Certificates'], ['resume', 'Resume'], ['contact', 'Contact']];
  const base = page === 'home' ? '' : 'index.html';
  $('#site-header').innerHTML = `<div class="wrap bar"><a class="brand" href="${base || '#home'}" aria-label="M Shankarnath, home">${logo(38)}<span>M Shankarnath</span></a><button class="menu-btn" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span><span></span></button><nav id="nav-links" aria-label="Main">${NAV.map(([id, t]) => `<a href="${page === 'home' ? '' : 'index.html'}#${id}" data-id="${id}">${t}</a>`).join('')}</nav></div>`;
  $('#site-footer').innerHTML = `<div class="wrap foot"><div class="who">${logo(40)}<div><strong>M Shankarnath</strong><small>Learning, building and designing with data.</small></div></div><div class="socials">${socials()}</div><small class="muted">&copy; ${new Date().getFullYear()} M Shankarnath</small></div>`;

  const nav = $('#nav-links'), btn = $('.menu-btn');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  if (page !== 'home') { const a = $('[data-id=projects]', nav); if (a) a.classList.add('active'); }

  /* ---------- Project cards ---------- */
  const tags = a => a && a.length ? `<div class="tags">${a.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';
  const ext = (u, t) => u ? `<a class="link" href="${esc(u)}" target="_blank" rel="noopener">${t}</a>` : '';
  const projectCard = p => `<article class="card project"><div class="thumb">${p.thumbnail ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)} thumbnail" loading="lazy">` : logo(56)}</div><div class="body"><div class="row"><h3>${esc(p.title)}</h3>${p.status ? `<span class="status">${esc(p.status)}</span>` : ''}</div><p>${esc(p.summary)}</p>${tags(p.tags)}<div class="actions"><a class="btn sm" href="project.html?id=${encodeURIComponent(p.id)}">View Details</a>${ext(p.github, 'GitHub')}${ext(p.demo, 'Live Demo')}</div></div></article>`;
  const empty = msg => `<div class="card empty">${logo(48)}<p>${msg}</p></div>`;
  const grid = $('#project-grid');
  if (grid) {
    const list = (S.projects || []).slice(0, +grid.dataset.limit || 999);
    grid.innerHTML = list.length ? list.map(projectCard).join('') : empty("I'm currently developing projects. New work will be showcased here soon.");
  }

  /* ---------- Project detail page ---------- */
  const detail = $('#project-detail');
  if (detail) {
    const p = (S.projects || []).find(x => x.id === new URLSearchParams(location.search).get('id'));
    const back = '<a class="btn ghost sm" href="projects.html">Back to Projects</a>';
    const sec = (t, h) => h ? `<section><h2>${t}</h2>${h}</section>` : '';
    const list = a => a && a.length ? `<ul>${a.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
    const para = t => t ? `<p>${esc(t)}</p>` : '';
    if (!p) { detail.innerHTML = `${back}<h1>Project not found</h1><p class="muted">This project does not exist. Browse all projects instead.</p>`; }
    else {
      document.title = p.title + ' | M Shankarnath';
      detail.innerHTML = `<div class="detail">${back}<h1>${esc(p.title)}</h1>${p.status ? `<span class="status">${esc(p.status)}</span>` : ''}
        <div class="actions" style="margin-top:16px">${ext(p.github, 'GitHub repository')}${ext(p.demo, 'Live demo')}</div>
        ${sec('Overview', para(p.overview || p.summary))}${sec('Problem statement', para(p.problem))}${sec('Proposed solution', para(p.solution))}
        ${sec('Features', list(p.features))}${sec('Technologies used', tags(p.technologies))}${sec('Development process', para(p.process))}
        ${sec('Screenshots and diagrams', p.screenshots && p.screenshots.length ? `<div class="shots">${p.screenshots.map(s => `<figure><img src="${esc(s.src)}" alt="${esc(s.caption || p.title)}" loading="lazy">${s.caption ? `<figcaption>${esc(s.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : '')}
        ${sec('Challenges and lessons learned', para(p.lessons))}<section>${back}</section></div>`;
    }
  }

  /* ---------- Home page sections ---------- */
  const photo = $('#profile-photo');
  if (photo && S.profilePhoto) photo.src = S.profilePhoto;
  const soc = $('[data-socials]'); if (soc) soc.innerHTML = socials();

  const sk = $('#skill-groups');
  if (sk) sk.innerHTML = (S.skills || []).map(g => `<article class="card"><h3>${esc(g.title)}</h3>${g.items.length ? `<ul class="chips">${g.items.map(i => `<li class="chip">${esc(i.name)}${i.learning ? '<small>learning</small>' : ''}</li>`).join('')}</ul>` : `<p class="muted" style="margin-top:12px">${esc(g.empty || 'Skills will be added here.')}</p>`}</article>`).join('');

  const edu = S.education || {}, ec = $('#edu-card');
  if (ec) ec.insertAdjacentHTML('beforeend',
    (edu.cgpa ? `<p><strong>CGPA:</strong> ${esc(edu.cgpa)}</p>` : '') +
    [['Relevant coursework', edu.coursework], ['Academic projects', edu.projects], ['Academic achievements', edu.achievements]]
      .filter(x => x[1] && x[1].length).map(([t, a]) => `<p style="margin-top:14px"><strong>${t}</strong></p><ul>${a.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join(''));

  const cg = $('#cert-grid');
  if (cg) cg.innerHTML = (S.certificates || []).length ? S.certificates.map(c => `<article class="card cert">${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.title)} certificate" loading="lazy">` : ''}<h3>${esc(c.title)}</h3><p class="muted">${esc(c.issuer)}${c.date ? ' · ' + esc(c.date) : ''}</p><div class="actions" style="margin-top:12px">${c.viewUrl ? `<a class="btn sm" href="${esc(c.viewUrl)}" target="_blank" rel="noopener">View Certificate</a>` : ''}${ext(c.verifyUrl, 'Verify')}</div></article>`).join('') : empty('Certificates and achievements will be added as I continue my learning journey.');

  /* Resume: real link only when resumeUrl is set; otherwise a clear "coming soon" state. */
  if (S.resumeUrl) {
    $$('[data-resume]').forEach(a => { a.href = S.resumeUrl; a.target = '_blank'; a.rel = 'noopener'; });
    const slot = $('#resume-slot'), txt = $('#resume-text');
    if (txt) txt.textContent = 'Download my resume as a PDF.';
    if (slot) slot.innerHTML = `<a class="btn" href="${esc(S.resumeUrl)}" download>Download Resume</a>`;
  }

  /* Contact info (only what exists) */
  const ci = $('#contact-info');
  if (ci) ci.innerHTML = [['Email', L.email && 'mailto:' + L.email, L.email], ['LinkedIn', L.linkedin, 'linkedin'], ['GitHub', L.github, 'github']]
    .filter(x => x[1]).map(([t, u, v]) => `<a href="${esc(u)}" ${t === 'Email' ? '' : 'target="_blank" rel="noopener"'}>${t}${t === 'Email' ? ': ' + esc(v) : ''}</a>`).join('') || '<p class="muted">Contact details will be added soon. Until then, please use the form.</p>';

  /* ---------- Contact form ---------- */
  const form = $('#contact-form');
  if (form) {
    const status = $('#form-status'), submit = $('button[type=submit]', form);
    const rules = {
      name: v => v.trim() ? '' : 'Please enter your name.',
      email: v => !v.trim() ? 'Please enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address, like name@example.com.',
      subject: v => v.trim() ? '' : 'Please enter a subject.',
      message: v => v.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'
    };
    const check = f => { const m = rules[f.name](f.value); f.setAttribute('aria-invalid', !!m); f.nextElementSibling.textContent = m; return !m; };
    $$('input,textarea', form).forEach(f => rules[f.name] && f.addEventListener('blur', () => check(f)));
    let busy = false;
    form.addEventListener('submit', async e => {
      e.preventDefault(); if (busy) return;
      const fields = $$('input,textarea', form).filter(f => rules[f.name]);
      const ok = fields.map(check).every(Boolean);
      if (!ok) { status.className = 'status-msg bad'; status.textContent = 'Please fix the highlighted fields.'; fields.find(f => f.getAttribute('aria-invalid') === 'true').focus(); return; }
      if (form.elements._gotcha.value) return;  // honeypot: bots fill this hidden field
      if (!S.contactEndpoint) { status.className = 'status-msg info'; status.textContent = 'The contact form is not connected yet, so your message was not sent. Please use the email or social links instead.'; return; }
      busy = true; submit.disabled = true; submit.textContent = 'Sending...'; status.textContent = '';
      try {
        const res = await fetch(S.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
        if (!res.ok) throw new Error(res.status);
        form.reset(); status.className = 'status-msg ok'; status.textContent = 'Thank you. Your message was sent.';
      } catch (err) { status.className = 'status-msg bad'; status.textContent = 'Your message could not be sent. Please try again or use the email link.'; }
      busy = false; submit.disabled = false; submit.textContent = 'Send message';
    });
  }

  /* ---------- Scroll reveal + active section ---------- */
  if ('IntersectionObserver' in window) {
    const rev = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), { threshold: .12 });
    $$('.reveal').forEach(el => rev.observe(el));
    if (page === 'home') {
      const links = $$('a[data-id]', nav);
      const act = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.dataset.id === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
      $$('main section[id]').forEach(s => act.observe(s));
    }
  } else { $$('.reveal').forEach(el => el.classList.add('in')); }
})();
