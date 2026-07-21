# Topic Name Template

For every new conversation the bot creates a separate forum topic in the
Telegram supergroup. The template defines how that topic is named — for
example, `John Smith telegram` instead of a faceless number.

The name is generated once, at the moment the topic is created. Changing the
template does not rename topics that already exist.

## Where to configure it

1. Open the admin panel → **Settings → General**.
2. In the **"Conversations"** card, fill in the **"Topic name template"**
   field.
3. Click **"Save"**.

::: info
The "Conversations" card is only available to users with the administrator
role. Managers see just the notification settings on this page.
:::

The template is limited to 255 characters.

## Syntax

The template is a plain string with variables in curly braces substituted into
it:

```text
{first_name} {last_name} {platform}
```

Result:

```text
John Smith telegram
```

Text outside the braces is kept as is, so the template can be combined with any
words and characters:

```text
Request from {first_name} ({username})
```

## Available variables

| Variable | Description |
| --- | --- |
| `{id}` | User ID in the messenger |
| `{first_name}` | User's first name |
| `{last_name}` | User's last name |
| `{username}` | User's handle (without `@`) |
| `{email}` | User's email, if known |
| `{platform}` | Conversation channel: `telegram`, `vk`, `max` |

::: warning
The bot requests user data (first name, last name, handle) from Telegram. If
any variable used in the template turns out to be empty — for example, the user
has no `username` or hides the last name — the name is built using the fallback
format (see below).
:::

## Template examples

| Template | Result |
| --- | --- |
| `{first_name} {last_name} {platform}` | `John Smith telegram` |
| `Request from {first_name}` | `Request from John` |
| `#{id} — {first_name} ({platform})` | `#123456789 — John (telegram)` |
| `{username} / {platform}` | `john_smith / telegram` |

## Fallback name

If the template cannot be applied, the bot still creates the topic — but names
it using the default format:

```text
#{user id} ({channel})
```

For example: `#123456789 (telegram)`.

This happens in the following cases:

- the template field is empty;
- the template contains no variables at all (plain text only);
- the template contains only the `{platform}` variable — add at least one
  variable with user data next to it;
- a variable name does not exist;
- one of the listed variables is empty or unavailable;
- the user data could not be fetched from the messenger.

::: tip
To avoid fallback names, use only the variables that every user has — for
example `{id}` and `{first_name}`. The `{last_name}`, `{username}`, and
`{email}` variables are not always filled in.
:::

## Conversations from external sources

The template is not applied to conversations that arrive through the
[external API](/en/docs/admin-panel). Such topics are always named using the
format:

```text
#{user id} ({source name})
```

The source name is taken from the API source settings in the
**"API & Webhooks"** section.

## Possible errors

**The topic is named `#123456789 (telegram)` instead of using the template.**
The fallback name kicked in. Make sure the template field is filled in,
contains at least one variable in curly braces, and that every variable used is
available for that user.

**I changed the template, but old topic names did not change.**
That is by design: the name is assigned when the topic is created. The new
template applies to subsequent conversations.

**Typo in a variable name.**
An unknown variable is not substituted — it switches the name to the fallback
format. Names are case-sensitive, so write them exactly as in the table above.
