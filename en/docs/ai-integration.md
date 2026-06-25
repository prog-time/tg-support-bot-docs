# Connecting the AI Assistant

TG Support Bot supports integration with several AI assistants.
The list of available providers is in the configuration under the **"AI Assistant"** section.

The basic setup is described below using OpenAI as an example.

To use the AI assistant, you need to provide credentials for one of the providers.

## Providing credentials for the AI Assistant

Go to the **"AI Assistant"** section, select the desired provider, and fill in the credentials.

More details on each provider:

[DeepSeek guide](/en/docs/ai-deepseek)

[GigaChat guide](/en/docs/ai-gigachat)

[OpenAI guide](/en/docs/ai-openai)

## Using the AI Assistant in a Telegram group

To use the AI assistant in a Telegram group, you need to create a separate Telegram bot.

This is necessary so that messages from the assistant are visually distinct from operator messages.

1. Create a new bot via [@BotFather](https://t.me/BotFather).
2. Go to the **"Integrations"** section, to the **"AI Assistant Bot"** card.
3. Enter the bot token in the **"AI Bot Token"** field.

## Configuring AI Assistant behavior

In the **"AI Assistant"** section, in the **"General Settings"** block, you can specify a prompt that defines the behavior and response style of the AI assistant.

In it, specify:

- standard answers to frequently asked questions;
- links to helpful materials and documentation;
- requirements for communication style and tone of responses.

## AI Assistant operating modes

AI-powered response generation has 2 operating modes:
- generation and automatic sending of messages
- generation of a message and a request for confirmation
