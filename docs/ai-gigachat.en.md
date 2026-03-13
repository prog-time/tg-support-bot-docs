# Connecting GigaChat

This guide explains how to configure GigaChat as an AI provider
for TG Support Bot.

::: tip
Before proceeding, make sure the AI assistant is enabled by following
the [base integration guide](/docs/ai-integration).
:::

## Getting an API Key

1. Log in to your GigaChat account.
2. Navigate to the **API Settings** section.
3. Copy the **Client ID** and **Authorization key** — you will need them in the next step.

<!-- markdownlint-disable MD033 -->
<img width="1000" height="400" alt="GigaChat API Settings page" src="/images/ai-gigachat/api-settings.png" />
<!-- markdownlint-enable MD033 -->

## Obtaining the Ministry of Digital Development Certificate

Requests to GigaChat require a security certificate issued by the Russian Ministry of Digital Development.
Follow the instructions in the official documentation:
[GigaChat Certificates](https://developers.sber.ru/docs/ru/gigachat/certificates).

Once downloaded, place the `.crt` file in the `storage/certs` directory.

## Configuring .env Parameters

Add or update the following variables in your `.env` file:

```env
GIGACHAT_CLIENT_SECRET=your_authorization_key
GIGACHAT_BASE_URL=https://gigachat.devices.sberbank.ru/api/v1
GIGACHAT_CLIENT_ID=your_client_id
GIGACHAT_MODEL=GigaChat-2-Max
GIGACHAT_MAX_TOKENS=1000
GIGACHAT_TEMPERATURE=0.7
GIGACHAT_CERT_PATH="certs/russian_trusted_root_ca_pem.crt"
```

| Variable                   | Description                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `GIGACHAT_CLIENT_SECRET`   | Authorization key from your GigaChat account                                             |
| `GIGACHAT_BASE_URL`        | API base URL — always `https://gigachat.devices.sberbank.ru/api/v1`                      |
| `GIGACHAT_CLIENT_ID`       | Client ID from your GigaChat account                                                     |
| `GIGACHAT_MODEL`           | Model to use (currently `GigaChat-2-Max` is available)                                   |
| `GIGACHAT_MAX_TOKENS`      | Maximum number of tokens in a single response                                            |
| `GIGACHAT_TEMPERATURE`     | Creativity level: `0` — deterministic, `1` — highly creative                            |
| `GIGACHAT_CERT_PATH`       | Path to the certificate file relative to the `storage` directory (e.g. `certs/russian_trusted_root_ca_pem.crt`) |

## Enabling GigaChat

Set GigaChat as the default provider in your `.env` file:

```env
AI_ENABLED=true
AI_DEFAULT_PROVIDER=gigachat
```
