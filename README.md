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


## Project structure

- `src/App.jsx`: core game loop and state
- `src/components/RhythmTrack.jsx`: falling note renderer
- `src/hooks/useMicrophone.js`: microphone volume hook

## Notes

This project currently uses plain JavaScript and inline styles for fast iteration.
