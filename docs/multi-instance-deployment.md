# Развёртывание нескольких копий бота на одном сервере

Системный nginx на хосте + N изолированных Docker-стэков по адресам `/home/botN`. Каждая копия — свой Telegram-токен, домен, БД.

## Установка системных пакетов (один раз)

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker

echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
echo 'fs.inotify.max_user_instances=512'  | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Таблица портов

| Бот | FPM | Postgres |
|-----|-----|----------|
| bot1 | 9001 | 5433 |
| bot2 | 9002 | 5434 |
| bot3 | 9003 | 5435 |

Все порты бинятся только на `127.0.0.1`.

## Развёртывание копии botN

Подставляй `N` = `1`, `2`, `3`, …

### 1. Клонирование

```bash
sudo git clone <URL_РЕПО> /home/botN
sudo chown -R www-data:www-data /home/botN
cd /home/botN
```

### 2. `docker-compose.yml`

В данном способе необходимо удалить nginx из **docker-compose.yml**, так как мы будем
использовать **nginx** от сервера.

Пример конфигурации docker-compose.yml:
```bash
services:
    app:
        build: .
        user: root
        restart: always
        depends_on:
            - pgdb
        env_file:
            - .env
        working_dir: /var/www/
        volumes:
            - .:/var/www
        ports:
            - "127.0.0.1:${APP_FPM_PORT}:9000"
        networks:
            - pet
        dns:
            - 8.8.8.8
            - 1.1.1.1
    
    pgdb:
        image: postgres
        tty: true
        restart: always
        environment:
            - POSTGRES_DB=${DB_DATABASE}
            - POSTGRES_USER=${DB_USERNAME}
            - POSTGRES_PASSWORD=${DB_PASSWORD}
        ports:
            - "127.0.0.1:${PGDB_PORT}:5432"
        volumes:
            - pgdata:/var/lib/postgresql
        networks:
            - pet
    
    queue:
        build: .
        restart: always
        depends_on:
            - app
        env_file:
            - .env
        working_dir: /var/www
        volumes:
            - .:/var/www
        command: php artisan queue:work --sleep=3 --tries=3 --timeout=90
        networks:
            - pet
        dns:
            - 8.8.8.8
            - 1.1.1.1
    
volumes:
    pgdata:
networks:
    pet:
        driver: bridge
```

### 3. `.env`

```bash
cp /home/botN/.env.example /home/botN/.env
sudo nano /home/botN/.env
```

В конфигурации **.env** для каждой версии проекта необходимо указать уникальные порты для сервисов.

Минимум уникальных строк:

```env
APP_FPM_PORT=900N
PGDB_PORT=543N+2

APP_URL=https://botN.example.com
DB_HOST=pgdb
DB_PORT=5432
DB_DATABASE=botN
DB_USERNAME=botN
DB_PASSWORD=<openssl rand -hex 24>

TELEGRAM_BOT_TOKEN=...
TELEGRAM_BOT_ID=...
TELEGRAM_GROUP_ID=...
TELEGRAM_SECRET_KEY=<openssl rand -hex 24>
```

Внутри Docker все сервисы по-прежнему доступны по именам (`pgdb:5432`) — не путать с хост-портами.

### 4. Запуск контейнеров

```bash
cd /home/botN
docker compose up -d --build
docker compose ps
```

Проверка: все порты в выводе должны быть `127.0.0.1:900N->9000/tcp` и т.д.

### 5. Инициализация Laravel

```bash
cd /home/botN
docker compose exec app composer install --no-dev --optimize-autoloader
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --force
docker compose exec app php artisan storage:link
docker compose exec app php artisan config:cache
docker compose exec app php artisan route:cache
docker compose exec app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
docker compose exec app chmod -R 775 /var/www/storage /var/www/bootstrap/cache
```

### 6. Права для системного nginx

```bash
ls -ld /home/botN
```

Если владелец **не** `www-data`:
```bash
sudo chmod o+x /home/botN
sudo chmod -R o+rX /home/botN/public
```

Проверка: `sudo -u www-data ls /home/botN/public/index.php` — не должно быть «Permission denied».

### 7. Конфиг nginx

```bash
sudo nano /etc/nginx/sites-available/botN
```

Вставить (заменить `botN` и `900N` на реальные значения):

```nginx
server {
    listen 80;
    server_name botN.example.com www.botN.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name botN.example.com www.botN.example.com;

    ssl_certificate     /etc/letsencrypt/live/botN.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/botN.example.com/privkey.pem;

    client_max_body_size 60M;

    root /home/botN/public;
    index index.php index.html;

    access_log /var/log/nginx/botN.access.log;
    error_log  /var/log/nginx/botN.error.log;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass 127.0.0.1:900N;
        fastcgi_index index.php;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_param SCRIPT_FILENAME /var/www/public$fastcgi_script_name;
        fastcgi_param PATH_INFO       $fastcgi_path_info;
        fastcgi_param HTTPS            on;
        fastcgi_param HTTP_X_FORWARDED_PROTO https;
        fastcgi_read_timeout 120s;
    }

    location ~ /\.ht { deny all; }
}
```

