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

// Home products — рендер из catalog_data.js
function renderHomeProducts(filter) {
  const grid = document.getElementById('home-products-grid');
  if (!grid || typeof ITEMS === 'undefined') return;

  let items = filter === 'all' ? ITEMS : ITEMS.filter(i => i.cat === filter);
  // По одному представителю каждой серии, макс 9
  const seen = new Set();
  const unique = [];
  for (const item of items) {
    const key = item.series;
    if (!seen.has(key)) { seen.add(key); unique.push(item); }
    if (unique.length >= 9) break;
  }

  grid.innerHTML = unique.map(item => `
    <div class="product-card" data-cat="${item.cat}">
      <div class="product-card__img" style="background:${item.img ? '#fff' : '#f5f5f3'};background-image:url('${item.img}');background-size:contain;background-position:center;background-repeat:no-repeat;${item.img ? 'border-bottom:1px solid #f0f0ee' : ''}"></div>
      <div class="product-card__body">
        <h3>${item.series}</h3>
        <p>${item.name}</p>
        <div class="product-card__footer">
          <a href="catalog.html" class="link">Смотреть в каталоге →</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Product filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderHomeProducts(btn.dataset.filter);
  });
});

renderHomeProducts('all');

// Form submit → Telegram
async function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit]');
  const inputs = form.querySelectorAll('input, select, textarea');

  const name  = inputs[0].value.trim();
  const phone = inputs[1].value.trim();
  const type  = inputs[2].value;
  const msg   = inputs[3].value.trim();

  const typeLabels = {
    maf: 'МАФы / изделия', additive: 'Добавки',
    b2b: 'Оптовое сотрудничество', custom: 'Индивидуальный заказ'
  };

  const text = `🏗 Новая заявка с сайта 99mpa\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📦 Тип: ${typeLabels[type] || type || 'не указан'}\n💬 Сообщение: ${msg || '—'}`;

  btn.textContent = '...';
  btn.disabled = true;

  try {
    const res = await fetch(`https://api.telegram.org/bot8600434161:AAELat2KBX2sELTjumoBJhmhoYb_SwBWCdk/sendMessage`, {
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
