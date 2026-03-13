# Live Chat Widget

This guide explains how to connect the TG Support Bot live chat widget to your
website.

::: warning Requirement: Docker Compose
The live chat widget is available **only when using Docker Compose**, because it
requires a Node.js service that runs in a dedicated container.
:::

## How the live chat works

- A chat widget is displayed on your website.
- When a user sends their first message, a unique session key is generated and
  stored in their browser session.
- Messages from the widget are forwarded to Telegram, where a dedicated topic
  thread is created for each user.
- Managers reply inside that topic — the reply appears instantly in the widget
  on the website.

Message history persists for the duration of the client-side session.

All source code is part of your own copy of the bot, so you can customise the
unique-key generation logic if needed.

Messages are delivered via a Node.js container using Socket.io for WebSocket
communication.

::: tip Demo
You can try out the live chat widget at
[tg-support-bot.ru/preview/chat](https://tg-support-bot.ru/preview/chat).
:::

## 1. Connect to the container

All commands below must be run inside the main application container. Navigate
to the project directory and run:

```bash
docker compose exec app bash
```

## 2. Generate an API key

Generate an API key for the live chat:

```bash
php artisan app:generate-token live_chat https://node.{domain}/push-message
```

After running the command, the API key will be printed to the console and a
`live_chat` source entry will be added to the database.

## 3. Configure .env variables

Add or update the following variables in your `.env` file:

```env
API_TOKEN=your_live_chat_api_key
ALLOWED_ORIGINS="https://example.com,https://admin.example.com"
VITE_APP_NAME="${APP_NAME}"
```

| Variable          | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `API_TOKEN`       | API key generated for the live chat                                             |
| `ALLOWED_ORIGINS` | Domains where the widget is hosted (comma-separated)                            |
| `VITE_APP_NAME`   | Application name passed into the Vite build; typically references `$APP_NAME`  |

## 4. Build the widget

You need to install dependencies and build the bundle before using the widget.

Install dependencies (run on first setup and whenever dependencies change):

```bash
npm install
```

Build the bundle (run on first setup and after every `.env` change):

```bash
npm run build
```

If the build succeeds, the file `widget.js` will be created at
`public/live_chat/dist/widget.js`.

## 5. Add the widget to your website

To embed the widget, add one stylesheet and two scripts to your page.

Add the stylesheet inside the `<head>` tag:

```html
<link rel="stylesheet" href="https://{bot-domain}/live_chat/css/style.css">
```

Add the scripts before the closing `</body>` tag:

```html
<script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
<script src="https://{bot-domain}/live_chat/dist/widget.js?token={api-token}" defer></script>
```

Once the files are connected, the live chat widget will appear on your page.

## Connection checklist

- [ ] API key generated (`app:generate-token`)
- [ ] `API_TOKEN` set in `.env`
- [ ] `ALLOWED_ORIGINS` includes your website domain
- [ ] `VITE_APP_NAME` set in `.env`
- [ ] Dependencies installed (`npm install`)
- [ ] Bundle built (`npm run build`)
- [ ] File `public/live_chat/dist/widget.js` exists
- [ ] Stylesheet and scripts added to the page
- [ ] Widget is visible on the page
