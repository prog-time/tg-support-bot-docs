# Подключение DeepSeek

Эта инструкция описывает настройку DeepSeek в качестве AI-провайдера
для TG Support Bot.

::: tip
Перед настройкой убедитесь, что AI-помощник подключён согласно
[базовой инструкции](/docs/ai-integration).
:::

## Получение API-ключа

1. Зарегистрируйтесь и войдите в [DeepSeek Platform](https://platform.deepseek.com/).
2. Создайте новый API-ключ в разделе управления ключами.
3. Скопируйте полученный ключ — он понадобится на следующем шаге.

## Настройка параметров в .env

Добавьте или обновите следующие переменные в файле `.env`:

```env
DEEPSEEK_CLIENT_SECRET=ваш_api_ключ
DEEPSEEK_BASE_URL=https://api.deepseek.com/chat/completions
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_MAX_TOKENS=1000
DEEPSEEK_TEMPERATURE=0.7
```

| Переменная                | Описание                                             |
| ------------------------- | ---------------------------------------------------- |
| `DEEPSEEK_CLIENT_SECRET`  | API-ключ DeepSeek                                    |
| `DEEPSEEK_BASE_URL`       | Базовый URL для запросов к API                       |
| `DEEPSEEK_MODEL`          | Используемая модель (например, `deepseek-chat`)      |
| `DEEPSEEK_MAX_TOKENS`     | Максимальное количество токенов в одном ответе       |
| `DEEPSEEK_TEMPERATURE`    | Степень креативности: `0` — строго, `1` — творчески |

## Включение DeepSeek

Укажите DeepSeek в качестве провайдера по умолчанию в файле `.env`:

```env
AI_ENABLED=true
AI_DEFAULT_PROVIDER=deepseek
```
