# Конфигурация

Telegram Support Bot настраивается через файл `.env` в корне проекта или через переменные окружения на вашем сервере. Все параметры сгруппированы по разделам.

## Файл конфигурации

При первом запуске скопируйте шаблон:

```bash
cp .env.example .env
```

Файл `.env` использует стандартный формат `KEY=VALUE`. Строки, начинающиеся с `#`, являются комментариями.

::: tip Приоритет настроек
Переменные окружения системы имеют приоритет над значениями из файла `.env`. Это позволяет переопределять настройки в Docker/Kubernetes без изменения файла.
:::

## Основные параметры

| Параметр | Описание | По умолчанию | Пример |
|---|---|---|---|
| `BOT_TOKEN` | Токен Telegram-бота (обязательно) | — | `1234567890:ABCdef...` |
| `BOT_NAME` | Отображаемое имя бота | `Support Bot` | `Служба поддержки` |
| `ADMIN_CHAT_ID` | ID Telegram-чата администратора | — | `123456789` |
| `LOG_LEVEL` | Уровень логирования | `info` | `debug`, `info`, `warn`, `error` |
| `NODE_ENV` | Режим работы | `production` | `development`, `production` |
| `PORT` | HTTP-порт приложения | `3000` | `8080` |
| `SECRET_KEY` | Секретный ключ для подписи сессий | — | `your-random-secret` |

```dotenv
# Основные параметры
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
BOT_NAME=Служба поддержки
ADMIN_CHAT_ID=123456789
LOG_LEVEL=info
NODE_ENV=production
PORT=3000
SECRET_KEY=super-secret-key-change-me
```

## Настройки Telegram

Определяют способ получения обновлений от Telegram: polling (для разработки) или webhook (для продакшна).

| Параметр | Описание | По умолчанию | Пример |
|---|---|---|---|
| `TELEGRAM_MODE` | Режим получения обновлений | `polling` | `polling`, `webhook` |
| `WEBHOOK_URL` | Публичный URL для webhook | — | `https://bot.example.com` |
| `WEBHOOK_PORT` | Порт для приёма webhook-запросов | `8443` | `443`, `8443` |
| `WEBHOOK_PATH` | Путь для webhook endpoint | `/webhook` | `/tg-webhook` |
| `POLLING_INTERVAL` | Интервал опроса в мс (polling-режим) | `1000` | `500` |
| `POLLING_TIMEOUT` | Таймаут long-polling в секундах | `30` | `60` |

```dotenv
# Webhook (продакшн)
TELEGRAM_MODE=webhook
WEBHOOK_URL=https://support.your-domain.com
WEBHOOK_PORT=8443
WEBHOOK_PATH=/webhook

# Polling (разработка)
# TELEGRAM_MODE=polling
# POLLING_INTERVAL=1000
# POLLING_TIMEOUT=30
```

::: warning Webhook и SSL
Telegram требует HTTPS для webhook. Убедитесь, что у вашего домена есть действующий SSL-сертификат. Поддерживаются порты: 443, 80, 88, 8443.
:::

## Настройки базы данных

Бот поддерживает PostgreSQL (рекомендуется для продакшна) и SQLite (для разработки).

| Параметр | Описание | По умолчанию | Пример |
|---|---|---|---|
| `DB_TYPE` | Тип базы данных | `sqlite` | `sqlite`, `postgres` |
| `DB_PATH` | Путь к файлу SQLite | `./data/support.db` | `/var/data/bot.db` |
| `DB_HOST` | Хост PostgreSQL | `localhost` | `db.example.com` |
| `DB_PORT` | Порт PostgreSQL | `5432` | `5432` |
| `DB_NAME` | Имя базы данных | `support_bot` | `tg_support` |
| `DB_USER` | Пользователь БД | `postgres` | `bot_user` |
| `DB_PASSWORD` | Пароль пользователя БД | — | `strong-password` |
| `DB_POOL_MIN` | Минимум соединений в пуле | `2` | `2` |
| `DB_POOL_MAX` | Максимум соединений в пуле | `10` | `20` |

### PostgreSQL (продакшн)

```dotenv
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=support_bot
DB_USER=bot_user
DB_PASSWORD=your-secure-password
DB_POOL_MIN=2
DB_POOL_MAX=10
```

### SQLite (разработка)

```dotenv
DB_TYPE=sqlite
DB_PATH=./data/support.db
```

## Настройки уведомлений

Управляют тем, в каких случаях и куда отправляются уведомления операторам и администраторам.

| Параметр | Описание | По умолчанию | Пример |
|---|---|---|---|
| `NOTIFY_ON_NEW_TICKET` | Уведомлять при новом тикете | `true` | `true`, `false` |
| `NOTIFY_ON_RESOLVE` | Уведомлять при закрытии тикета | `true` | `true`, `false` |
| `NOTIFY_ON_REASSIGN` | Уведомлять при переназначении | `false` | `true`, `false` |
| `NOTIFY_CHAT_ID` | ID чата для уведомлений (группа/канал) | — | `-1001234567890` |
| `NOTIFY_MENTION_OPERATOR` | Упоминать оператора в уведомлении | `true` | `true`, `false` |
| `NOTIFY_QUIET_HOURS_START` | Начало тихого режима (HH:MM) | — | `22:00` |
| `NOTIFY_QUIET_HOURS_END` | Конец тихого режима (HH:MM) | — | `08:00` |

```dotenv
# Настройки уведомлений
NOTIFY_ON_NEW_TICKET=true
NOTIFY_ON_RESOLVE=true
NOTIFY_ON_REASSIGN=false
NOTIFY_CHAT_ID=-1001234567890
NOTIFY_MENTION_OPERATOR=true

# Тихий режим — уведомления не отправляются с 22:00 до 08:00
NOTIFY_QUIET_HOURS_START=22:00
NOTIFY_QUIET_HOURS_END=08:00
```

## Полный пример .env

```dotenv
# =====================
# Основные параметры
# =====================
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
BOT_NAME=Служба поддержки
ADMIN_CHAT_ID=123456789
LOG_LEVEL=info
NODE_ENV=production
PORT=3000
SECRET_KEY=change-this-to-random-string

# =====================
# Telegram
# =====================
TELEGRAM_MODE=webhook
WEBHOOK_URL=https://support.your-domain.com
WEBHOOK_PORT=8443
WEBHOOK_PATH=/webhook

# =====================
# База данных
# =====================
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=support_bot
DB_USER=bot_user
DB_PASSWORD=your-secure-password

# =====================
# Уведомления
# =====================
NOTIFY_ON_NEW_TICKET=true
NOTIFY_ON_RESOLVE=true
NOTIFY_CHAT_ID=-1001234567890
NOTIFY_QUIET_HOURS_START=22:00
NOTIFY_QUIET_HOURS_END=08:00
```

## Валидация конфигурации

Проверьте корректность настроек без запуска бота:

```bash
npm run config:validate
```

Команда выведет список всех параметров, их значения и предупреждения о неправильных или отсутствующих значениях.
