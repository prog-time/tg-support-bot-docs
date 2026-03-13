# Настройка PgAdmin для TG Support Bot

В этой статье описан процесс базовой настройки PgAdmin для подключения
к базе данных TG Support Bot.

::: warning Важное изменение
Ранее PgAdmin был доступен напрямую через IP-адрес с указанием порта
Docker-контейнера. Теперь PgAdmin работает на отдельном поддомене.
:::

## Авторизация

Откройте в браузере адрес:

```
https://pgadmin.{ваш_домен}
```

Данные для входа задаются в файле `.env`:

- `PGADMIN_EMAIL`
- `PGADMIN_PASSWORD`

## Подключение к базе данных

1. Нажмите кнопку **Add New Server**.

   <!-- markdownlint-disable MD033 -->
   <img width="80%" alt="Кнопка Add New Server"
     src="/images/pgadmin-setup/step-1-add-server.png" />
   <!-- markdownlint-enable MD033 -->

2. На вкладке **General** укажите название подключения —
   оно будет отображаться в боковом меню.

   <!-- markdownlint-disable MD033 -->
   <img width="80%" alt="Вкладка General — название подключения"
     src="/images/pgadmin-setup/step-2-general-tab.png" />
   <!-- markdownlint-enable MD033 -->

3. Перейдите на вкладку **Connection** и заполните параметры подключения.
   Значения берутся из файла `.env`.

   <!-- markdownlint-disable MD033 -->
   <img width="50%" alt="Вкладка Connection — параметры подключения"
     src="/images/pgadmin-setup/step-3-connection-tab.png" />
   <!-- markdownlint-enable MD033 -->

4. Нажмите **Save** для сохранения подключения.

На этом базовая настройка PgAdmin завершена.
