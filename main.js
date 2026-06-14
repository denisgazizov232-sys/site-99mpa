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
async function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit]');
  const inputs = form.querySelectorAll('input, select, textarea');

  // Honeypot — если заполнено, это бот
  if (document.getElementById('hp_field') && document.getElementById('hp_field').value) return;

  const name  = form.querySelector('input[type=text]:not(#hp_field)').value.trim();
  const phone = form.querySelector('input[type=tel]').value.trim();
  const type  = form.querySelector('select').value;
  const msg   = form.querySelector('textarea').value.trim();

  const typeLabels = {
    maf: 'МАФы / изделия', additive: 'Добавки',
    b2b: 'Оптовое сотрудничество', custom: 'Индивидуальный заказ'
  };

  const text = `🏗 Новая заявка с сайта 99mpa\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📦 Тип: ${typeLabels[type] || type || 'не указан'}\n💬 Сообщение: ${msg || '—'}`;

  btn.textContent = '...';
  btn.disabled = true;

  try {
    const res = await fetch(`https://api.telegram.org/bot8600434161:AAHhl1Y9uAjn-ekuQDraSdnwPMa-4rCysus/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: 716466548, text })
    });
    const data = await res.json();
    if (data.ok) {
      btn.textContent = '✓ Заявка отправлена!';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    btn.textContent = 'Ошибка — напишите в WhatsApp';
    btn.style.background = '#c0392b';
  }

  setTimeout(() => {
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
    btn.style.background = '';
  }, 4000);
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
