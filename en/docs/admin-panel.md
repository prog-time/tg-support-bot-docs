# Admin Panel

The `/admin` web panel is the main interface for the support team.

## Access

Panel address: `https://{your domain}/admin`

To sign in, you need an account from the `users` table.

Create a new user via artisan:

```bash
docker exec pet php artisan app:create-admin-user
```

## Panel sections

### Conversations

Route: `/admin/chats`

The main section for handling support requests. Displays a list of all conversations.

<!-- markdownlint-disable MD033 -->
<img width="800" height="fit-content" alt="Authorization on the Max platform" src="/images/admin/1.png" />
<!-- markdownlint-enable MD033 -->

### Integrations

Route: `/admin/settings/integrations`

Shows all available integrations. In this section you can connect integrations for your technical support.

### AI Assistant

Route: `/admin/settings/ai`

AI Assistant settings, which include:
- connecting and configuring an AI provider
- AI assistant operation parameters
- a field for entering the system prompt

### API Settings

Route: `/admin/settings/api-webhooks`

Management of external sources integrated through the REST API.

Creating a source:

1. Click **"Add source"**.
2. When you click it, a new API source is created automatically.
3. Fill in the fields:
   - **"Name"**, which will be displayed in the list of API sources
   - **"Webhook URL"**, the address to which replies from managers will be sent

### Team

Route: `/admin/settings/team`

Management of operators and roles in the support team.

Creating a user through the panel:

1. Go to "Settings → Team".
2. Click "Add".
3. Fill in the name, email, password (at least 8 characters), and role.

Creating via artisan:

```bash
docker exec pet php artisan app:create-admin-user
```
