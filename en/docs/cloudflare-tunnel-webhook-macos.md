# Setting up a Telegram Webhook via Cloudflare Tunnel (macOS)

This guide lets you quickly expose a local server to the internet
using `cloudflared` and connect a Telegram Webhook for developing
and testing the bot.

---

::: info Community guide
This installation method was suggested by a member of the Telegram community.
The author of the support bot **has not verified** that this method works.

Guide prepared by: [@Flatroy](https://github.com/Flatroy)
:::

---

## Requirements

- macOS
- [Homebrew](https://brew.sh/) installed
- A Telegram bot with a token
- A project running locally (for example, `http://localhost:8000`)

## Step 1 — Install cloudflared

Open a terminal and run:

```bash
brew install cloudflared
```

Verify the installation:

```bash
cloudflared --version
```

## Step 2 — Start the local server

Make sure the project is already running locally. If you are using a different port,
substitute it in the following commands instead of `8000`.

## Step 3 — Create a public tunnel

Start the tunnel:

```bash
cloudflared tunnel --url http://localhost:8000
```

After it starts, a public address like the following will appear in the terminal:

```
https://something-random.trycloudflare.com
```

Copy it — you will need it in the next step.

::: warning
Cloudflare generates a new URL every time the tunnel is started.
After a restart you will need to register the webhook again.
For a permanent URL, set up a named tunnel:
`cloudflared tunnel login` + `cloudflared tunnel create`.
:::

## Step 4 — Building the webhook URL

At this stage you need to come up with a password to protect your Telegram integration.

Build the webhook URL by substituting your domain and secret key:

```
https://{your domain}.trycloudflare.com/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token={secret_key}
```

## Step 5 — Register the webhook in Telegram

Open the following URL in a browser, substituting the bot token and the URL from step 4:

```
https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://{your domain}.trycloudflare.com/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token={secret_key}
```

On successful registration, the Telegram API returns:

```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

## Step 6 — Check the webhook status

```
https://api.telegram.org/bot{TOKEN}/getWebhookInfo
```

Expected response:

```json
{
  "ok": true,
  "result": {
    "url": "https://...",
    "pending_update_count": 0
  }
}
```

## Troubleshooting

If the bot does not respond to messages, check the following:

- The port in the `cloudflared` command matches the local server's port
- The `secret_token` value in the URL matches the value in `.env`
- The local server is running and reachable at `http://localhost:8000`
- The tunnel is active — check the output in the terminal
- Review the cloudflared logs for errors
