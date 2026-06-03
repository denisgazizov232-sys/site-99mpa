// Единая навигация для всех страниц

const LANG_OPTIONS = [
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
];

function buildLangSwitcher() {
  const switchers = document.querySelectorAll('.lang-switcher');
  switchers.forEach(sw => {
    const currentLang = localStorage.getItem('lang') || 'ru';
    const current = LANG_OPTIONS.find(l => l.code === currentLang) || LANG_OPTIONS[0];

    sw.innerHTML = `
      <button class="lang-switcher__btn" onclick="toggleLangMenu(this)">
        <span>${current.flag}</span>
        <span>${current.code.toUpperCase()}</span>
        <span style="font-size:9px;opacity:0.6">▼</span>
      </button>
      <div class="lang-switcher__dropdown" id="lang-dropdown">
        ${LANG_OPTIONS.map(l => `
          <div class="lang-option ${l.code === currentLang ? 'active' : ''}" onclick="selectLang('${l.code}')">
            <span class="lang-option__flag">${l.flag}</span>
            <span>${l.name}</span>
          </div>
        `).join('')}
      </div>
    `;
  });
}

function toggleLangMenu(btn) {
  const dropdown = document.getElementById('lang-dropdown');
  dropdown.classList.toggle('open');
  // Закрываем при клике вне
  setTimeout(() => {
    document.addEventListener('click', closeLangMenu, { once: true });
  }, 0);
}

function closeLangMenu() {
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

function selectLang(code) {
  closeLangMenu();
  if (typeof setLang === 'function') setLang(code);
  // Обновляем кнопку
  const current = LANG_OPTIONS.find(l => l.code === code);
  const btn = document.querySelector('.lang-switcher__btn');
  if (btn && current) {
    btn.innerHTML = `<span>${current.flag}</span><span>${current.code.toUpperCase()}</span><span style="font-size:9px;opacity:0.6">▼</span>`;
  }
  // Обновляем активный пункт
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.onclick.toString().includes(`'${code}'`));
  });
}

// Мобильное меню
function toggleMenu() {
  let m = document.querySelector('.nav__mobile');
  if (!m) {
    m = document.createElement('div');
    m.className = 'nav__mobile';
    // Берём ссылки из основной навигации
    document.querySelectorAll('.nav__links a').forEach(a => {
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.textContent;
      if (a.dataset.i18n) link.dataset.i18n = a.dataset.i18n;
      link.onclick = () => m.classList.remove('open');
      m.appendChild(link);
    });
    document.body.appendChild(m);
  }
  m.classList.toggle('open');
}

// Nav scroll — если nav уже имеет класс scrolled в HTML, не убираем его при прокрутке вверх
const navEl = document.getElementById('nav');
if (navEl) {
  const alwaysScrolled = navEl.classList.contains('scrolled');
  if (!alwaysScrolled) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 60);
    });
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', buildLangSwitcher);
