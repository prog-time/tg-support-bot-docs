# Подключение GigaChat

Эта инструкция описывает настройку GigaChat в качестве AI-провайдера
для TG Support Bot.

::: tip
Перед настройкой убедитесь, что AI-помощник подключён согласно
[базовой инструкции](/docs/ai-integration).
:::

## Получение API-ключа

1. Войдите в личный кабинет GigaChat.
2. Перейдите в раздел **Настройка API**.
3. Скопируйте значения **Client ID** и **Authorization key** — они понадобятся на следующем шаге.

<!-- markdownlint-disable MD033 -->
<img width="1000" height="400" alt="Настройка API в личном кабинете GigaChat" src="/images/ai-gigachat/api-settings.png" />
<!-- markdownlint-enable MD033 -->

## Получение сертификата Минцифры

Для отправки запросов к GigaChat требуется сертификат безопасности от Минцифры России.
Инструкция по его получению приведена в официальной документации:
[Сертификаты GigaChat](https://developers.sber.ru/docs/ru/gigachat/certificates).

После загрузки поместите файл `.crt` в директорию `storage/certs`.

## Настройка параметров в .env

Добавьте или обновите следующие переменные в файле `.env`:

```env
GIGACHAT_CLIENT_SECRET=ваш_authorization_key
GIGACHAT_BASE_URL=https://gigachat.devices.sberbank.ru/api/v1
GIGACHAT_CLIENT_ID=ваш_client_id
GIGACHAT_MODEL=GigaChat-2-Max
GIGACHAT_MAX_TOKENS=1000
GIGACHAT_TEMPERATURE=0.7
GIGACHAT_CERT_PATH="certs/russian_trusted_root_ca_pem.crt"
```

| Переменная                 | Описание                                                                     |
| -------------------------- | ---------------------------------------------------------------------------- |
| `GIGACHAT_CLIENT_SECRET`   | Authorization key из личного кабинета GigaChat                               |
| `GIGACHAT_BASE_URL`        | Базовый URL API — всегда `https://gigachat.devices.sberbank.ru/api/v1`       |
| `GIGACHAT_CLIENT_ID`       | Client ID из личного кабинета GigaChat                                       |
| `GIGACHAT_MODEL`           | Используемая модель (на текущий момент доступна `GigaChat-2-Max`)            |
| `GIGACHAT_MAX_TOKENS`      | Максимальное количество токенов в одном ответе                               |
| `GIGACHAT_TEMPERATURE`     | Степень креативности: `0` — строго, `1` — творчески                         |
| `GIGACHAT_CERT_PATH`       | Путь к сертификату относительно директории `storage` (например, `certs/russian_trusted_root_ca_pem.crt`) |

## Включение GigaChat

Укажите GigaChat в качестве провайдера по умолчанию в файле `.env`:

```env
AI_ENABLED=true
AI_DEFAULT_PROVIDER=gigachat
```
