# Edit content when Studio fields won’t save

If you see **“Trying to connect…”** or the HTTP warning, Studio cannot sync edits to Sanity. The form looks editable but **nothing saves**.

## Option A — Push from files (recommended)

1. Create a real API token: [sanity.io/manage](https://sanity.io/manage) → **cq64slan** → **API** → **Tokens** → **Editor**
2. Put it in `studio/.env` (replace the placeholder line):

   ```
   SANITY_API_TOKEN=sk...your_real_token
   ```

3. Edit `studio/content/profile.json` (name, bio, etc.)
4. In PowerShell:

   ```powershell
   cd studio
   npm install
   $env:NODE_USE_SYSTEM_CA="1"
   npm run push:content
   ```

5. Reload Studio in the browser — values should appear (read-only until connection is fixed).

## Option B — Seed everything at once

```powershell
cd studio
$env:NODE_USE_SYSTEM_CA="1"
npm run seed
```

Creates Profile, Projects, Skills, and all other placeholder docs.

## Fix Studio so typing works again

### Local proxy (built into this project)

1. Stop Studio, then from `studio/` run: `npm run dev`
2. Open **`http://cq64slan.localhost:3333`** (not `localhost:3333`).
3. In [Sanity Manage](https://sanity.io/manage) → **API** → **CORS**, add:
   - `http://cq64slan.localhost:3333` — **Allow credentials: Yes**
4. Run `npm run dev:fix` for a checklist, or `fix-studio.ps1`.

### Other steps

1. DevTools → Console on Studio:

   ```js
   localStorage.removeItem('_sanity_debugProtocol'); location.reload();
   ```

2. Turn off antivirus **HTTPS scanning** / web protection, reload Studio.

3. Try **hosted Studio** (often more stable):

   ```powershell
   cd studio
   npm run deploy
   ```

   Open `https://cq64slan.sanity.studio` and sign in.

4. Or use **Microsoft Edge** in a new profile (no extensions).

When **Protocol** in Network tab is `h2` or `h3` (not `http/1.1`), fields will save normally.
