# Troubleshooting

This page covers the most common errors encountered when installing and running
TG Support Bot, along with their root causes and step-by-step solutions.

## SSL Certificate Setup Fails

The ACME client (e.g. Certbot) cannot obtain a certificate because port 80 is
already held by another process — most commonly the system Nginx service.

Check which process is holding port 80:

```bash
sudo netstat -ltnp | grep -w ':80'
```

If the system Nginx is responsible, stop it:

```bash
sudo systemctl stop nginx
```

Then re-run the certificate issuance command.

## Grafana Fails to Start Due to Permission Error

The `grafana` container exits immediately because the data directory is not
writable by the Grafana process.

Output of `docker compose logs grafana`:

```text
grafana  | GF_PATHS_DATA='/var/lib/grafana' is not writable.
grafana  | You may have issues with file permissions, more information here: http://docs.grafana.org/installation/docker/#migrate-to-v51-or-later
grafana  | mkdir: can't create directory '/var/lib/grafana/plugins': Permission denied
```

Set the owner of the data directory to UID `472` (Grafana's internal user):

```bash
sudo chown -R 472:472 ./docker/grafana
```

## Error: Failed to open stream: Permission denied

Laravel cannot write to the log file because the application does not have
sufficient permissions on the storage directory.

From the project root, fix the ownership:

```bash
sudo chown -R 775 storage/logs/laravel.log
```

## Error: require(autoload.php): Failed to open stream

The `vendor` directory is missing because Composer dependencies have not been
installed.

Container log output:

```text
laravel_queue  | PHP Warning:  require(/var/www/vendor/autoload.php): Failed to open stream: No such file or directory in /var/www/artisan on line 10
laravel_queue  | PHP Fatal error:  Uncaught Error: Failed opening required '/var/www/vendor/autoload.php' (include_path='.:/usr/local/lib/php') in /var/www/artisan on line 10
```

Install or update Composer dependencies:

```bash
composer update
```

## Error: MissingAppKeyException

The `APP_KEY` variable in `.env` is missing or empty — Laravel cannot perform
encryption without it.

Generate a new application key:

```bash
php artisan key:generate
```

## Error: file_put_contents

The directory owner does not match the user the web server runs as, preventing
PHP from writing files.

<!-- markdownlint-disable MD033 -->
<img width="1043" height="921" alt="Screenshot of file_put_contents error" src="/images/troubleshooting/file-put-contents-error.png" />
<!-- markdownlint-enable MD033 -->

Navigate to the directory that contains the project root:

```bash
cd /path/to/parent/directory
```

Recursively transfer ownership to the `www-data` user:

```bash
sudo chown -R www-data:www-data project_directory_name
```

## PostgreSQL Container Fails to Start

The `pgdb` container exits on `docker compose up` with a data format
incompatibility error — this typically happens after updating the PostgreSQL
Docker image without migrating the underlying data.

Output of `docker compose logs pgdb`:

```text
Error: in 18+, these Docker images are configured to store database data in a
       format which is compatible with "pg_ctlcluster"...
       Counter to that, there appears to be PostgreSQL data in:
         /var/lib/postgresql/data (unused mount/volume)
       This is usually the result of upgrading the Docker image without
       upgrading the underlying database using "pg_upgrade"...
```

The recommended solution is documented in the
[GitHub discussion](https://github.com/prog-time/tg-support-bot/discussions/55).
