// Nav scroll и toggleMenu теперь в nav.js

// Подставляем фото первого изделия каждого раздела в плитки на главной
function initSectionCards() {
  if (typeof ITEMS === 'undefined') return;
  const cats = ['bench','urn','planter','furniture','sport','pavement','bollard'];
  cats.forEach(cat => {
    const el = document.getElementById('sec-' + cat);
    if (!el) return;
    const item = ITEMS.find(i => i.cat === cat && i.img);
    if (item) el.style.backgroundImage = `url('${item.img}')`;
  });
}

initSectionCards();

// Form submit → Telegram
// 99mpa-public-lead-v1: credentials and recipient are server-side.
async function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit]');
  if (!btn || btn.disabled) return;
  if (!form.reportValidity()) return;
  const name = form.querySelector('input[type=text]:not(#hp_field)').value.trim();
  const phone = form.querySelector('input[type=tel]').value.trim();
  const type = form.querySelector('select').value;
  const message = form.querySelector('textarea').value.trim();
  const website = document.getElementById('hp_field')?.value || '';
  if (website) return;
  if (!form.dataset.leadRequestId) form.dataset.leadRequestId = crypto.randomUUID();
  const params = new URL(location.href).searchParams;
  const attribution = {};
  for (const key of ['source', 'medium', 'campaign']) {
    const value = params.get('utm_' + key);
    if (value) attribution[key] = value.slice(0, 180);
  }
  btn.textContent = 'Отправляем…';
  btn.disabled = true;
  let succeeded = false;
  try {
    const res = await fetch('/api/public-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({request_id: form.dataset.leadRequestId, name, phone, type, message, website, attribution})
    });
    const data = await res.json();
    if (res.ok && data.ok === true) {
      document.dispatchEvent(new Event('99mpa:lead-success'));
      btn.textContent = '✓ Заявка отправлена!';
      form.reset();
      delete form.dataset.leadRequestId;
      succeeded = true;
    } else {
      throw new Error('delivery not confirmed');
    }
  } catch {
    btn.textContent = 'Нет подтверждения — напишите в WhatsApp';
    btn.style.background = '#c0392b';
  }
  setTimeout(() => {
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
    btn.style.background = '';
    // A new confirmed submission receives a new id; uncertain retries retain it.
    if (succeeded) delete form.dataset.leadRequestId;
  }, 6000);
}

// Smooth scroll — только для якорных ссылок на этой же странице
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const t = document.querySelector(href);
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

// Анимации при скролле
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Поочерёдное появление карточек в сетках (stagger)
const staggerGrids = document.querySelectorAll(
  '.cat-sections-grid, .portfolio__grid, .textures-grid, .products__grid, .b2b__grid, .how__grid, ' +
  '.projects-grid, .add-features__grid, .add-how__grid, .add-price__grid'
);
const staggerObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const items = entry.target.children;
    Array.from(items).forEach((el, i) => {
      el.classList.add('stagger-item');
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
    staggerObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

staggerGrids.forEach(grid => staggerObserver.observe(grid));

// Параллакс фона hero при скролле
const heroBg = document.querySelector('.hero__bg');
if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const offset = window.scrollY;
      heroBg.style.transform = `translateY(${offset * 0.35}px) scale(1.04)`;
      ticking = false;
    });
  });
}
