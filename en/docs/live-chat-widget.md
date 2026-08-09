# Live Chat Widget

This guide explains how to connect the TG Support Bot live chat widget
to your website.

## How live chat works

- A pop-up chat widget is displayed on your website.
- On the first message, the browser creates a unique conversation id and
  stores it in `localStorage` — this is how the widget recognizes a
  returning visitor.
- Messages from the widget (text and files, up to 20 MB) are delivered to
  Telegram and to the admin panel, where a separate chat topic is created
  for each visitor.
- Managers reply in that topic — the reply appears in the widget on the
  website instantly.

The widget is a static JS file shipped with the bot. All of its source
lives in your copy of the bot's code, and you can change its logic if
you wish.

## 1. Create a "Live Chat" source

Go to the **"API & Webhooks"** section and click the **"Add source"**
button.

In the dialog that opens, pick a source type:
- **"API source"** — a bearer token and webhook, for integrating an
  external system over REST.
- **"Live Chat"** — a public key for the JS widget, for embedding on a
  third-party website.

Choose **"Live Chat"** — the source is created and you are taken straight
to its settings page.

## 2. Configure the source and generate a key

On the source page:

1. Adjust the **"Source name"** field if you like — it is only used to
   display the source in the sources list.
2. Fill in **"Allowed domains"** — one domain per line (e.g. `example.com`,
   or `*.example.com` for all subdomains). Leaving it empty means the key
   works from any website; on a production site, set the domain explicitly.
3. Click **"Generate key"**. A public key (in the form `pub_xxxxxxxx…`) is
   issued and shown on screen once — copy it immediately. If the key is
   ever lost or compromised, you can regenerate it; the old key stops
   working as soon as you do.

Once the key is generated, a ready-to-paste embed snippet appears below it
— you can copy it as-is, no manual assembly needed.

## 3. Add the widget to your site

Insert the widget connection script into your site, right before the
closing `</body>` tag:

```html
<script
  src="https://{support domain}/widget/widget.js"
  data-domain="https://{support domain}"
  data-key="pub_xxxxxxxx"
  data-greeting="Write to us, we are online!"
  data-manager="Support"
  defer
></script>
```

| Attribute | Required | Purpose |
|---|---|---|
| `src` | yes | the widget script URL: `https://{support domain}/widget/widget.js` |
| `data-domain` | yes | the address of your bot instance (without the trailing `/widget/widget.js`) |
| `data-key` | yes | the public key obtained in step 2 |
| `data-greeting` | no | the widget's greeting text (default: "Write to us, we are online!") |
| `data-manager` | no | the name shown as the author of replies (default: "Support") |

Once connected, the live chat widget will appear on the page.

## Current limitations

- Conversation history is stored in the visitor's browser (`localStorage`)
  and is not tied to an account — clearing site data, or switching device
  or browser, loses the history.
- The conversation id is not signed (no HMAC) — this is an accepted risk
  in the current version.
