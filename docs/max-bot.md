# Подключение Max

Max — мессенджер экосистемы VK/Mail.ru. Модуль принимает
входящие сообщения через вебхук.
Ответы менеджеров доставляются пользователю обратно в Max.

## 1. Создание бота в Max

1. Перейдите на платформу и авторизуйтесь на [business.max.ru](https://business.max.ru/).

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Авторизация на платформе Max" src="/images/max-bot/step-1-signin.png" />
<!-- markdownlint-enable MD033 -->

2. Заполните форму для создания нового бота в Max.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Форма создания бота в Max" src="/images/max-bot/step-2-create-bot.png" />
<!-- markdownlint-enable MD033 -->

3. После создания бота скопируйте полученный токен.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Токен бота в Max" src="/images/max-bot/step-3-bot-token.png" />
<!-- markdownlint-enable MD033 -->

## 2. Настройка интеграции

1. Перейдите в раздел **"Настройки" -> "Интеграции"**.
2. Нажмите на карточку **"MAX"**.
3. В поле "Токен" укажите токен полученный при создании бота в MAX.
4. В поле "Секретный ключ Webhook" укажите строку для защиты вашей интеграции. Случайная строка из 10-12 символов.
