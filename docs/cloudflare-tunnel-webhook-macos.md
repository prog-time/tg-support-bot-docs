# Настройка Telegram Webhook через Cloudflare Tunnel (macOS)

Эта инструкция позволяет быстро пробросить локальный сервер в интернет
с помощью `cloudflared` и подключить Telegram Webhook для разработки
и тестирования бота.

---

::: info Инструкция от сообщества
Способ установки предложен пользователем Telegram-сообщества.
Автор бота для технической поддержки **не проверял** работу данного метода.

Инструкцию подготовил: [@Flatroy](https://github.com/Flatroy)
:::

---

## Требования

- macOS
- Установленный [Homebrew](https://brew.sh/)
- Telegram-бот с токеном
- Локально запущенный проект (например, `http://localhost:8000`)

## Шаг 1 — Установка cloudflared

Откройте терминал и выполните:

```bash
brew install cloudflared
```

Проверьте установку:

```bash
cloudflared --version
```

## Шаг 2 — Запуск локального сервера

Убедитесь, что проект уже запущен локально. Если используете другой порт —
подставьте его в последующих командах вместо `8000`.

## Шаг 3 — Создание публичного туннеля

Запустите туннель:

```bash
cloudflared tunnel --url http://localhost:8000
```

После запуска в терминале появится публичный адрес вида:

```
https://something-random.trycloudflare.com
```

Скопируйте его — он понадобится в следующем шаге.

::: warning
Cloudflare генерирует новый URL при каждом запуске туннеля.
При перезапуске потребуется заново регистрировать webhook.
Для постоянного URL настройте именованный туннель:
`cloudflared tunnel login` + `cloudflared tunnel create`.
:::

## Шаг 4 — Формирование URL вебхука

Возьмите значение `secret_token` из файла `.env`:

```env
TELEGRAM_SECRET_KEY=ваш_секретный_ключ
```

Сформируйте URL вебхука, подставив свой домен и секретный ключ:

```
https://<домен>.trycloudflare.com/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token=<секретный_ключ>
```

## Шаг 5 — Регистрация webhook в Telegram

Откройте в браузере следующий URL, подставив токен бота и URL из шага 4:

```
https://api.telegram.org/bot<ТОКЕН>/setWebhook?url=https://<домен>.trycloudflare.com/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token=<секретный_ключ>
```

При успешной регистрации Telegram API вернёт:

```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

## Шаг 6 — Проверка статуса webhook

```
https://api.telegram.org/bot<ТОКЕН>/getWebhookInfo
```

Ожидаемый ответ:

```json
{
  "ok": true,
  "result": {
    "url": "https://...",
    "pending_update_count": 0
  }
}
```

## Устранение неполадок

Если бот не отвечает на сообщения — проверьте по списку:

- Порт в команде `cloudflared` совпадает с портом локального сервера
- Значение `secret_token` в URL совпадает со значением в `.env`
- Локальный сервер запущен и доступен по `http://localhost:8000`
- Туннель активен — проверьте вывод в терминале
- Посмотрите логи cloudflared на наличие ошибок
