import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TG Support Bot',
  base: '/',
  srcExclude: ['**/node_modules/**', 'tasks/**'],

  sitemap: {
    hostname: 'https://docs.tg-support-bot.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0088cc' }],
  ],

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru-RU',
      description: 'Документация для мультиканального бота технической поддержки',

      themeConfig: {
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
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/prog-time/tg-support-bot-docs/edit/main/:path',
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

        footer: {
          message: 'Выпущено под лицензией MIT. Сайт разработал <a href="https://lyashchuk.pro/" target="_blank" rel="noopener noreferrer">Илья Лящук</a>.',
          copyright: '© 2024–2026 TG Support Bot',
        },
      },
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Documentation for the multi-channel customer support bot',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Documentation', link: '/en/docs/getting-started' },
        ],

        sidebar: {
          '/en/docs/': [
            {
              text: 'Getting Started',
              collapsed: false,
              items: [
                { text: 'Introduction', link: '/en/docs/getting-started' },
              ],
            },
            {
              text: 'Installation',
              collapsed: false,
              items: [
                { text: 'Installation on a Hosting Server', link: '/en/docs/installation-on-hosting' },
                { text: 'Installation via Docker Compose', link: '/en/docs/installation-on-docker-compose' },
              ],
            },
            {
              text: 'Features',
              collapsed: false,
              items: [
                { text: 'Interactive Buttons', link: '/en/docs/interactive-buttons' },
              ],
            },
            {
              text: 'Channels',
              collapsed: false,
              items: [
                { text: 'Connecting Max (VK)', link: '/en/docs/max-bot' },
                { text: 'Live Chat Widget', link: '/en/docs/live-chat-widget' },
                { text: 'Connecting a VK Group', link: '/en/docs/vk-group' },
              ],
            },
            {
              text: 'Admin Panel',
              collapsed: false,
              items: [
                { text: 'Admin Panel', link: '/en/docs/admin-panel' },
              ],
            },
            {
              text: 'Services',
              collapsed: false,
              items: [
                { text: 'Grafana Setup', link: '/en/docs/grafana-setup' },
                { text: 'PgAdmin Setup', link: '/en/docs/pgadmin-setup' },
              ],
            },
            {
              text: 'AI Integration',
              collapsed: false,
              items: [
                { text: 'Connecting AI Assistant', link: '/en/docs/ai-integration' },
                { text: 'Connecting DeepSeek', link: '/en/docs/ai-deepseek' },
                { text: 'Connecting GigaChat', link: '/en/docs/ai-gigachat' },
                { text: 'Connecting OpenAI', link: '/en/docs/ai-openai' },
              ],
            },
            {
              text: 'Maintenance',
              collapsed: false,
              items: [
                { text: 'Updating the Project', link: '/en/docs/update' },
                { text: 'Health Checklist', link: '/en/docs/health-checklist' },
                { text: 'Troubleshooting', link: '/en/docs/troubleshooting' },
              ],
            },
            {
              text: 'Development',
              collapsed: false,
              items: [
                { text: 'Webhook via Cloudflare Tunnel (macOS)', link: '/en/docs/cloudflare-tunnel-webhook-macos' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/prog-time/tg-support-bot-docs/edit/main/:path',
          text: 'Edit this page on GitHub',
        },

        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium',
          },
        },

        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },

        outline: {
          label: 'On this page',
        },

        footer: {
          message: 'Released under the MIT License. Site developed by <a href="https://lyashchuk.pro/" target="_blank" rel="noopener noreferrer">Ilya Lyashchuk</a>.',
          copyright: '© 2024–2026 TG Support Bot',
        },
      },
    },
  },

  themeConfig: {
    logo: { src: '/favicon.ico', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/prog-time/tg-support-bot' },
      { icon: 'telegram', link: 'https://t.me/pt_tg_support' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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
    },
  },
})
