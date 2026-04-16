# Rhythm Voice Battle

A small rhythm game built with React + Vite where you use your microphone volume to hit falling notes and defeat the enemy.

## Gameplay

- Press **Start Game**.
- Notes fall down the track.
- Make short voice bursts near the hit timing to damage the enemy.
- Reduce HP to 0 to win.

## Controls and mechanics

- Microphone input is read in real time using the Web Audio API.
- A volume threshold is used so only loud enough sounds count as hits.
- Rapid repeated sounds are throttled slightly to encourage rhythmic taps.

## Development

### Prerequisites

- Node.js 20+ (recommended)
- npm

### Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL (usually `http://localhost:5173`) and allow microphone access in your browser.

### Quality checks

```bash
npm run lint
npm run build
```

## Deploy to GitHub Pages

This repository includes a workflow at `.github/workflows/deploy.yml` that deploys automatically when you push to `main`.

1. Push this project to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab).
5. Your app will be available at:

```text
https://<your-github-username>.github.io/<your-repo-name>/
```

> The Vite `base` path is configured automatically in CI using `GITHUB_REPOSITORY`, so asset URLs work on Pages.

### If deployment fails with `HttpError: Not Found (404)`

This usually means GitHub Pages has not been enabled for the repository yet.

- Open: `https://github.com/<your-username>/<your-repo>/settings/pages`
- In **Build and deployment**, set **Source** to **GitHub Actions**
- Save, then re-run the failed workflow from the **Actions** tab

## Project structure

- `src/App.jsx`: core game loop and state
- `src/components/RhythmTrack.jsx`: falling note renderer
- `src/hooks/useMicrophone.js`: microphone volume hook

## Notes

This project currently uses plain JavaScript and inline styles for fast iteration.
