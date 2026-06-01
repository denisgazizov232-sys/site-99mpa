// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  let m = document.querySelector('.nav__mobile');
  if (!m) {
    m = document.createElement('div');
    m.className = 'nav__mobile';
    const lang = document.documentElement.lang || 'ru';
    const t = translations[lang];
    const items = [
      ['#about', t.nav_about], ['#products', t.nav_products], ['#portfolio', t.nav_portfolio],
      ['#b2b', t.nav_b2b], ['#additive', t.nav_additive], ['#contact', t.nav_contact]
    ];
    items.forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href; a.textContent = label;
      a.onclick = () => { menuOpen = false; m.classList.remove('open'); };
      m.appendChild(a);
    });
    document.body.appendChild(m);
  }
  m.classList.toggle('open', menuOpen);
}

// Product filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.cat !== filter);
    });
  });
});

// Form submit
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  const lang = document.documentElement.lang || 'ru';
  btn.textContent = lang === 'ru' ? '✓ Отправлено!' : '✓ Sent!';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = translations[lang].form_btn;
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Animate stats on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stats__num').forEach(el => {
      const target = parseInt(el.textContent);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.textContent.includes('+') ? '+' : el.textContent.includes('%') ? '%' : '');
        if (current >= target) clearInterval(timer);
      }, 30);
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) observer.observe(statsSection);
