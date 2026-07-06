# 99 МПа — портфолио проектов

Сайт-портфолио архитектурного бюро «99 МПа»: изделия из высокопрочного
архитектурного бетона — арки, малые формы и благоустройство городских
пространств. Дополнение к основному сайту [99mpa.com](https://99mpa.com).

Статический сайт без внешних зависимостей: все стили, шрифты (с кириллицей) и
фотографии лежат в репозитории.

## Страницы

| Файл | Раздел |
|------|--------|
| `index.html` | Главная: о компании + проекты |
| `bolgar.html` | Кейс: Болгар |
| `kamal-square.html` | Кейс: Сквер у театра Камала |
| `umai-park.html` | Кейс: Парк Умай |

## Структура

- `assets/css/styles.css` — Tailwind, скомпилированный в статический CSS.
- `assets/css/fonts.css` + `assets/fonts/` — self-hosted Inter и JetBrains Mono (латиница + кириллица).
- `assets/img/{bolgar,kamal,umai}/` — фотографии проектов.

## Публикация (GitHub Pages)

**Settings → Pages → Deploy from a branch → `main` / `root`**.
Сайт будет доступен по адресу `https://djhamkzn.github.io/99mpa/`.
Файл `.nojekyll` отключает обработку Jekyll.

Для домена `99mpa.ru` — поле **Custom domain** в настройках Pages + DNS у регистратора.

## Контакты

Хамеев Артур · [hameevartur@mail.ru](mailto:hameevartur@mail.ru) · +7 917 863-66-03
