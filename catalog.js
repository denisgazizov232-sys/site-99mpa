// Динамический сайдбар: разделы → серии
const SECTION_ORDER = ['bench','urn','planter','furniture','sport','pavement','bollard'];

// Переводы разделов из i18n
function getT(key) {
  try {
    const lang = localStorage.getItem('lang') || 'ru';
    return (translations[lang] && translations[lang][key]) || translations['ru'][key] || key;
  } catch(e) { return key; }
}

// Переводы названий разделов
const SECTION_I18N = {
  'all': 'cat_all',
  'bench': 'cat_bench',
  'urn': 'cat_urn',
  'planter': 'cat_planter',
  'furniture': 'cat_furniture',
  'sport': 'cat_sport',
  'pavement': 'cat_pavement',
  'bollard': 'cat_bollard',
};

let currentCat = 'all';
let currentSeries = '';

// Строим сайдбар динамически
function buildSidebar() {
  const menu = document.getElementById('sidebar-menu');
  const allCount = document.getElementById('cnt-all');
  allCount.textContent = ITEMS.length;

  SECTION_ORDER.forEach(cat => {
    const secName = getT(SECTION_I18N[cat]) || SECTIONS[cat];
    if (!secName) return;
    const catItems = ITEMS.filter(i => i.cat === cat);
    if (!catItems.length) return;

    // Группа
    const group = document.createElement('li');
    group.className = 'sidebar__group';

    // Заголовок группы — кликабельный
    const groupTitle = document.createElement('a');
    groupTitle.href = '#';
    groupTitle.className = 'sidebar__link sidebar__group-title';
    groupTitle.dataset.cat = cat;
    groupTitle.dataset.series = '';
    groupTitle.innerHTML = `${secName} <span class="sidebar__count">${catItems.length}</span>`;
    groupTitle.addEventListener('click', e => { e.preventDefault(); setFilter(cat, ''); });
    group.appendChild(groupTitle);

    // Серии внутри раздела
    const seriesList = (SERIES_BY_CAT[cat] || []);
    if (seriesList.length > 1) {
      const ul = document.createElement('ul');
      seriesList.forEach(series => {
        const seriesItems = catItems.filter(i => i.series === series);
        if (!seriesItems.length) return;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'sidebar__link sidebar__link--series';
        a.dataset.cat = cat;
        a.dataset.series = series;
        a.innerHTML = `${series} <span class="sidebar__count">${seriesItems.length}</span>`;
        a.addEventListener('click', e => { e.preventDefault(); setFilter(cat, series); });
        li.appendChild(a);
        ul.appendChild(li);
      });
      group.appendChild(ul);
    }

    menu.appendChild(group);
  });
}

function setFilter(cat, series) {
  currentCat = cat;
  currentSeries = series;

  // Подсветка активного
  document.querySelectorAll('.sidebar__link').forEach(l => {
    l.classList.toggle('active',
      l.dataset.cat === cat && l.dataset.series === series
    );
  });

  // Заголовок
  let title = getT('cat_all');
  if (cat !== 'all') {
    title = getT(SECTION_I18N[cat]) || SECTIONS[cat] || cat;
    if (series) title = series;
  }
  document.getElementById('cat-title').textContent = title;
  document.getElementById('search').value = '';
  filterCatalog();
  document.getElementById('sidebar').classList.remove('open');
}

function filterCatalog() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  let items = ITEMS;

  if (currentCat !== 'all') {
    items = items.filter(i => i.cat === currentCat);
    if (currentSeries) {
      items = items.filter(i => i.series === currentSeries);
    }
  }

  if (q) {
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.series.toLowerCase().includes(q) ||
      i.n.includes(q)
    );
  }

  renderGrid(items);
}

function renderGrid(items) {
  const grid = document.getElementById('catalog-grid');
  if (!items.length) {
    grid.innerHTML = '<p style="color:#999;padding:40px 0">Ничего не найдено</p>';
    document.getElementById('cat-count').textContent = '0 позиций';
    return;
  }

  grid.innerHTML = items.map(item => {
    const img = item.img
      ? `style="background-image:url('${item.img}')"`
      : `style="background:#f5f5f3"`;
    const price = item.price
      ? `<div class="cat-card__price">${item.price.toLocaleString('ru')} ₽</div>`
      : '';
    return `
    <div class="cat-card" onclick="openModal('${item.n}')">
      <div class="cat-card__img" ${img}></div>
      <div class="cat-card__body">
        <div class="cat-card__series">${item.series}</div>
        <div class="cat-card__name">${item.name}</div>
        <div class="cat-card__size">${item.size}</div>
        <div class="cat-card__footer">
          ${price}
          <span class="cat-card__cta">Подробнее →</span>
        </div>
      </div>
    </div>`;
  }).join('');

  document.getElementById('cat-count').textContent = `${items.length} позиций`;
}

function openModal(num) {
  const item = ITEMS.find(i => i.n === num);
  if (!item) return;

  const sec = SECTIONS[item.cat] || '';
  document.getElementById('modal-cat').textContent = sec + (item.series ? ' · ' + item.series : '');
  document.getElementById('modal-title').textContent = item.name;
  document.getElementById('modal-size').textContent = item.size ? 'Габариты: ' + item.size : '';
  document.getElementById('modal-desc').textContent = item.desc || '';
  document.getElementById('modal-price').textContent = item.price ? 'Цена: ' + item.price.toLocaleString('ru') + ' ₽ с НДС' : '';

  const imgEl = document.getElementById('modal-img');
  if (item.img) {
    imgEl.style.backgroundImage = `url('${item.img}')`;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  // WhatsApp с текстом изделия
  const waText = encodeURIComponent(`Здравствуйте! Интересует изделие "${item.name}" (серия ${item.series}, ${item.size}). Подскажите цену и сроки.`);
  document.getElementById('modal-wa').href = `https://wa.me/79503208844?text=${waText}`;

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal') && !e.target.classList.contains('modal__close')) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleCatalogMenu() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Клик "Все изделия"
document.querySelector('[data-cat="all"]').addEventListener('click', e => {
  e.preventDefault();
  currentCat = 'all';
  currentSeries = '';
  document.querySelectorAll('.sidebar__link').forEach(l => l.classList.toggle('active', l.dataset.cat === 'all'));
  document.getElementById('cat-title').textContent = 'Все изделия';
  document.getElementById('search').value = '';
  filterCatalog();
});

// Перестраиваем каталог при смене языка
const _origSetLang = typeof setLang === 'function' ? setLang : null;
if (_origSetLang) {
  window.setLang = function(lang) {
    _origSetLang(lang);
    // Пересобираем сайдбар с новыми переводами
    const menu = document.getElementById('sidebar-menu');
    if (menu) {
      // Оставляем первый элемент "Все изделия"
      while (menu.children.length > 1) menu.removeChild(menu.lastChild);
      menu.children[0].querySelector('a').childNodes[0].textContent = getT('cat_all') + ' ';
      buildSidebar();
    }
    // Обновляем заголовок
    const titleEl = document.getElementById('cat-title');
    if (titleEl && currentCat) {
      if (currentCat === 'all') titleEl.textContent = getT('cat_all');
      else titleEl.textContent = getT(SECTION_I18N[currentCat]) || SECTIONS[currentCat];
    }
  };
}

// Init — ждём готовности DOM
function initCatalog() {
  buildSidebar();
  const hash = window.location.hash.replace('#', '');
  if (hash && ['bench','urn','planter','furniture','sport','pavement','bollard'].includes(hash)) {
    setFilter(hash, '');
  } else {
    filterCatalog();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCatalog);
} else {
  initCatalog();
}
