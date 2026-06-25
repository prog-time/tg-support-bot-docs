# Installing the bot on hosting

This section describes how to install **TG Support Bot** on hosting
without using Docker Compose.

::: info Alternative installation method
Installation via [Docker Compose](/en/docs/installation-on-docker-compose.html)
automatically deploys all the required services: the database,
logging, and monitoring. When installing on hosting you will need
to create the database in advance and specify its credentials yourself
in the `.env` file.
:::

## Cloning the repository

Go to the project directory and make sure it is empty:

```bash
ls -A
```

If the directory is not empty, clear it:

```bash
find . -mindepth 1 -delete
```

Clone the repository:

```bash
git clone https://github.com/prog-time/tg-support-bot.git .
```

## Creating a bot and a group in Telegram

1. Open **@BotFather** and create a new bot with the `/newbot` command;
2. Set a name and a username for the bot;
3. Copy and save the token you receive;
4. Create a new private Telegram group;
5. Add the bot to the group and make it an administrator;
6. In the group settings, enable the ability to create **topics**;
7. To find out the group ID, temporarily add the
   **@getMyId** bot (or a similar one) to it. Once you have the ID, remove it from the group.

## Creating the .env file

Copy the configuration file from the template:

```bash
cp .env.example .env
```

## Filling in the .env

Open the `.env` file and replace the variable values with real data:
1. Domain
```text
MAIN_DOMAIN=example.com
APP_URL=https://example.com
```
2. Database credentials
```text
DB_CONNECTION=pgsql
DB_HOST=pgdb
DB_PORT=5432
DB_DATABASE=database_name
DB_USERNAME=username
DB_PASSWORD=password
```

Integration parameters are configured in the admin panel.

## Applying database migrations

After configuring the database connection, run the migrations
to create the necessary tables:

```bash
php artisan migrate
```

## Redirecting requests to the public directory

::: tip
This step may vary depending on your hosting. If you cannot get the bot running, contact your hosting provider's technical support
or ask a question in our Telegram community —
[t.me/pt\_tg\_support](https://t.me/pt_tg_support).
:::

For the application to work correctly, all incoming requests must
be directed to the `public` directory. Create a `.htaccess` file in the project
root with the following contents:

```apacheconf
RewriteEngine On
RewriteRule (.*) public/$1
```

After that, make sure requests are processed correctly through
`public/index.php`.
