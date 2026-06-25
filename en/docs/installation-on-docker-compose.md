# Installation via Docker Compose

This guide describes how to install and configure **TG Support Bot**
on a virtual private server (VPS) using Docker Compose.

## Prerequisites

Before you begin, make sure the following requirements are met:

- You have a VPS and a registered domain.
- Docker and Docker Compose are installed on the server.
- You have SSH access to the server.

## Installation and configuration steps

### 1. Register a VPS

Register a VPS running Ubuntu with Docker Compose preinstalled.
The recommended amount of RAM is at least 1 GB.

For hosting I recommend, for example, [Beget](https://beget.com/p658517).

### 2. Configure DNS

- Register a domain name.
- Point the domain's DNS records to your server's IP address.

::: tip
DNS records usually take 15–20 minutes to update.
:::

### 3. Prepare the environment on the server

#### Cloning the repository

Connect to the server over SSH and go to the `/home` directory:

```bash
cd /home/
```

Create a directory for the project and switch to it:

```bash
mkdir yourdomain.com && cd yourdomain.com
```

Clone the repository. The dot at the end of the command places the files
directly in the current directory, without creating a nested folder:

```bash
git clone https://github.com/prog-time/tg-support-bot.git .
```

#### Creating the .env file

Copy the configuration template:

```bash
cp .env.example .env
```

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

### 4. Start the project

Make sure the `.env` file specifies the `MAIN_DOMAIN` parameter —
the domain name that will be used by the bot and all of its services.

Run the initial setup script from the project's root directory:

```bash
./start.sh
```

::: tip Running into problems?
If something goes wrong while running `start.sh`, take a look at the
**"Common errors"** section or ask a question in the Telegram community -
[t.me/pt\_tg\_support](https://t.me/pt_tg_support).
:::

### 5. Verifying it works

1. Open a browser and go to your domain.
2. Make sure the page opens without errors and over the **HTTPS** protocol.
3. Open the page **https://{domain}/admin** and make sure the authorization form works correctly.

Create the first administrator using the artisan command:

```bash
docker exec pet php artisan app:create-admin-user
```

## Congratulations

The bot has been installed successfully and is ready to use. Now you need to connect integrations in the **"Settings" -> "Integrations"** section.
