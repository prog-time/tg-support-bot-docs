# Task-01: Инициализация VitePress проекта документации

## Описание

Создать документационный сайт для **Telegram Support Bot** на базе VitePress.
Весь контент страниц — на русском языке.

## Требования

### 1. Инициализация проекта
- Создать `package.json` с VitePress в зависимостях
- Настроить скрипты: `dev`, `build`, `preview`
- Установить зависимости (node_modules)

### 2. Конфигурация VitePress (`.vitepress/config.ts`)
- `title`: "Telegram Support Bot"
- `description`: описание проекта на русском
- `lang`: "ru-RU"
- Настроить `nav` (верхняя навигация)
- Настроить `sidebar` (боковая панель)
- Настроить `socialLinks` (GitHub и т.п.)
- Настроить `sitemap` (base URL: https://docs.tg-support-bot.ru)

### 3. Страницы документации

#### `index.md` — Главная страница
- Hero-секция с заголовком, описанием и кнопками действий
- Секция с ключевыми возможностями (features)
- Ссылки на "Начало работы" и "Конфигурацию"

#### `docs/getting-started.md` — Начало работы
- Системные требования
- Установка и первый запуск
- Базовая конфигурация
- Примеры команд и кода

#### `docs/configuration.md` — Конфигурация
- Описание всех параметров конфигурации
- Примеры конфигурационных файлов
- Секции: основные настройки, настройки Telegram, настройки базы данных

## Структура файлов

```
/
├── .vitepress/
│   └── config.ts
├── docs/
│   ├── getting-started.md
│   └── configuration.md
├── index.md
├── package.json
└── tasks/
    └── task-01-vitepress-init.md
```

## Критерии приёмки

- [ ] `package.json` содержит `vitepress` в devDependencies
- [ ] `.vitepress/config.ts` настроен с title, description, nav, sidebar
- [ ] `index.md` содержит hero-секцию и features
- [ ] `docs/getting-started.md` содержит содержательный контент на русском
- [ ] `docs/configuration.md` содержит содержательный контент на русском
- [ ] Sidebar содержит ссылки на все страницы документации
- [ ] Nav-бар содержит ссылки на основные разделы
- [ ] Sitemap настроен с корректным base URL

## Приоритет: Высокий
## Статус: TODO
