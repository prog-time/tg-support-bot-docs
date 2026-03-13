# Подключение Max (VK)

Max — мессенджер экосистемы VK/Mail.ru. Модуль `app/Modules/Max/` принимает
входящие сообщения через вебхук и пересылает их в Telegram-группу поддержки.
Ответы менеджеров доставляются пользователю обратно в Max.

Эндпоинт вебхука: `POST /api/max/bot`

## 1. Создание бота в Max

1. Перейдите на платформу и авторизуйтесь на [business.max.ru](https://business.max.ru/).

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Авторизация на платформе Max" src="/images/max-bot/step-1-signin.png" />
<!-- markdownlint-enable MD033 -->

2. Заполните форму для создания нового бота в Max.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Форма создания бота в Max" src="/images/max-bot/step-2-create-bot.png" />
<!-- markdownlint-enable MD033 -->

3. После создания бота скопируйте полученный токен — он понадобится для `MAX_TOKEN`.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Токен бота в Max" src="/images/max-bot/step-3-bot-token.png" />
<!-- markdownlint-enable MD033 -->

## 2. Настройка переменных окружения

Откройте `.env` на сервере и добавьте:

```env
MAX_TOKEN="ваш_токен_бота"
MAX_SECRET_KEY="придумайте_произвольный_секретный_ключ"
```

`MAX_SECRET_KEY` — произвольная строка для верификации запросов от Max.
Max будет передавать её в заголовке `X-Max-Bot-Api-Secret` при каждом
вебхук-запросе.

Перезапустите контейнер, чтобы конфиг применился:

```bash
docker compose restart app
```

## 3. Регистрация вебхука

Max не имеет веб-интерфейса для регистрации вебхука. Регистрация выполняется
через API с помощью токена бота.

### 3.1. Через curl

```bash
curl -X POST "https://platform-api.max.ru/subscriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://ВАШ_ДОМЕН/api/max/bot",
    "update_types": ["message_created", "bot_started"],
    "secret": "ВАШ_MAX_SECRET_KEY"
  }'
```

Ожидаемый ответ:

```json
{ "success": true }
```

### 3.2. Допустимые порты для вебхука

Max принимает вебхуки только на следующих портах:

| Порты          |
| -------------- |
| 80, 443        |
| 8080, 8443     |
| 16384–32383    |

## 4. Проверка регистрации вебхука

```bash
curl "https://platform-api.max.ru/subscriptions" \
  -H "Authorization: Bearer ВАШ_MAX_TOKEN"
```

Ожидаемый ответ:

```json
{
  "subscriptions": [
    {
      "url": "https://ваш-домен.com/api/max/bot",
      "time": 1700000000000,
      "update_types": ["message_created"]
    }
  ]
}
```

## 5. Полный чек-лист подключения

- [ ] Бот создан, токен получен
- [ ] `MAX_TOKEN` задан в `.env`
- [ ] `MAX_SECRET_KEY` задан в `.env`
- [ ] Контейнер перезапущен (`docker compose restart app`)
- [ ] Вебхук зарегистрирован через API (шаг 3)
- [ ] Регистрация вебхука подтверждена (шаг 4)
- [ ] Тестовое сообщение от пользователя Max появляется в Telegram-группе
- [ ] Ответ менеджера из Telegram доставляется в Max

## 6. Диагностика проблем

### 6.1. Вебхук не регистрируется

- Убедитесь, что домен доступен извне и работает по HTTPS.
- Проверьте, что порт входит в список допустимых (80, 443, 8080, 8443, 16384–32383).
- Проверьте корректность токена в `MAX_TOKEN`.

### 6.2. Эндпоинт возвращает 403

- Убедитесь, что `MAX_SECRET_KEY` в `.env` совпадает со значением `secret`
  при регистрации вебхука.
- Убедитесь, что заголовок `X-Max-Bot-Api-Secret` передаётся с правильным значением.

### 6.3. Сообщение не появляется в Telegram-группе

Проверьте логи приложения:

```bash
docker exec -it pet tail -f storage/logs/laravel.log
```

Убедитесь, что очередь работает:

```bash
docker exec -it pet php artisan queue:work
```

### 6.4. Удаление вебхука

```bash
curl -X DELETE "https://platform-api.max.ru/subscriptions" \
  -H "Authorization: Bearer ВАШ_MAX_TOKEN"
```

После сброса повторно зарегистрируйте вебхук (шаг 3).

## Ссылки

- [Max PHP SDK](https://github.com/prog-time/max-php-sdk)
- [Max Bot API — документация для разработчиков](https://dev.max.ru)
