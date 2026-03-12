import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Telegram Support Bot',
  description: 'Документация для Telegram бота поддержки клиентов',
  lang: 'ru-RU',
  base: '/',

  sitemap: {
    hostname: 'https://docs.tg-support-bot.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0088cc' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Документация', link: '/docs/getting-started' },
      { text: 'Конфигурация', link: '/docs/configuration' },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Начало работы',
          collapsed: false,
          items: [
            { text: 'Введение', link: '/docs/getting-started' },
            { text: 'Конфигурация', link: '/docs/configuration' },
          ],
        },
        {
          text: 'Справочник',
          collapsed: false,
          items: [
            { text: 'Параметры конфигурации', link: '/docs/configuration#основные-параметры' },
            { text: 'Настройки Telegram', link: '/docs/configuration#настройки-telegram' },
            { text: 'Настройки базы данных', link: '/docs/configuration#настройки-базы-данных' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/tg-support-bot' },
      { icon: 'telegram', link: 'https://t.me/tg_support_bot' },
    ],

    footer: {
      message: 'Выпущено под лицензией MIT.',
      copyright: '© 2024–2026 Telegram Support Bot',
    },

    editLink: {
      pattern: 'https://github.com/your-org/tg-support-bot/edit/main/docs/:path',
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
