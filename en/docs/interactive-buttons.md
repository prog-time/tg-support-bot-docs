# Interactive Buttons

A manager can insert buttons directly into the reply text — with no code setup,
using a simple syntax inside double square brackets.

## Syntax

```text
[[Button label|type:value]]
```

Buttons without a type are sent as text buttons (reply keyboard):

```text
[[Button label]]
```

## Usage Example

```text
Choose a convenient way to contact us:
[[Call us|phone:+79001234567]]
[[Open website|url:https://example.com]]
[[Yes, confirm|callback:confirm]]
```

::: tip
Multiple buttons on the same line without a line break are displayed in a single row.
:::

## Button Types

| Type | Description | Example value |
| --- | --- | --- |
| `url` | Open a link in the browser | `https://example.com` |
| `phone` | Dial a phone number | `+79001234567` |
| `callback` | Send callback data to the bot | `confirm` |
| `pay` | Payment button (Telegram) | — |

A button without a type creates a reply keyboard element with arbitrary text.

## Platform Support

| Platform | `url` | `phone` | `callback` |
| --- | :---: | :---: | :---: |
| Telegram | + | + | + |
| VK | + | — | + |
| Max | + | — | + |
| Website Widget | + | + | + |
| External API | + | + | + |

::: info
Buttons are automatically removed from the message text before it is sent to the client.
Inline buttons (`url`, `callback`) take priority over reply keyboard buttons.
:::
