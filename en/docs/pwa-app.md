# PWA App and Push Notifications

The admin panel at `/admin` works as a Progressive Web App (PWA) — it can be
installed on a phone or computer as a regular app, without an app store.
Besides a convenient full-screen view, the installed app can receive push
notifications about new messages even when it is minimized or fully closed.

## What This Gives You

- A home screen icon, launching without the browser's address bar.
- Push notifications about new incoming messages — they arrive even when the
  app is closed, and on iPhone they work all the way to a locked screen.
- An offline fallback screen instead of a blank page when the network drops.

## Installing on a Phone

### iPhone (Safari)

1. Open `https://{your domain}/admin` in Safari.
2. Tap the **"Share"** button at the bottom of the screen.
3. Choose **"Add to Home Screen"** and confirm.
4. Only launch the app from the home screen icon — a Safari tab open at the
   same address does not count: on iOS, push notifications and the system
   permission for them are only available inside an installed PWA.

Requirements: iOS 16.4 or newer, the site served over HTTPS with a real (not
self-signed) certificate.

### Android (Chrome)

1. Open `https://{your domain}/admin` in Chrome.
2. Open the menu (three dots) and choose **"Install app"** (or
   **"Add to Home screen"**).
3. Confirm the installation.

### Desktop (Chrome / Edge)

1. Open `https://{your domain}/admin`.
2. Click the install icon in the address bar (or open the browser menu →
   **"Install TG Support"**).

## Enabling Push Notifications

1. Inside the installed app, go to **"Settings → General"**
   (`/admin/settings/general`).
2. Turn on the **"Browser notifications"** toggle.
3. Allow notifications in the system dialog the browser shows.

The same toggle both requests the system permission and subscribes the device
for push — no separate subscription step is required.

## How It Works

The manifest and the service worker are served without authentication, so the
browser can fetch them independently of the session:

- `GET /admin/manifest.webmanifest` — the PWA manifest.
- `GET /admin/sw.js` — the service worker (static asset caching, offline
  fallback, receiving push, handling notification clicks).

Push notifications are built on Web Push (VAPID):

1. Keys are generated once with the command:

   ```bash
   docker exec -it pet php artisan webpush:generate-vapid-keys
   ```

   The command refuses to overwrite an existing key pair without the
   `--force` flag — regenerating the keys invalidates every current device
   subscription. There is no separate settings screen for these keys — like
   `avito.user_id`, they are captured automatically and stored through
   `SettingsService` (`webpush.vapid_public_key`, `webpush.vapid_private_key`,
   `webpush.vapid_subject`).

2. On every new incoming message, `SendWebPushNotificationJob` fires and sends
   a notification to every stored subscription (`push_subscriptions`). A
   subscription the push service reports as expired is deleted automatically.

3. The notification title is `"{Platform} · {sender name}"` (for example,
   "Telegram · Ivan Ivanov"), and the body is the message text, unmodified.

## Requirements and Limitations

- A real HTTPS certificate — iOS does not accept a self-signed certificate
  for Web Push.
- iOS 16.4 or newer — on older versions the Push API is not available in a
  PWA at all.
- Installing the `gmp` or `bcmath` PHP extension on the server is
  recommended — without them `minishlink/web-push` still works, but logs a
  performance warning on every send.

## Troubleshooting

**Notifications don't arrive on iPhone.** The most common cause is testing in
a Safari tab instead of the installed app: without adding it to the home
screen, iOS has no Push API at all, and the notification permission cannot be
requested. Open the app from the home screen icon specifically and enable
notifications again in settings.

**Check that the subscription was saved:**

```bash
docker exec -it pet php artisan tinker --execute="echo App\Models\PushSubscription::count();"
```

**Check delivery logs** — failed sends are written to
`storage/logs/app-{date}.log`:

```bash
docker exec pet grep -i "SendWebPushNotificationJob" storage/logs/app-*.log
```
