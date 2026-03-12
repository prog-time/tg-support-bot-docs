# Установка бота на хостинг

В данном разделе я расскажу как установить Tg Support Bot
на хостинг без использования docker compose.

::: info
Установка через [docker compose](/docs/installation-on-docker-compose.html)
подразумевает полную настройку проекта, включая сервисы логирования,
мониторинга и базу данных! При установке через хостинг, вам необходимо
будет создать БД самостоятельно и прописать доступы к ней в .env
:::

## Видеоинструкции

<!-- markdownlint-disable MD033 MD013 -->
<div style="display: flex; gap: 12px; margin: 16px 0; flex-wrap: wrap;">
  <a href="https://rutube.ru/video/818c80cef1136db2aa508635b130cb11/"
     target="_blank"
     style="display: inline-block; padding: 8px 16px; background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); border-radius: 20px; font-weight: 500; text-decoration: none;">
    ▶ Rutube
  </a>
  <a href="https://vkvideo.ru/video-141526561_456239135"
     target="_blank"
     style="display: inline-block; padding: 8px 16px; background: var(--vp-button-alt-bg); color: var(--vp-button-alt-text); border-radius: 20px; font-weight: 500; text-decoration: none;">
    ▶ VK Видео
  </a>
</div>
<!-- markdownlint-enable MD033 MD013 -->

::: warning Исправление!
В инструкции я сказал про ключ **secret_key**, но ошибся!
Правильно писать — **secret_token**!
:::

## Клонирование репозитория

Необходимо перейти в директорию проекта и проверить есть ли там файлы:

```bash
ls -A
```

Перед выгрузкой необходимо очистить директорию:

```bash
find . -mindepth 1 -delete
```

Клонируем проект:

```bash
git clone https://github.com/prog-time/tg-support-bot.git .
```

## Создать бота и группу в Telegram

- Создаем нового Telegram-бота через **@BotFather** командой **/newbot**;
- Назначаем имя и юзернейм вашему новому боту;
- Получаем уникальный токен, сохраняем его отдельно;
- Создаем новую приватную Telegram-группу;
- Добавляем туда созданный нами бот с правами администратора;
- Включаем возможность создавать **"темы"** в настройках группы;
- Чтобы получить ID вашей группы, добавьте в нее специальный бот
  (@getMyId или аналогичную утилиту). После получения ID удалите этот
  бот из группы;

## Создание файла .env

Вы можете скопировать файл конфигурации вручную или использую команду:

```bash
cp .env.example .env
```

## Указание доступов в .env

Замените значения переменных на ваши реальные данные
(токены, секретные ключи и прочее).

## Настройка базы данных

После указания доступов к базе данных вам необходимо запустить миграции,
для создания таблиц:

```bash
php artisan migrate
```

## Перенаправление запросов в директорию public

Дальнейшая инструкция может отличаться, в зависимости от хостинга.
Если у вас не получится настроить бота по данной инструкции, то вы
можете прислать текст инструкции технической поддержке хостинга или
написать в наше комьюнити в Telegram группе —
[https://t.me/pt_tg_support](https://t.me/pt_tg_support)

Для настройки проекта вам необходимо сделать следующее:

1. В корне проекта создать файл **.htaccess**
2. В созданный файл прописать код:

   ```apacheconf
   RewriteEngine On
   RewriteRule (.*) public/$1
   ```

3. Проверить! Сейчас запрос должен проходить в **public/index.php**
