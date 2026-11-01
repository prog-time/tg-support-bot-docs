# Updating the Project

A step-by-step guide for migrating to a new TG Support Bot release.

## Updating the code

Go to the project root directory and run the following commands:

```bash
# Fetch the latest branch information
git fetch origin

# Switch to the main branch
git checkout main

# Pull the latest changes
git pull origin main
```

## Checking the configuration

Compare the `.env.example` file with your `.env` — a new release may introduce
new environment variables that need to be added.

## Updating the Docker environment

```bash
# Stop the containers
docker compose down

# Pull the updated images
docker compose pull

# Rebuild the local images
docker compose build

# Start the containers in the background
docker compose up -d
```

## Updating the Laravel application

```bash
# Connect to the application container
docker compose exec app bash

# Install Composer dependencies
composer install --no-dev --optimize-autoloader

# Apply new database migrations
php artisan migrate
```

## Moving to the version without a separate AI bot

A separate Telegram bot for the AI Assistant is no longer used: the main bot publishes its messages. If you had an AI bot configured, update in this order:

1. Before updating, disable the AI Assistant in the **"AI Assistant"** section.
2. Update the project using the steps above.
3. Run the command in the application container:

   ```bash
   php artisan ai-bot:retire
   ```

   The command removes old drafts from the topics, deletes the AI bot webhook and removes its settings. The drafts stay in the **"Chats"** section. If Telegram is unavailable, the command exits with an error: run it again.
4. Enable the AI Assistant.
5. Remove the AI bot from the group and, optionally, revoke its token via [@BotFather](https://t.me/BotFather).

## Verifying that everything works

After updating, make sure everything works correctly:

- The bot replies to messages in Telegram
- Messages are forwarded to the support group
- Sending media files works
- Migrations were applied without errors
