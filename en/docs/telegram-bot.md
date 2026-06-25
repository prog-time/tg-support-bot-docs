# Connecting Telegram

Telegram is the primary support channel. The bot receives incoming user
messages through a webhook and creates a separate topic (thread) for each
conversation in a private Telegram support group. Manager replies from that
topic are delivered back to the user in Telegram.

Webhook endpoint: `POST /api/telegram/bot`

::: info Prerequisites
Before connecting, make sure the project is deployed using one of the guides:

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose)
- [Installation on hosting](/en/docs/installation-on-hosting)

For local development, you can set up a webhook via
[Cloudflare Tunnel (macOS)](/en/docs/cloudflare-tunnel-webhook-macos).
:::

## 1. Connecting the Telegram integration

1. Go to the **"Settings" -> "Integrations"** section.
2. Click the **"Telegram"** card.
3. Do not close the page; in the following steps you will need to fill in the fields.

## 1. Creating a bot in @BotFather

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the `/newbot` command.
3. Set a name and a username for the bot.
4. Paste the token you receive into the **"Bot Token"** field.

## 2. Telegram integration settings

1. In the **"Token"** field, paste the token you received when creating the bot.
2. In the **"Webhook Secret Key"** field, paste a random string (a password to protect the integration).

## Links

- [Telegram Bot API — developer documentation](https://core.telegram.org/bots/api)
- [@BotFather](https://t.me/BotFather)
