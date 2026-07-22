# Connecting Email

Email is a built-in support channel over IMAP and SMTP. Unlike Telegram, VK
and Max, the module doesn't use a webhook: incoming mail is polled on a
schedule (once a minute), and manager replies are sent over SMTP. It works
with any mail provider — Yandex, Mail.ru, Gmail (with an app password) or a
corporate mailbox — there are no provider-specific presets.

::: info Prerequisites
Before connecting, make sure the project is deployed using one of the guides:

- [Installation via Docker Compose](/en/docs/installation-on-docker-compose)
- [Installation on hosting](/en/docs/installation-on-hosting)
:::

## 1. Prepare the mailbox

You'll need the mailbox address and password, plus your mail provider's
server settings (usually listed in the provider's help docs):

- **IMAP** (incoming) — host, port (usually `993`) and encryption (`SSL`);
- **SMTP** (outgoing) — host, port (usually `587`) and encryption (`TLS`).

::: warning Gmail and Google Workspace
Your regular account password won't work — create an
[app password](https://support.google.com/accounts/answer/185833) and use
that instead.
:::

## 2. Configuring the integration

1. Go to the **"Settings" -> "Integrations"** section.
2. Click the **"Email"** card — it opens the channel's settings page
   directly (no intermediate screen, unlike Telegram/VK/Max).
3. Fill in the fields:
   - **Username** and **Password** — the mailbox credentials;
   - **IMAP (incoming)** — host, port, encryption;
   - **SMTP (outgoing)** — host, port, encryption;
   - **From address** — shown to the user in the "From" field;
   - **From name** — optional.
4. Click **"Save"** — the connection is verified over both IMAP and SMTP;
   if either check fails, nothing is saved and the form shows the reason.

## 3. Ignoring newsletters and auto-replies

To stop newsletters, notifications and auto-replies from turning into
support tickets, add their addresses to the **"Ignore emails from"** field
(one address per line). To block an entire domain, enter it as
`@domain.com`. Matching emails never create a ticket and never enter the
support queue.

## Verification

1. Send an email to the connected address from a regular mailbox.
2. Within a minute, the email appears in the connected Telegram group (or
   in the admin panel's **"Chats"** section if no group is configured) —
   mail is polled on a schedule, so there may be a short delay.
3. Reply from the Telegram topic or the admin panel — the reply is
   delivered to the user over SMTP, with the correct subject (`Re: ...`)
   threaded to the original email.

## Attachments

Incoming emails are processed as text only — attachments from a
customer's email aren't accepted. A manager's reply, on the other hand,
can include a single file (including a photo) — it's delivered to the
customer as a regular email attachment.

## Current version limitations

- **Incoming email is text only.** Attachments from customers aren't
  accepted or stored.
- **No interactive buttons.** The post-close rating prompt is sent to the
  recipient as plain text, with no tappable stars.
