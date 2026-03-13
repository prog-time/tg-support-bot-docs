# Connecting a VK Group

This module accepts incoming messages from a VKontakte community via the Callback API
and forwards them to your Telegram support group. Manager replies are delivered
back to users in VKontakte on behalf of the community.

Webhook endpoint: `POST /api/vk/bot`

::: info Prerequisites
Before connecting, make sure the project has been deployed using one of the
following guides:

- [Installation with Docker Compose](/docs/installation-on-docker-compose)
- [Installation on a hosting server](/docs/installation-on-hosting)
:::

## 1. Environment variables

Add or update the following variables in your `.env` file:

```env
VK_TOKEN=your_vk_group_access_token
VK_CONFIRM_CODE=your_vk_confirm_string
VK_SECRET_CODE=your_custom_vk_secret
```

| Variable           | Description                                                        |
| ------------------ | ------------------------------------------------------------------ |
| `VK_TOKEN`         | VKontakte community access token                                   |
| `VK_CONFIRM_CODE`  | Confirmation string from the Callback API settings                 |
| `VK_SECRET_CODE`   | An arbitrary secret key used to verify requests from VKontakte     |

## 2. VKontakte community settings

### 2.1. Creating an access token

1. Go to **Community Management → API Usage → Access Tokens**.
2. Create a new token with the following permissions:
   - Community messages
   - Photos
   - Documents
3. Copy the generated token and set it as the value of `VK_TOKEN` in `.env`.

### 2.2. Configuring the Callback API

Go to **Community Management → API Usage → Callback API**.

#### Servers tab

1. Set the server URL to `https://your-domain.com/api/vk/bot`.
2. Set the type to **Callback API**.
3. Set the API version to **5.131** or later.
4. Enter an arbitrary value in the **Secret key** field and copy it
   into `.env` as `VK_SECRET_CODE`.

#### Settings tab

1. Copy the **Confirmation string** and paste it into `.env` as `VK_CONFIRM_CODE`.

#### Event types tab

1. Enable the following events:
   - **Incoming message**
   - **Outgoing message**
2. Save the settings.

::: warning HTTPS required
Make sure the server domain is publicly accessible and serves traffic over HTTPS —
otherwise VKontakte will not be able to deliver requests to your server.
:::

After saving, click **Confirm server address**. The server must respond with
the string stored in `VK_CONFIRM_CODE`, which confirms the configuration is correct.

## 3. Verification

1. Send a message to the VKontakte community as a regular user.
2. The bot should create (or reuse an existing) topic in the Telegram group
   and forward the message there.
3. The manager's reply from Telegram will be delivered back to VKontakte
   on behalf of the community.

## Connection checklist

- [ ] `VK_TOKEN` set in `.env`
- [ ] `VK_CONFIRM_CODE` set in `.env`
- [ ] `VK_SECRET_CODE` set in `.env`
- [ ] Server URL configured in Callback API: `https://your-domain.com/api/vk/bot`
- [ ] Server address confirmed in the VKontakte interface
- [ ] "Incoming message" and "Outgoing message" events are enabled
- [ ] A test message from VKontakte appears in the Telegram group
- [ ] A manager reply from Telegram is delivered to VKontakte
