# Live Chat Widget

This guide explains how to connect the TG Support Bot live chat widget
to your website.

## How live chat works

- The live chat widget is displayed on your website.
- When the first message is sent, a unique key is generated for the user
  and stored in the session.
- Messages from the widget are delivered to Telegram and to the admin panel, where a
  separate chat topic is created for each user.
- Managers reply in that topic — the reply appears in the widget on the website instantly.

The message history is stored on the client side for the lifetime of the session.

All sources are stored in your copy of the bot's code, and if you wish, you can
change the logic for generating the unique key.

## 1. Adding an API source

Go to the **"API & Webhooks"** section and click the **"Add source"** button.

After you click the button, an API key is generated. Here you need to do the following:
- adjust the name in the "Source name" field.
- generate a "Widget Public Key". Live chat uses the public key.

Copy the public key — you'll need it to configure the integration.

## 2. Adding the widget to your site

Insert the widget connection script into your site, right before the closing **body** tag.

```js
<script
  src="https://{support domain}/widget/widget.js"
  data-domain="https://{support domain}"
  data-key="pub_xxxxxxxx"
  data-greeting="Write to us, we are online!"
  data-manager="Support"
  defer
></script>
```

Once connected, the live chat widget will appear on the page.
