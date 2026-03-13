# Чек-лист проверки приложения

Пошаговое руководство для проверки работоспособности бота после установки или
обновления. Пройдите все разделы последовательно.

## 1. Предварительные требования

- [ ] Docker-контейнеры запущены (`docker compose up -d`)
- [ ] Приложение доступно по публичному URL (HTTPS)
- [ ] Переменные окружения настроены в `.env`

### Необходимые переменные окружения

```env
APP_URL=https://your-domain.com

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_SECRET_KEY=your_secret_key
TELEGRAM_GROUP_ID=your_group_id

```

## 2. Настройка Telegram-вебхука

### 2.1. Установка вебхука

Выполните GET-запрос по следующему URL (подставьте свои значения):

```text
https://api.telegram.org/bot{TELEGRAM_TOKEN}/setWebhook?url=https://{ДОМЕН}/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token={СЕКРЕТНЫЙ_КЛЮЧ_ИЗ_ENV}
```

### 2.2. Проверка статуса вебхука

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/getWebhookInfo"
```

Ожидаемый ответ:

```json
{
  "ok": true,
  "result": {
    "url": "https://{ДОМЕН}/api/telegram/bot",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "max_connections": 40
  }
}
```

### 2.3. Чек-лист проверки Telegram

- [ ] `url` соответствует вашему домену
- [ ] `pending_update_count` равен `0` (нет необработанных сообщений)
- [ ] `last_error_date` отсутствует или устарел

## 3. Тестирование работы бота

### 3.1. Telegram

1. Отправка тестового сообщения:
   - [ ] Напишите боту в личные сообщения.
   - [ ] Убедитесь, что сообщение появилось в группе поддержки.

2. Проверка ответа:
   - [ ] Ответьте на сообщение в группе.
   - [ ] Убедитесь, что пользователь получил ответ.

3. Проверка логов:

   ```bash
   docker exec -it pet tail -f storage/logs/laravel.log
   ```

## 4. Диагностика проблем

### 4.1. Telegram не получает сообщения

Проверьте статус вебхука:

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/getWebhookInfo"
```

Сбросьте вебхук:

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/deleteWebhook"
```

После сброса повторно установите вебхук (шаг 2.1).

### 4.2. Ошибки SSL-сертификата

- [ ] Проверьте, что сертификат валидный (не самоподписанный)
- [ ] Проверьте цепочку сертификатов
- [ ] URL должен быть HTTPS

### 4.3. Проверка доступности эндпоинта

```bash
curl -X POST https://{ДОМЕН}/api/telegram/bot \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### 4.4. Проверка очередей

Запустить одну задачу из очереди:

```bash
docker exec -it pet php artisan queue:work --once
```

Просмотреть неудачные задачи:

```bash
docker exec -it pet php artisan queue:failed
```

## 5. Полезные команды

| Команда | Описание |
| --- | --- |
| `php artisan queue:work` | Запустить обработчик очередей |
| `php artisan queue:failed` | Показать неудачные задачи |
| `php artisan queue:retry all` | Повторить все неудачные задачи |
| `php artisan config:cache` | Кэшировать конфигурацию |
| `php artisan route:list` | Список всех маршрутов |

## 6. Финальный чек-лист

### Telegram

- [ ] Вебхук установлен и активен
- [ ] Бот отвечает на `/start`
- [ ] Сообщения пересылаются в группу
- [ ] Ответы доставляются пользователю
- [ ] Логи без ошибок

### Инфраструктура

- [ ] SSL-сертификат валидный
- [ ] Очереди работают
- [ ] Логирование настроено
- [ ] Мониторинг ошибок активен
