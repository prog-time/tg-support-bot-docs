# Типичные ошибки

На этой странице собраны ошибки, с которыми чаще всего сталкиваются при установке
и эксплуатации TG Support Bot, — с описанием причин и конкретными шагами для
их устранения.

## Слетают настройки хука

Если после подключения хука, через пару дней перестаёт работать бот, 
возможно проблемы связаны с блокировками IP адреса VPS со стороны Telegram.

Попробуйте сделать следующее:
1. Удалить существующие хуки
```text
https://api.telegram.org/bot{{TELEGRAM_TOKEN}}/deleteWebhook?drop_pending_updates=true
```
2. Подключить hook с указанием IP адреса VPS. Пример полного запроса.
```text
https://api.telegram.org/bot{{TELEGRAM_TOKEN}}/setWebhook?url={{TELEGRAM_WEBHOOK}}&max_connections=45&drop_pending_updates=true&secret_token={{TELEGRAM_SECRET_KEY}}&ip_address=111.222.33.44
```

## Не удаётся настроить SSL-сертификат

Certbot или другой ACME-клиент не может получить сертификат, потому что порт 80
занят другим процессом (обычно системным Nginx).

Проверьте, что занимает порт 80:

```bash
sudo netstat -ltnp | grep -w ':80'
```

Если порт удерживает системный Nginx, остановите его:

```bash
sudo systemctl stop nginx
```

После этого повторно запустите выпуск сертификата.

## Grafana не запускается из-за ошибки прав доступа

Контейнер `grafana` завершается с ошибкой прав на запись в директорию данных.

Вывод `docker compose logs grafana`:

```text
grafana  | GF_PATHS_DATA='/var/lib/grafana' is not writable.
grafana  | You may have issues with file permissions, more information here: http://docs.grafana.org/installation/docker/#migrate-to-v51-or-later
grafana  | mkdir: can't create directory '/var/lib/grafana/plugins': Permission denied
```

Назначьте владельцем директории пользователя с UID `472` (внутренний пользователь Grafana):

```bash
sudo chown -R 472:472 ./docker/grafana
```

## Ошибка: Failed to open stream: Permission denied

Laravel не может записать в файл лога из-за недостаточных прав доступа к директории.

Перейдите в корень проекта и исправьте права:

```bash
sudo chown -R 775 storage/logs/laravel.log
```

## Ошибка: require(autoload.php): Failed to open stream

Зависимости Composer не установлены — директория `vendor` отсутствует.

Вывод из лога контейнера:

```text
laravel_queue  | PHP Warning:  require(/var/www/vendor/autoload.php): Failed to open stream: No such file or directory in /var/www/artisan on line 10
laravel_queue  | PHP Fatal error:  Uncaught Error: Failed opening required '/var/www/vendor/autoload.php' (include_path='.:/usr/local/lib/php') in /var/www/artisan on line 10
```

Установите или обновите зависимости:

```bash
composer update
```

## Ошибка: MissingAppKeyException

Переменная `APP_KEY` в `.env` не задана или пуста — Laravel не может выполнять
шифрование.

Сгенерируйте новый ключ приложения:

```bash
php artisan key:generate
```

## Ошибка: file_put_contents

Владелец директории не совпадает с пользователем, от которого работает веб-сервер,
поэтому PHP не может записать файл.

<!-- markdownlint-disable MD033 -->
<img width="1043" height="921" alt="Скриншот ошибки file_put_contents" src="/images/troubleshooting/file-put-contents-error.png" />
<!-- markdownlint-enable MD033 -->

Перейдите в директорию, где находится корневая папка проекта:

```bash
cd /путь/к/родительской/директории
```

Рекурсивно передайте владение директорией пользователю `www-data`:

```bash
sudo chown -R www-data:www-data название_директории
```

## Контейнер базы данных PgSQL не запускается

При запуске через `docker compose` контейнер `pgdb` завершается с ошибкой
несовместимости формата данных — обычно после обновления образа PostgreSQL.

Вывод `docker compose logs pgdb`:

```text
Error: in 18+, these Docker images are configured to store database data in a
       format which is compatible with "pg_ctlcluster"...
       Counter to that, there appears to be PostgreSQL data in:
         /var/lib/postgresql/data (unused mount/volume)
       This is usually the result of upgrading the Docker image without
       upgrading the underlying database using "pg_upgrade"...
```

Подробное решение описано в [обсуждении на GitHub](https://github.com/prog-time/tg-support-bot/discussions/55).
