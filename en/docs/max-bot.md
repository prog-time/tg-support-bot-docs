# Connecting Max

Max is a messenger from the VK/Mail.ru ecosystem. The module receives
incoming messages through a webhook.
Manager replies are delivered back to the user in Max.

## 1. Creating a bot in Max

1. Go to the platform and sign in at [business.max.ru](https://business.max.ru/).

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Signing in to the Max platform" src="/images/max-bot/step-1-signin.png" />
<!-- markdownlint-enable MD033 -->

2. Fill in the form to create a new bot in Max.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Bot creation form in Max" src="/images/max-bot/step-2-create-bot.png" />
<!-- markdownlint-enable MD033 -->

3. After the bot is created, copy the token you receive.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Bot token in Max" src="/images/max-bot/step-3-bot-token.png" />
<!-- markdownlint-enable MD033 -->

## 2. Configuring the integration

1. Go to the **"Settings" -> "Integrations"** section.
2. Click the **"MAX"** card.
3. In the "Token" field, enter the token you received when creating the bot in MAX.
4. In the "Webhook Secret Key" field, enter a string to protect your integration. A random string of 10-12 characters.
