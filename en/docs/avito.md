# Connecting Avito

Avito is a built-in support channel powered by the Avito Messenger API. The
bot receives incoming messages about your listings through a webhook and
creates a separate topic (thread) for each conversation in the Telegram
support group (or a ticket in the **"Chats"** section, if no group is
configured). Manager replies are delivered back to the user on Avito.

Webhook endpoint: `POST /api/avito/bot/{secret}`

::: info Prerequisites
Before connecting, make sure the project is deployed using one of the guides:

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose)
- [Installation on hosting](/en/docs/installation-on-hosting)
:::

::: warning Paid channel
Avito is a paid module. You'll also need an active Avito **"Messenger API"**
subscription — without it, Avito accepts the webhook registration but never
calls it, and messages won't be delivered either via webhook or API.
:::

## 1. Activate the license

1. Go to the **"Settings" -> "Subscriptions"** section.
2. Activate the license for the Avito module.

## 2. Create an OAuth app in your Avito account

1. Open your Avito personal account: **Profile → Settings → API**.
2. Create a new OAuth app with Messenger API access.
3. Copy the **Client ID** and **Client Secret** — you'll need them in the
   next step.

## 3. Configuring the integration

1. Go to the **"Settings" -> "Integrations"** section.
2. Click the **"Avito"** card.
3. Fill in the fields:
   - **Client ID** — the Avito OAuth app identifier;
   - **Client Secret** — the OAuth app secret (stored encrypted);
   - **Base URL** — optional, defaults to `https://api.avito.ru`;
   - **Webhook Secret Key** — optional but recommended: a string embedded
     in the webhook URL to authenticate incoming requests (e.g.
     `openssl rand -hex 32`). Leave it blank and the endpoint accepts
     requests unauthenticated.
4. Click **"Save"** — the connection is verified (a token is requested and
   the Avito account is resolved). If verification fails, nothing is saved
   and the form shows the reason.
5. On success, the **Avito account ID** is captured automatically — there's
   no need to enter it manually.
6. Next to the verification result you'll see the **"Messenger API"**
   subscription status — make sure it's **active**, otherwise messages
   won't arrive.

## 4. Registering the webhook

Run this command on the server to subscribe the webhook to your Avito
account:

```bash
docker exec -it pet php artisan avito:set-webhook
```

The command fills in the webhook URL and secret key from the previous step
automatically, and prints the connected Avito account ID.

## Verification

1. Send a message about one of your listings on Avito as a regular user.
2. A new topic appears in the connected Telegram group (or a ticket in the
   **"Chats"** section, if no group is configured).
3. Reply from the topic or the admin panel — the reply should reach the
   user on Avito.

## Current version limitations

- Requires an active module license and a paid Avito "Messenger API"
  subscription.
- Only one Avito account is supported per installation.

## Links

- [Avito Messenger API — developer documentation](https://developers.avito.ru/)
