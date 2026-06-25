# Connecting a VK Group

The module receives incoming messages from a VKontakte group through the
Callback API and forwards them to the support service. Manager replies are
delivered back to users in VKontakte on behalf of the community.

::: info Prerequisites
Before connecting, make sure the project is deployed using one of the guides:

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose)
- [Installation on hosting](/en/docs/installation-on-hosting)
:::

### 1 Connecting the integration

1. Go to the **"Settings" -> "Integrations"** section.
2. Click the **"VKontakte"** card.

### 2 Creating an access token

1. Go to **Community Management → API Usage → Access Tokens**.
2. Create a new token with the permissions:
   - Community messages
   - Photos
   - Documents
3. After saving, paste the token you receive into the **"Token"** field in the integration settings.

### 3 Configuring the Callback API

Go to **Community Management → API Usage → Callback API**.

#### 3.1 "Servers" tab

1. Specify the server URL: `https://{your domain}/api/vk/bot`
2. Select the type: **Callback API**.
3. Specify the API version: **5.131** or newer.
4. In the **Secret key** field, enter a string to protect your integration. A random string of 10-12 characters.
5. Enter the same **Secret key** in the corresponding field in the integration settings.

#### 3.2 "Settings" tab

1. Copy the **Confirmation string** and paste it into the **"Confirmation Code"** field in the integration settings.

#### 3.3 "Event types" tab

1. Enable the events:
   - **Incoming message**
   - **Outgoing message**
2. Save the settings.

## 4. Configuring the integration

1. By this point you should have already filled in all the important fields.
2. Click the **"Save"** button.

## Verification

1. Send a message to the VKontakte group as a regular user.
2. A new item and the sent message will appear in the **"Chats"** section.
3. Write a reply, and it should be sent to VKontakte on behalf of the community.
