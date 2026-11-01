# Connecting Odnoklassniki

Odnoklassniki (OK) is a built-in support channel powered by the OK Bot API. The
bot receives group messages through a webhook and creates a separate topic
(thread) for each conversation in the Telegram support group, or a ticket in the
**"Chats"** section if no group is configured. Manager replies are delivered back
to the user on OK.

Webhook endpoint: `POST /api/ok/bot/{secret}`

::: info Prerequisites
Before connecting, make sure the project is deployed using one of the guides:

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose)
- [Installation on hosting](/en/docs/installation-on-hosting)

You need an Odnoklassniki group where you are an administrator.
:::

## 1. Get the group token

1. Open the group settings on Odnoklassniki.
2. Go to **"Messages" -> "API"**.
3. Click **"Get access key"** and copy the whole token, with all its characters.

::: warning A new token revokes the old one
If you reissue the key in the group settings, the old one stops working. Enter
the new one in the admin panel and click **"Save"**: the webhook updates
automatically.
:::

## 2. Configure the integration

1. Go to **"Settings" -> "Integrations"**.
2. Click the **"Одноклассники"** card.
3. Fill in the fields:
   - **Group token** — the token from the previous step (stored encrypted);
   - **Webhook secret key** — a string embedded in the webhook URL to verify
     incoming requests (for example, `openssl rand -hex 32`). This field is
     required: without a key, all incoming requests are rejected.
4. Click **"Save"**. The token is checked with a request to OK. If the check
   fails, nothing is saved and the form shows the error.

After saving, the webhook is subscribed automatically to
`<APP_URL>/api/ok/bot/<secret key>`, no commands are needed. The address must be
reachable from the internet. If the token or secret key changes, click **"Save"**
again.

## Verification

1. Message the group **from another account** that does not administer the group.
   OK sends no webhook for messages from the administrator's account.
2. A new topic appears in the Telegram group, or a ticket in the **"Chats"**
   section.
3. Reply from the topic or the admin panel. The user should receive the reply on
   OK.

## Supported messages

**From the user:**

| Type | How the manager receives it |
|---|---|
| Text | As text |
| Photo, sticker | As an image |
| File, audio | As a file |
| Video | As a link to the OK page: OK does not provide a direct file link |
| Contact, location, call, gift | As a text description |
| Link, music | As a link |
| OK reshare without a link | As a message with its ID, view it in the OK chat |

If a file cannot be downloaded, the manager gets a link to it.

**From the manager:** text, photos, documents, voice messages, audio, video,
video notes, static stickers, and location. A contact is sent as text.

If a file cannot be delivered, a warning appears in the topic, and the message
text still reaches the user.

## Current limitations

- The feedback form is text-based: after a ticket is closed, the user is asked to
  leave a review, without 1–5 buttons.
- Polls and animated stickers from Telegram are not sent.
- Voice messages and audio that OK refuses are sent as a regular file.
- The OK documentation names the full and mobile websites, and promises support
  for group messages in the official apps later.

## Troubleshooting

| Problem | What to check |
|---|---|
| The integration is connected, but messages do not arrive | Whether the form reported that the webhook is subscribed, and whether you are writing from the group administrator's account |
| The token is not accepted | Whether the whole token was copied and whether it was reissued |
| Messages stopped arriving | OK may cancel the subscription if the server does not respond for 8 hours. Open the integration settings and click **"Save"** again |

## Links

- [OK Bot API — developer documentation](https://apiok.ru/dev/graph_api/bot_api)
