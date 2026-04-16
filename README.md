diff --git a/README.md b/README.md
index 4601fe6cb3f4b9c3a288ec56ab15180432453c65..b72bd21cf19cf8300b719f0d0a72ddc4bec0ce6b 100644
--- a/README.md
+++ b/README.md
@@ -1,17 +1,49 @@
-# React + Vite
+# Rhythm Voice Battle
 
-This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
+A small rhythm game built with React + Vite where you use your microphone volume to hit falling notes and defeat the enemy.
 
-Currently, two official plugins are available:
+## Gameplay
 
-- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
-- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
+- Press **Start Game**.
+- Notes fall down the track.
+- Make short voice bursts near the hit timing to damage the enemy.
+- Reduce HP to 0 to win.
 
-## React Compiler
+## Controls and mechanics
 
-The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
+- Microphone input is read in real time using the Web Audio API.
+- A volume threshold is used so only loud enough sounds count as hits.
+- Rapid repeated sounds are throttled slightly to encourage rhythmic taps.
 
-## Expanding the ESLint configuration
+## Development
 
-If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
-"# ritme-sound-ah-game" 
+### Prerequisites
+
+- Node.js 20+ (recommended)
+- npm
+
+### Run locally
+
+```bash
+npm install
+npm run dev
+```
+
+Then open the local Vite URL (usually `http://localhost:5173`) and allow microphone access in your browser.
+
+### Quality checks
+
+```bash
+npm run lint
+npm run build
+```
+
+## Project structure
+
+- `src/App.jsx`: core game loop and state
+- `src/components/RhythmTrack.jsx`: falling note renderer
+- `src/hooks/useMicrophone.js`: microphone volume hook
+
+## Notes
+
+This project currently uses plain JavaScript and inline styles for fast iteration.