> **Критически важно:**
> - `fastcgi_param HTTPS on;` + `HTTP_X_FORWARDED_PROTO https;` — без них Laravel получает redirect-петлю на HTTPS.
> - `root /home/botN/public;` — путь **на хосте**.
> - `SCRIPT_FILENAME /var/www/public$fastcgi_script_name;` — путь **внутри контейнера**.
> - `fastcgi_pass 127.0.0.1:900N` — порт **этой** копии, не путать.

### 8. Выпуск SSL-сертификата

```bash
sudo certbot --nginx -d bot3.aibot7.ru -d www.bot3.aibot7.ru
```

### 9. Активация nginx

```bash
sudo ln -sf /etc/nginx/sites-available/botN /etc/nginx/sites-enabled/botN
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx          # или start, если nginx был остановлен
```

### 10. Регистрация Telegram-webhook

```bash
https://api.telegram.org/bot{{TELEGRAM_TOKEN}}/setWebhook?url={{TELEGRAM_WEBHOOK}}&max_connections=45&drop_pending_updates=true&secret_token={{TELEGRAM_SECRET_KEY}}&ip_address={{SERVER_IP}}
```

### 11. Проверка

```bash
curl -I https://botN.example.com                    # 200/302 от Laravel
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
sudo tail /var/log/nginx/botN.error.log
docker compose -f /home/botN/docker-compose.yml logs --tail=20 app queue
```

---

## Дублирование для следующих копий

Повторить раздел «Развёртывание копии botN», меняя:

- Папку `/home/botN`
- Все `900N` / `543N` по таблице портов
- Домен, Telegram-токены, пароли БД
- `server_name`, `root`, `fastcgi_pass`, путь сертификата в nginx-конфиге

---

## Возможные ошибки

### `Container "/botN_pgdb" is already in use`
Старый контейнер с `container_name`. Убрать `container_name:` из compose, удалить старый:
```bash
docker rm -f $(docker ps -aq --filter "name=botN")
```

### `bind() to 0.0.0.0:80 failed (Address already in use)`
Порт 80 занят другим nginx (часто контейнерным). Найти и убить:
```bash
sudo ss -tlnp | grep ':80\s'
docker stop $(docker ps -q --filter "publish=80")
```

### `services.volumes additional properties 'pgdata' not allowed`
В `docker-compose.yml` блоки `volumes:` и `networks:` оказались внутри `services:`. Перенести на нулевой отступ.

### `0.0.0.0:5432->5432/tcp` (БД торчит наружу)
В compose `- ${PGDB_PORT}` без IP, или в `.env` старый формат `PGDB_PORT=5432:5432`. Поправить:
- compose: `"127.0.0.1:${PGDB_PORT}:5432"`
- `.env`: `PGDB_PORT=5433` (просто число)

### `Welcome to nginx!` вместо Laravel
Не отключён `default` или нет симлинка на botN:
```bash
sudo ln -sf /etc/nginx/sites-available/botN /etc/nginx/sites-enabled/botN
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### 502 Bad Gateway
PHP-FPM недоступен:
```bash
sudo ss -tlnp | grep 900N
docker compose ps
sudo tail /var/log/nginx/botN.error.log
```

### 403 Forbidden
nginx не видит `/home/botN/public/`:
```bash
sudo chmod o+x /home/botN
sudo chmod -R o+rX /home/botN/public
```

### File not found от FPM
Неверный `SCRIPT_FILENAME`. Должно быть `/var/www/public$fastcgi_script_name` (путь **внутри контейнера**).

### `ERR_TOO_MANY_REDIRECTS` / redirect loop
В блоке `listen 443` отсутствуют `fastcgi_param HTTPS on;` + `fastcgi_param HTTP_X_FORWARDED_PROTO https;`. Laravel не понимает, что запрос пришёл по HTTPS, и редиректит снова на HTTPS. Добавить эти два параметра, `sudo systemctl reload nginx`.

### `conflicting server name "X" on 0.0.0.0:443, ignored`
Два конфига объявляют один и тот же `server_name`:
```bash
sudo grep -rn 'server_name' /etc/nginx/sites-enabled/
```
Удалить дубль.

### `Could not automatically find a matching server block`
Certbot не нашёл блок с нужным `server_name`. Не использовать `--nginx`, выпускать через `certonly --webroot` или `certonly --standalone`, потом руками прописать сертификат в конфиге (см. раздел 7–8).

### certbot предлагает Expand/Cancel
У домена уже есть сертификат без `www`. Ответить `E` — Let's Encrypt расширит сертификат и покроет оба домена.

### `inotify watch limit reached`
Не критично, но лечится:
```bash
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
echo 'fs.inotify.max_user_instances=512'  | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
