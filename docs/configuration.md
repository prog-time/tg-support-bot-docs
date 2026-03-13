# Конфигурация

TG Support Bot настраивается через файл `.env` в корне проекта.
При первом запуске скопируйте шаблон:

```bash
cp .env.example .env
```

Файл `.env` использует стандартный формат `KEY=VALUE`.
Строки, начинающиеся с `#`, являются комментариями.

:::tip Новые переменные после обновления
После каждого обновления сравните `.env.example` с вашим `.env` —
в новом релизе могут появиться новые переменные.
Подробнее: [Обновление проекта](/docs/update).
:::

## Приложение

| Параметр | Описание | Пример |
| --- | --- | --- |
| `APP_NAME` | Название приложения; используется в виджете живого чата | `TG Support Bot` |
| `APP_URL` | Публичный URL приложения | `https://your-domain.com` |
| `APP_KEY` | Ключ шифрования Laravel. Генерируется командой `php artisan key:generate` | `base64:...` |
| `MAIN_DOMAIN` | Основной домен, используемый ботом и всеми его сервисами | `your-domain.com` |

:::warning APP_KEY обязателен
Если `APP_KEY` не задан, Laravel не запустится. Сгенерируйте его командой:

```bash
php artisan key:generate
```

:::

## Telegram

:::tip Подробнее о настройке
Пошаговая установка вебхука описана в разделе
[Установка через Docker Compose](/docs/installation-on-docker-compose).
Для локальной разработки — [Webhook через Cloudflare Tunnel (macOS)](/docs/cloudflare-tunnel-webhook-macos).
:::

