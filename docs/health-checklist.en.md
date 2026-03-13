# Application Health Checklist

A step-by-step guide for verifying that the bot is working correctly after
installation or an update. Complete all sections in order.

## 1. Prerequisites

- [ ] Docker containers are running (`docker compose up -d`)
- [ ] The application is reachable at a public URL (HTTPS)
- [ ] Environment variables are configured in `.env`

### Required environment variables

```env
APP_URL=https://your-domain.com

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_SECRET_KEY=your_secret_key
TELEGRAM_GROUP_ID=your_group_id

# VK
VK_TOKEN=your_vk_token
VK_SECRET=your_vk_secret
VK_CONFIRMATION_CODE=your_confirmation_code
```

## 2. Telegram webhook setup

### 2.1. Register the webhook

Send a GET request to the following URL (substitute your own values):

```text
https://api.telegram.org/bot{TELEGRAM_TOKEN}/setWebhook?url=https://{DOMAIN}/api/telegram/bot&max_connections=45&drop_pending_updates=true&secret_token={SECRET_KEY_FROM_ENV}
```

### 2.2. Verify webhook status

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/getWebhookInfo"
```

Expected response:

```json
{
  "ok": true,
  "result": {
    "url": "https://{DOMAIN}/api/telegram/bot",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "max_connections": 40
  }
}
```

### 2.3. Telegram verification checklist

- [ ] `url` matches your domain
- [ ] `pending_update_count` is `0` (no unprocessed messages)
- [ ] `last_error_date` is absent or outdated

## 3. VK webhook setup

### 3.1. Configure in VK

1. Open your VK community settings.
2. Navigate to **API usage → Callback API**.
3. Set the URL to `https://your-domain.com/api/vk/bot`.
4. Enter the secret key from `.env` (`VK_SECRET`).
5. Confirm the server — the bot will return the confirmation code automatically.

### 3.2. VK verification checklist

- [ ] Server is confirmed in VK settings
- [ ] Required event types are enabled (incoming messages)
- [ ] Server status shows as "Active"

## 4. Testing the bot

### 4.1. Telegram

1. Send a test message:
   - [ ] Message the bot in a private chat.
   - [ ] Confirm the message appears in the support group.

2. Verify the reply:
   - [ ] Reply to the message in the group.
   - [ ] Confirm the user received the reply.

3. Check the logs:

   ```bash
   docker exec -it pet tail -f storage/logs/laravel.log
   ```

### 4.2. VK

1. Send a test message:
   - [ ] Message the community inbox.
   - [ ] Confirm the message is forwarded to the Telegram group.

2. Verify the reply:
   - [ ] Reply to the message in Telegram.
   - [ ] Confirm the reply is delivered in VK.

## 5. Troubleshooting

### 5.1. Telegram is not receiving messages

Check webhook status:

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/getWebhookInfo"
```

Reset the webhook:

```bash
curl "https://api.telegram.org/bot{TELEGRAM_TOKEN}/deleteWebhook"
```

After resetting, re-register the webhook (step 2.1).

### 5.2. SSL certificate errors

- [ ] Verify the certificate is valid (not self-signed)
- [ ] Verify the certificate chain is complete
- [ ] The URL must use HTTPS

### 5.3. Verify endpoint availability

Telegram endpoint:

```bash
# Telegram endpoint
curl -X POST https://{DOMAIN}/api/telegram/bot \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

VK endpoint:

```bash
# VK endpoint
curl -X POST https://{DOMAIN}/api/vk/bot \
  -H "Content-Type: application/json" \
  -d '{"type": "confirmation", "group_id": 123}'
```

### 5.4. Check queues

Run one job from the queue:

```bash
docker exec -it pet php artisan queue:work --once
```

View failed jobs:

```bash
docker exec -it pet php artisan queue:failed
```

## 6. Useful commands

| Command | Description |
| --- | --- |
| `php artisan queue:work` | Start the queue worker |
| `php artisan queue:failed` | List failed jobs |
| `php artisan queue:retry all` | Retry all failed jobs |
| `php artisan config:cache` | Cache the configuration |
| `php artisan route:list` | List all registered routes |

## 7. Final checklist

### Telegram

- [ ] Webhook is registered and active
- [ ] Bot responds to `/start`
- [ ] Messages are forwarded to the group
- [ ] Replies are delivered to the user
- [ ] Logs are error-free

### VK

- [ ] Callback server is confirmed
- [ ] Messages are forwarded to Telegram
- [ ] Replies are delivered in VK
- [ ] Logs are error-free

### Infrastructure

- [ ] SSL certificate is valid
- [ ] Queues are running
- [ ] Logging is configured
- [ ] Error monitoring is active
