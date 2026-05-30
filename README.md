# Crystal Empire Online

MMORPG-lite crystal nurturing and alchemy game built with React, TypeScript, Vite, Zustand persistence, and optional Firebase cloud sync.

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Data

Progress is saved locally with `localStorage`. When Firebase Anonymous Auth and Firestore are enabled for the configured project, progress is also synced to:

```text
users/{uid}/state/game
```

The app includes the Crystal Garden Firebase web config in `src/firebaseConfig.ts`, with environment variables still supported through `.env.local`.

## Deploy

The repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.

On GitHub, set **Settings -> Pages -> Build and deployment -> Source** to **GitHub Actions**. After that, every push to `main` deploys the app to:

```text
https://lmt1102011.github.io/crystall-empire/
```
