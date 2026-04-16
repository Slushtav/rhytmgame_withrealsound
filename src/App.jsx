import { useEffect, useRef, useState } from "react";
import Enemy from "./components/Enemy";
import HpBar from "./components/HpBar";
import RhythmTrack from "./components/RhythmTrack";
import useMicrophone from "./hooks/useMicrophone";

const MAX_HP = 100;
const DAMAGE = 10;
const HIT_WINDOW = 250;

// 🔊 lebih sensitif
const THRESHOLD = 35;

function App() {
  const [hp, setHp] = useState(MAX_HP);
  const [gameState, setGameState] = useState("idle");
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [notes, setNotes] = useState([]);

  const hitNotes = useRef(new Set());
  const animationRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const lastSoundRef = useRef(0);
  const noteIdRef = useRef(0);

  const volume = useMicrophone(gameState === "playing");

  // 🎮 GAME LOOP
  useEffect(() => {
    if (gameState !== "playing") return;

    const loop = () => {
      const time = Date.now() - startTime;
      setCurrentTime(time);

      // 🎵 SPAWN NOTE TERUS KE BAWAH
      if (time - lastSpawnRef.current > 900) {
        lastSpawnRef.current = time;
        const id = noteIdRef.current;

        noteIdRef.current += 1;
        setNotes((prev) => [...prev, { id, targetTime: time + 2000 }]);
      }

      // 🔊 DETEKSI SUARA (biar ga ditahan "aaaaa")
      if (volume > THRESHOLD) {
        const now = Date.now();

        // kasih jeda kecil biar harus "tap suara"
        if (now - lastSoundRef.current > 300) {
          lastSoundRef.current = now;

          // 🎯 CEK KENA NOTE
          setNotes((prevNotes) => {
            return prevNotes.filter((note) => {
              if (hitNotes.current.has(note.id)) return false;

              const diff = Math.abs(time - note.targetTime);

              // ✅ HIT VALID (harus ada suara + timing pas)
              if (diff < HIT_WINDOW) {
                hitNotes.current.add(note.id);
                setHp((prev) => {
                  const nextHp = Math.max(prev - DAMAGE, 0);

                  if (nextHp === 0) {
                    setGameState("win");
                  }

                  return nextHp;
                });
                return false;
              }

              // ❌ MISS
              if (time > note.targetTime + HIT_WINDOW) {
                return false;
              }

              return true;
            });
          });
        }
      }

      // bersihin note lama
      setNotes((prev) =>
        prev.filter((note) => time < note.targetTime + 2000)
      );

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState, startTime, volume]);

  // ▶️ START
  const startGame = () => {
    setHp(MAX_HP);
    setNotes([]);
    setCurrentTime(0);
    hitNotes.current.clear();
    noteIdRef.current = 0;
    lastSpawnRef.current = 0;
    lastSoundRef.current = 0;
    setStartTime(Date.now());
    setGameState("playing");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎤 Rhythm Voice Battle</h1>

      <Enemy hp={hp} image="/enemy.png" />
      <HpBar hp={hp} />

      <p>Volume: {Math.round(volume)}</p>

      {/* NOTE JATUH */}
      <RhythmTrack notes={notes} currentTime={currentTime} />

      {gameState === "idle" && <p>Siap? Ikuti ritme! 🎵</p>}
      {gameState === "playing" && <p>Teriak sesuai beat! 🔊</p>}
      {gameState === "win" && (
        <h2 style={{ color: "yellow" }}>🎉 GAME SUCCESS!</h2>
      )}

      {gameState !== "playing" && (
        <button onClick={startGame} style={styles.button}>
          Start Game
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    height: "100vh",
    background: "#111",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    background: "green",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
};

export default App;
