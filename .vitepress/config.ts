import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TG Support Bot',
  description: 'Документация для мультиканального бота технической поддержки',
  lang: 'ru-RU',
  base: '/',

  sitemap: {
    hostname: 'https://docs.tg-support-bot.ru',
    transformItems(items) {
      return items.filter(item => !item.url.includes('.en'))
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0088cc' }],
  ],

  themeConfig: {
    logo: { src: '/favicon.ico', width: 24, height: 24 },

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Документация', link: '/docs/getting-started' },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Начало работы',
          collapsed: false,
          items: [
            { text: 'Введение', link: '/docs/getting-started' },
          ],
        },
        {
          text: 'Установка',
          collapsed: false,
          items: [
            { text: 'Установка на хостинг', link: '/docs/installation-on-hosting' },
            { text: 'Установка через Docker Compose', link: '/docs/installation-on-docker-compose' },
          ],
        },
        {
          text: 'Возможности',
          collapsed: false,
          items: [
            { text: 'Интерактивные кнопки', link: '/docs/interactive-buttons' },
          ],
        },
        {
          text: 'Каналы',
          collapsed: false,
          items: [
            { text: 'Подключение Max (VK)', link: '/docs/max-bot' },
            { text: 'Виджет живого чата', link: '/docs/live-chat-widget' },
            { text: 'Подключение группы VK', link: '/docs/vk-group' },
          ],
        },
        {
          text: 'Панель управления',
          collapsed: false,
          items: [
            { text: 'Admin Panel', link: '/docs/admin-panel' },
          ],
        },
        {
          text: 'Сервисы',
          collapsed: false,
          items: [
            { text: 'Настройка Grafana', link: '/docs/grafana-setup' },
            { text: 'Настройка PgAdmin', link: '/docs/pgadmin-setup' },
          ],
        },
        {
          text: 'AI интеграция',
          collapsed: false,
          items: [
            { text: 'Подключение AI-помощника', link: '/docs/ai-integration' },
            { text: 'Подключение DeepSeek', link: '/docs/ai-deepseek' },
            { text: 'Подключение GigaChat', link: '/docs/ai-gigachat' },
            { text: 'Подключение OpenAI', link: '/docs/ai-openai' },
          ],
        },
        {
          text: 'Обслуживание',
          collapsed: false,
          items: [
            { text: 'Обновление проекта', link: '/docs/update' },
            { text: 'Чек-лист проверки', link: '/docs/health-checklist' },
            { text: 'Типичные ошибки', link: '/docs/troubleshooting' },
          ],
        },
        {
          text: 'Разработка',
          collapsed: false,
          items: [
            { text: 'Webhook через Cloudflare Tunnel (macOS)', link: '/docs/cloudflare-tunnel-webhook-macos' },
          ],
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/prog-time/tg-support-bot' },
      { icon: 'telegram', link: 'https://t.me/pt_tg_support' },
    ],

    footer: {
      message: 'Выпущено под лицензией MIT.',
      copyright: '© 2024–2026 TG Support Bot',
    },

    editLink: {
      pattern: 'https://github.com/prog-time/tg-support-bot/edit/main/docs/:path',
      text: 'Редактировать эту страницу на GitHub',
    },

    lastUpdated: {
      text: 'Последнее обновление',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница',
    },

    outline: {
      label: 'Содержание',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск в документации',
          },
          modal: {
            noResultsText: 'Ничего не найдено по запросу',
            resetButtonTitle: 'Сбросить поиск',
            footer: {
              selectText: 'выбрать',
              navigateText: 'перейти',
              closeText: 'закрыть',
            },
          },
        },
      },
    },
  },
})
