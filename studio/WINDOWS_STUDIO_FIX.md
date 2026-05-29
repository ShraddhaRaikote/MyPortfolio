# Fix Sanity Studio on Windows (HTTP warning + can’t type)

Your **seed works in the terminal** — the network path from **Node** to Sanity is fine.  
Studio fails because **Chrome** talks to Sanity on slow **HTTP/1.1** (often caused by antivirus HTTPS scanning). Studio then shows “Trying to connect…” and **won’t save edits**.

## What actually works today

### Edit content in the terminal (recommended)

```powershell
cd studio
npm run edit:profile
```

Or edit `studio/content/profile.json` and run:

```powershell
npm run push:content
```

## Try to fix Studio in the browser

### 1. Windows Security (Defender)

1. **Windows Security** → **Virus & threat protection** → **Manage settings**
2. Turn off **Real-time protection** temporarily (or add exclusions below)
3. **Exclusions** → add folders:
   - `C:\Users\sraikote\Documents\Portfolio\studio`
   - `C:\Program Files\Google\Chrome\Application`
   - `C:\Program Files\nodejs`
4. Reload Studio

If you use **Norton / McAfee / Kaspersky / Avast**, disable **HTTPS scanning** or **Web protection** there too.

### 2. Use token login in local Studio

This project can sign Studio in with your `.env` token (local only):

1. In `studio/.env` ensure you have:
   ```
   SANITY_STUDIO_LOCAL_AUTH=true
   SANITY_API_TOKEN=sk...your_token
   ```
2. Restart: `npm run dev`
3. Open **http://localhost:3333** (localhost is OK with token auth)

Do **not** set `SANITY_STUDIO_LOCAL_AUTH=true` before `npm run deploy`.

### 3. Hosted Studio

```powershell
cd studio
npm run deploy
```

Open **https://cq64slan.sanity.studio** and sign in with Google/email.

### 4. Check protocol in Chrome

1. F12 → **Network** → reload Studio  
2. Click `cq64slan.api.sanity.io`  
3. **Protocol** must be **h2** or **h3** — if it says **http/1.1**, antivirus/network is still blocking modern HTTP.

### 5. Clear debug flag

In Studio console:

```js
localStorage.removeItem('_sanity_debugProtocol');
location.reload();
```

## Why the yellow toast may stay on localhost

Even when things work, the dev server uses HTTP/1.1 between the browser and `localhost`, so the warning can appear. Focus on whether **fields save** and **“Trying to connect”** disappears—not only the toast.
