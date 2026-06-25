# Deploying Multiple Bot Instances on a Single Server

A system-wide nginx on the host + N isolated Docker stacks located at `/home/botN`. Each instance has its own Telegram token, domain, and database.

## Installing system packages (one time)

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker

echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
echo 'fs.inotify.max_user_instances=512'  | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Port table

| Bot | FPM | Postgres |
|-----|-----|----------|
| bot1 | 9001 | 5433 |
| bot2 | 9002 | 5434 |
| bot3 | 9003 | 5435 |

All ports are bound only to `127.0.0.1`.

## Deploying the botN instance

Substitute `N` = `1`, `2`, `3`, …

### 1. Cloning

```bash
sudo git clone <REPO_URL> /home/botN
sudo chown -R www-data:www-data /home/botN
cd /home/botN
```

### 2. `docker-compose.yml`

With this approach you need to remove nginx from **docker-compose.yml**, because we will
use the **nginx** provided by the server.

Example docker-compose.yml configuration:
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

In the **.env** configuration for each project instance you must specify unique ports for the services.

Minimum set of unique lines:

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

Inside Docker all services are still reachable by name (`pgdb:5432`) — do not confuse these with the host ports.

### 4. Starting the containers

```bash
cd /home/botN
docker compose up -d --build
docker compose ps
```

Check: every port in the output should be `127.0.0.1:900N->9000/tcp` and so on.

### 5. Laravel initialization

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

### 6. Permissions for the system nginx

```bash
ls -ld /home/botN
```

If the owner is **not** `www-data`:
```bash
sudo chmod o+x /home/botN
sudo chmod -R o+rX /home/botN/public
```

Check: `sudo -u www-data ls /home/botN/public/index.php` — there should be no "Permission denied".

### 7. nginx config

```bash
sudo nano /etc/nginx/sites-available/botN
```

Insert (replace `botN` and `900N` with the real values):

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

> **Critically important:**
> - `fastcgi_param HTTPS on;` + `HTTP_X_FORWARDED_PROTO https;` — without them Laravel ends up in an HTTPS redirect loop.
> - `root /home/botN/public;` — the path **on the host**.
> - `SCRIPT_FILENAME /var/www/public$fastcgi_script_name;` — the path **inside the container**.
> - `fastcgi_pass 127.0.0.1:900N` — the port of **this** instance; do not mix them up.

### 8. Issuing the SSL certificate

```bash
sudo certbot --nginx -d bot3.aibot7.ru -d www.bot3.aibot7.ru
```

### 9. Activating nginx

```bash
sudo ln -sf /etc/nginx/sites-available/botN /etc/nginx/sites-enabled/botN
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx          # or start, if nginx was stopped
```

### 10. Registering the Telegram webhook

```bash
https://api.telegram.org/bot{{TELEGRAM_TOKEN}}/setWebhook?url={{TELEGRAM_WEBHOOK}}&max_connections=45&drop_pending_updates=true&secret_token={{TELEGRAM_SECRET_KEY}}&ip_address={{SERVER_IP}}
```

### 11. Verification

```bash
curl -I https://botN.example.com                    # 200/302 from Laravel
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo
sudo tail /var/log/nginx/botN.error.log
docker compose -f /home/botN/docker-compose.yml logs --tail=20 app queue
```

---

## Duplicating for additional instances

Repeat the "Deploying the botN instance" section, changing:

- The `/home/botN` folder
- All `900N` / `543N` values according to the port table
- The domain, Telegram tokens, and database passwords
- `server_name`, `root`, `fastcgi_pass`, and the certificate path in the nginx config

---

## Possible errors

### `Container "/botN_pgdb" is already in use`
An old container with a `container_name`. Remove `container_name:` from the compose file and delete the old container:
```bash
docker rm -f $(docker ps -aq --filter "name=botN")
```

### `bind() to 0.0.0.0:80 failed (Address already in use)`
Port 80 is occupied by another nginx (often a containerized one). Find and kill it:
```bash
sudo ss -tlnp | grep ':80\s'
docker stop $(docker ps -q --filter "publish=80")
```

### `services.volumes additional properties 'pgdata' not allowed`
In `docker-compose.yml` the `volumes:` and `networks:` blocks ended up inside `services:`. Move them to the top-level (zero) indentation.

### `0.0.0.0:5432->5432/tcp` (database exposed to the outside)
In the compose file `- ${PGDB_PORT}` is missing the IP, or the `.env` uses the old format `PGDB_PORT=5432:5432`. Fix:
- compose: `"127.0.0.1:${PGDB_PORT}:5432"`
- `.env`: `PGDB_PORT=5433` (just a number)

### `Welcome to nginx!` instead of Laravel
The `default` site is not disabled, or there is no symlink for botN:
```bash
sudo ln -sf /etc/nginx/sites-available/botN /etc/nginx/sites-enabled/botN
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### 502 Bad Gateway
PHP-FPM is unreachable:
```bash
sudo ss -tlnp | grep 900N
docker compose ps
sudo tail /var/log/nginx/botN.error.log
```

### 403 Forbidden
nginx cannot see `/home/botN/public/`:
```bash
sudo chmod o+x /home/botN
sudo chmod -R o+rX /home/botN/public
```

### File not found from FPM
The `SCRIPT_FILENAME` is wrong. It should be `/var/www/public$fastcgi_script_name` (the path **inside the container**).

### `ERR_TOO_MANY_REDIRECTS` / redirect loop
The `listen 443` block is missing `fastcgi_param HTTPS on;` + `fastcgi_param HTTP_X_FORWARDED_PROTO https;`. Laravel does not realize the request arrived over HTTPS and redirects to HTTPS again. Add these two parameters and run `sudo systemctl reload nginx`.

### `conflicting server name "X" on 0.0.0.0:443, ignored`
Two configs declare the same `server_name`:
```bash
sudo grep -rn 'server_name' /etc/nginx/sites-enabled/
```
Remove the duplicate.

### `Could not automatically find a matching server block`
Certbot could not find a block with the required `server_name`. Do not use `--nginx`; issue the certificate via `certonly --webroot` or `certonly --standalone`, then add the certificate to the config manually (see sections 7–8).

### certbot offers Expand/Cancel
The domain already has a certificate without `www`. Answer `E` — Let's Encrypt will expand the certificate to cover both domains.

### `inotify watch limit reached`
Not critical, but can be fixed:
```bash
echo 'fs.inotify.max_user_watches=524288' | sudo tee -a /etc/sysctl.conf
echo 'fs.inotify.max_user_instances=512'  | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
