# Deploying the Library Management System

Three separate pieces, three separate places:

```
GitHub Pages  --fetch()-->  Render (Express API)  --SQL-->  Neon (Postgres)
  (frontend)                     (backend)                  (database)
```

## 1. Database — Neon

1. Go to neon.tech, sign in, create a project.
2. In the Neon dashboard, open **SQL Editor**, paste the contents of `schema.sql`, and run it.
3. Go to **Connection Details** and copy the connection string. It looks like:
   `postgresql://user:password@ep-xxxx.neon.tech/library_db?sslmode=require`

## 2. Backend — Render

1. Push this repo to GitHub (see main README).
2. Go to render.com → **New +** → **Web Service** → connect your repo.
3. Set the **Root Directory** to `backend` (since the server code lives in that subfolder).
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment**, add:
   - `DATABASE_URL` = the Neon connection string from step 1
6. Deploy. Render will give you a URL like `https://your-app.onrender.com`.
7. Test it: visit `https://your-app.onrender.com/api/health`.

Note: Render's free tier spins down after inactivity — the first request after idling can take 30-50 seconds to wake up. That's normal.

## 3. Frontend — GitHub Pages

1. In `frontend/index.html`, update the API base URL to your live Render URL:
   ```js
   const API_BASE = 'https://your-app.onrender.com/api/books';
   ```
2. Commit and push that change.
3. In your GitHub repo: **Settings → Pages → Source → main branch → /frontend folder** (or root, depending on your setup).
4. GitHub will give you a URL like `https://yourusername.github.io/your-repo/`.

## 4. Lock down CORS (recommended once it works)

In `server.js`, replace the open CORS config with your actual GitHub Pages URL:
```js
app.use(cors({ origin: 'https://yourusername.github.io' }));
```

## Order to do this in

Database first (you need the connection string) → Backend second (you need the live URL) → Frontend last (it needs the backend's URL to call).
