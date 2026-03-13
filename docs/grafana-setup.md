# Настройка Grafana для TG Support Bot

В этой статье описан процесс базовой настройки Grafana для работы
с логами TG Support Bot.

::: warning Важное изменение
Ранее Grafana была доступна напрямую через IP-адрес с указанием порта
Docker-контейнера. Теперь Grafana работает на отдельном поддомене.
:::

## Видеоинструкции

<!-- markdownlint-disable MD033 -->
<div class="video-buttons">
  <a href="https://youtu.be/vfG9U_Hifhc"
     class="but-video but-video-youtube" target="_blank">YouTube</a>
</div>
<!-- markdownlint-enable MD033 -->

## Авторизация

Откройте в браузере адрес:

```
https://grafana.{ваш_домен}
```

Данные для входа задаются в файле `.env`:

- `GRAFANA_USER`
- `GRAFANA_PASSWORD`

## Подключение Loki

После входа в Grafana необходимо подключить Loki для просмотра логов бота.

1. Перейдите в раздел **Connections**.

2. В строке поиска введите `Loki` и выберите его из списка.

   <!-- markdownlint-disable MD033 -->
   <img width="80%" alt="Поиск Loki в разделе Connections"
     src="/images/grafana-setup/loki-search.png" />
   <!-- markdownlint-enable MD033 -->

3. На странице подключения укажите адрес Loki. По умолчанию:

   ```
   http://loki:3100
   ```

   <!-- markdownlint-disable MD033 -->
   <img width="80%" alt="Настройка адреса Loki"
     src="/images/grafana-setup/loki-address.png" />
   <!-- markdownlint-enable MD033 -->

4. Нажмите **Save & test** для сохранения и проверки подключения.

## Просмотр логов

1. Перейдите в раздел **Explore**.
2. В качестве источника данных выберите подключённый **Loki**.

   <!-- markdownlint-disable MD033 -->
   <img width="80%" alt="Выбор Loki в разделе Explore"
     src="/images/grafana-setup/loki-explore.png" />
   <!-- markdownlint-enable MD033 -->

На этом базовая настройка Grafana завершена.