| Параметр | Описание | Пример |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | Токен основного Telegram-бота, полученный от [@BotFather](https://t.me/BotFather) | `1234567890:ABCdef...` |
| `TELEGRAM_SECRET_KEY` | Секретный ключ для верификации вебхук-запросов от Telegram (параметр `secret_token`) | `your-random-secret` |
| `TELEGRAM_GROUP_ID` | ID приватной Telegram-группы с топиками, куда пересылаются обращения | `-1001234567890` |
| `TELEGRAM_AI_BOT_TOKEN` | Токен отдельного бота, от имени которого AI-помощник отправляет ответы | `9876543210:XYZabc...` |

:::info Регистрация вебхука
После указания `TELEGRAM_BOT_TOKEN` и `TELEGRAM_SECRET_KEY` зарегистрируйте вебхук,
открыв в браузере:

```text
https://api.telegram.org/bot{ТОКЕН}/setWebhook?url=https://{ДОМЕН}/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token={СЕКРЕТНЫЙ_КЛЮЧ}
```

:::

## VK (ВКонтакте)

:::tip Подробнее о настройке
Полная инструкция по подключению группы VK: [Подключение группы VK](/docs/vk-group).
:::

| Параметр | Описание | Пример |
| --- | --- | --- |
| `VK_TOKEN` | Ключ доступа группы ВКонтакте | `vk1.a.AbCdEf...` |
| `VK_CONFIRM_CODE` | Строка подтверждения из настроек Callback API ВКонтакте | `a1b2c3d4` |
| `VK_SECRET_CODE` | Произвольный секретный ключ для верификации запросов от ВКонтакте | `my-vk-secret` |

## Max

:::tip Подробнее о настройке
Полная инструкция по подключению Max: [Подключение Max](/docs/max-bot).
:::

| Параметр | Описание | Пример |
| --- | --- | --- |
| `MAX_TOKEN` | Токен бота платформы Max | `your_max_bot_token` |
| `MAX_SECRET_KEY` | Произвольная строка для верификации вебхук-запросов от Max (передаётся в заголовке `X-Max-Bot-Api-Secret`) | `my-max-secret` |

## База данных

Значения из `.env` используются при настройке подключения в PgAdmin.

| Параметр | Описание | Пример |
| --- | --- | --- |
| `PGADMIN_EMAIL` | Email для входа в веб-интерфейс PgAdmin | `admin@example.com` |
| `PGADMIN_PASSWORD` | Пароль для входа в веб-интерфейс PgAdmin | `strongpassword` |

:::tip Настройка PgAdmin
Подробная инструкция по подключению к базе данных через PgAdmin:
[Настройка PgAdmin](/docs/pgadmin-setup).
:::

## AI-помощник

:::tip Подробнее о настройке
Базовая настройка AI-помощника: [Подключение AI-помощника](/docs/ai-integration).
Инструкции по конкретным провайдерам:
[OpenAI](/docs/ai-openai) · [DeepSeek](/docs/ai-deepseek) · [GigaChat](/docs/ai-gigachat).
:::

### Общие параметры

| Параметр | Описание | Пример |
| --- | --- | --- |
| `AI_ENABLED` | Включает (`true`) или отключает (`false`) AI-помощника | `true` |
| `AI_DEFAULT_PROVIDER` | Провайдер, используемый по умолчанию | `openai`, `deepseek`, `gigachat` |

### OpenAI

| Параметр | Описание | Пример |
| --- | --- | --- |
| `OPENAI_API_KEY` | API-ключ OpenAI | `sk-...` |
| `OPENAI_BASE_URL` | Базовый URL API | `https://api.openai.com/v1` |
| `OPENAI_MODEL` | Используемая модель | `gpt-4o-mini` |
| `OPENAI_MAX_TOKENS` | Максимальное количество токенов в одном ответе | `2000` |
| `OPENAI_TEMPERATURE` | Степень креативности: `0` — строго, `1` — творчески | `0.7` |

### DeepSeek

| Параметр | Описание | Пример |
| --- | --- | --- |
| `DEEPSEEK_CLIENT_SECRET` | API-ключ DeepSeek | `sk-...` |
| `DEEPSEEK_BASE_URL` | Базовый URL API | `https://api.deepseek.com/chat/completions` |
| `DEEPSEEK_MODEL` | Используемая модель | `deepseek-chat` |
| `DEEPSEEK_MAX_TOKENS` | Максимальное количество токенов в одном ответе | `1000` |
| `DEEPSEEK_TEMPERATURE` | Степень креативности: `0` — строго, `1` — творчески | `0.7` |

### GigaChat

| Параметр | Описание | Пример |
| --- | --- | --- |
| `GIGACHAT_CLIENT_SECRET` | Authorization key из личного кабинета GigaChat | `ваш_authorization_key` |
| `GIGACHAT_BASE_URL` | Базовый URL API | `https://gigachat.devices.sberbank.ru/api/v1` |
| `GIGACHAT_CLIENT_ID` | Client ID из личного кабинета GigaChat | `ваш_client_id` |
| `GIGACHAT_MODEL` | Используемая модель | `GigaChat-2-Max` |
| `GIGACHAT_MAX_TOKENS` | Максимальное количество токенов в одном ответе | `1000` |
| `GIGACHAT_TEMPERATURE` | Степень креативности: `0` — строго, `1` — творчески | `0.7` |
| `GIGACHAT_CERT_PATH` | Путь к сертификату Минцифры относительно директории `storage` | `certs/russian_trusted_root_ca_pem.crt` |

:::info Сертификат GigaChat
GigaChat требует сертификат безопасности от Минцифры России.
Поместите файл `.crt` в директорию `storage/certs`.
Подробнее: [Подключение GigaChat](/docs/ai-gigachat).
:::

## Виджет живого чата

:::tip Подробнее о настройке
Полная инструкция по подключению виджета: [Виджет живого чата](/docs/live-chat-widget).
:::

| Параметр | Описание | Пример |
| --- | --- | --- |
| `API_TOKEN` | API-ключ, сгенерированный для источника `live_chat` | `токен из artisan app:generate-token` |
| `ALLOWED_ORIGINS` | Домены, на которых размещён виджет (несколько через запятую) | `https://example.com,https://shop.example.com` |
| `VITE_APP_NAME` | Имя приложения для сборки Vite; обычно ссылается на `$APP_NAME` | `"${APP_NAME}"` |

:::warning Только Docker Compose
Виджет живого чата доступен только при развёртывании через Docker Compose,
так как требует Node.js в отдельном контейнере.
:::

## Мониторинг

### Grafana

:::tip Настройка Grafana
Подробная инструкция: [Настройка Grafana](/docs/grafana-setup).
Grafana доступна по адресу `https://grafana.{ваш_домен}`.
:::

| Параметр | Описание | Пример |
| --- | --- | --- |
| `GRAFANA_USER` | Имя пользователя для входа в Grafana | `admin` |
| `GRAFANA_PASSWORD` | Пароль для входа в Grafana | `strongpassword` |

## Интерфейс менеджера

| Параметр | Описание | Пример |
| --- | --- | --- |
| `MANAGER_INTERFACE` | Режим работы интерфейса менеджера: `admin_panel` — ответы через веб-панель `/admin`; `telegram_group` — ответы через Telegram-группу | `admin_panel` |

:::info Подробнее о режимах
Описание отличий режимов `admin_panel` и `telegram_group`: [Admin Panel](/docs/admin-panel).
:::
