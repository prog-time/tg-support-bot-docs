# Подключение OpenAI

Эта инструкция описывает настройку OpenAI в качестве AI-провайдера
для TG Support Bot.

::: tip
Перед настройкой убедитесь, что AI-помощник подключён согласно
[базовой инструкции](/docs/ai-integration).
:::

## Получение API-ключа

1. Войдите в [OpenAI API Keys](https://platform.openai.com/account/api-keys).
2. Создайте новый ключ и скопируйте его — он понадобится на следующем шаге.

## Настройка параметров в .env

Добавьте или обновите следующие переменные в файле `.env`:

```env
OPENAI_API_KEY=ваш_api_ключ
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7
```

| Переменная           | Описание                                                              |
| -------------------- | --------------------------------------------------------------------- |
| `OPENAI_API_KEY`     | API-ключ OpenAI                                                       |
| `OPENAI_BASE_URL`    | Базовый URL API — по умолчанию `https://api.openai.com/v1`           |
| `OPENAI_MODEL`       | Используемая модель (например, `gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`) |
| `OPENAI_MAX_TOKENS`  | Максимальное количество токенов в одном ответе                        |
| `OPENAI_TEMPERATURE` | Степень креативности: `0` — строго, `1` — творчески                  |

## Включение OpenAI

Укажите OpenAI в качестве провайдера по умолчанию в файле `.env`:

```env
AI_ENABLED=true
AI_DEFAULT_PROVIDER=openai
```
