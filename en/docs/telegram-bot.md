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

## 2. Creating a group to receive messages

1. Create a new private Telegram group.
2. Add the bot you created in @BotFather to the group and make it an administrator.
3. In the group settings, enable **topics**.
4. To find out the group ID, temporarily add **@getMyId** or a similar bot to the group. After getting the ID, remove it from the group.

## 3. Telegram integration settings

1. In the **"Token"** field, paste the token you received when creating the bot.
2. In the **"Webhook Secret Key"** field, paste a random string (a password to protect the integration).
3. In the **"Group ID for receiving messages"** field, paste the group ID you obtained in the previous step.

## Links

- [Telegram Bot API — developer documentation](https://core.telegram.org/bots/api)
- [@BotFather](https://t.me/BotFather)
