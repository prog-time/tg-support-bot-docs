# Connecting OpenAI

This guide explains how to configure OpenAI as the AI provider
for TG Support Bot.

::: tip
Before proceeding, make sure the AI assistant is enabled by following the
[base integration guide](/en/docs/ai-integration).
:::

## Getting an API Key

1. Sign in to [OpenAI API Keys](https://platform.openai.com/account/api-keys).
2. Generate a new key and copy it — you will need it in the next step.

## Configuring .env

Add or update the following variables in your `.env` file:

```env
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
```

| Variable             | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `OPENAI_API_KEY`     | Your OpenAI API key                                                         |
| `OPENAI_BASE_URL`    | Base URL for API requests — defaults to `https://api.openai.com/v1`        |
| `OPENAI_MODEL`       | Model to use (e.g. `gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`)              |
| `OPENAI_MAX_TOKENS`  | Maximum number of tokens in a single response                               |
| `OPENAI_TEMPERATURE` | Creativity level: `0` — deterministic, `1` — creative                      |

## Enabling OpenAI

Set OpenAI as the default provider in your `.env` file:

```env
AI_ENABLED=true
AI_DEFAULT_PROVIDER=openai
```
