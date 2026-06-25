# Introduction

**TG Support Bot** is a multi-channel customer support service that receives
requests from various messengers and social networks and organizes work with
them through a single system.

Supported incoming request channels:

- **Telegram** — via a public bot;
- **VK** — via VKontakte community messages;
- **Max** — via the platform's bot;
- **External API** — integration from any third-party service;
- **Live chat widget** — an embeddable widget for your website.

Telegram community for questions and discussions: [t.me/pt\_tg\_support](https://t.me/pt_tg_support)

Source code: [github.com/prog-time/tg-support-bot](https://github.com/prog-time/tg-support-bot)

## How it works

Every incoming request goes through five steps:

1. **Receiving the message.** The customer writes to one of the connected
   channels — the Telegram bot, VK, Max, the website widget, or via the external API.
2. **Forwarding the message.** The incoming message, along with its metadata
   (channel, customer name, content type), is forwarded to the single system.
3. **Delivering the reply.** The bot automatically sends the reply back to the
   customer through the channel the request came from.

## Key features

### Multi-channel

- Receiving requests from Telegram, VK, Max, the website widget, and the external API.
- A single processing interface for all channels.

### Communication types

- Text messages, photos, videos, documents, voice and video messages.
- Sending contacts and geolocation (where supported by the platform).
- Interactive buttons in messages — simple syntax right from the reply text.

### Moderation

- Blocking users.
- The ability to close or reopen a topic manually.
- A full log of all incoming and outgoing messages.

### Automation

- **AI assistant** — automatic replies based on a knowledge base; OpenAI,
  DeepSeek, and GigaChat are supported.
- **Message queues** — reliable processing even under high
  load.
- Customizable reply templates and request routing.

### Monitoring

- **Laravel Telescope** — metrics visualization and centralized log collection.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Backend | Laravel 12, PHP 8.2, PostgreSQL |
| DevOps | Docker, Docker Compose, Nginx, Certbot |
| Monitoring | Laravel Telescope |

## Supported message types

| Type | Telegram | VK | Max | Website widget | External API |
| --- | :---: | :---: | :---: | :---: | :---: |
| Text | + | + | + | + | + |
| Photo | + | + | + | + | + |
| Video | + | + | + | — | + |
| Document / file | + | + | + | + | + |
| Voice message | + | + | + | — | — |
| Video message (round) | + | — | — | — | — |
| Contact | + | — | — | — | — |
| Geolocation | + | — | — | — | — |
| Sticker | + | — | — | — | — |

## What's next

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose) — a quick
  start on a VPS in a few minutes.
- [Installation on hosting](/en/docs/installation-on-hosting) — a Docker-free option.
- [Connecting the AI assistant](/en/docs/ai-integration) — configuring automatic replies.
- [Interactive buttons](/en/docs/interactive-buttons) — sending buttons to the customer right from the reply.
