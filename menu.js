// Inject the shared topbar/menu and footer into every page.
// Set <body data-page="..."> to one of: home, about,
// work, where, work-essay, where-link to highlight current.

(function () {
  const page = document.body.dataset.page || 'home';
  const footerMode = document.body.dataset.footer || 'right';

  const isAbout = page.startsWith('about');
  const isWork = page === 'work' || page === 'work-essay';
  const isWhere = page === 'where' || page === 'where-link';

  const topbar = document.createElement('header');
  topbar.className = 'topbar';
  const menuItems = `
      <div class="menu-item ${isAbout ? 'is-current' : ''}">
        <a class="label" href="about.html">[ABOUT]</a>
        <div class="submenu">
          <span>PROSE FORM</span>
          <span>BULLET FORM</span>
        </div>
      </div>
      <div class="menu-item ${isWork ? 'is-current' : ''}">
        <a class="label" href="work.html">{ WORK }</a>
        <div class="submenu">
          <a href="work.html#essays">ESSAYS</a>
          <a href="work.html#academic">ACADEMIC WORK</a>
          <a href="work.html#design">DESIGN PORTFOLIO</a>
        </div>
      </div>
      <div class="menu-item ${isWhere ? 'is-current' : ''}">
        <a class="label" href="where.html">&lt;WHERE TO NEXT?&gt;</a>
      </div>`;

  if (page === 'home') {
    topbar.innerHTML = `
      <nav class="menu menu--home" aria-label="Primary">
        ${menuItems}
      </nav>`;
  } else {
    topbar.innerHTML = `
      <a href="index.html" class="brand-name" aria-label="Home">
        <span class="brand-first">Adéla</span>
        <span class="brand-last">Sodomová</span>
      </a>
      <nav class="menu menu--inner" aria-label="Primary">
        ${menuItems}
      </nav>`;
  }
  document.body.prepend(topbar);

  const footer = document.createElement('div');
  footer.className = `footer ${footerMode}`;
  footer.textContent = 'Thank you for paying me a visit!';
  document.body.appendChild(footer);

  // ---- Animated fairy cursor ----
  const FRAMES = 5;
  const BASE   = 'cursors/fairy_';
  const FPS    = 12; // frames per second

  // Preload all frames
  const imgs = Array.from({ length: FRAMES }, (_, i) => {
    const img = new Image();
    img.src = BASE + i + '.png';
    return img;
  });

  const el = document.createElement('img');
  el.style.cssText = [
    'position:fixed',
    'pointer-events:none',
    'z-index:99999',
    'width:42px',
    'height:42px',
    'transform:translate(-4px,-4px)', // hotspot offset
    'image-rendering:pixelated',
  ].join(';');
  el.src = imgs[0].src;
  document.body.appendChild(el);

  let frame = 0;
  let x = -100, y = -100;

  document.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
  });

  setInterval(() => {
    frame = (frame + 1) % FRAMES;
    el.src = imgs[frame].src;
  }, 1000 / FPS);
})();
