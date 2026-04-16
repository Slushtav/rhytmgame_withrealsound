export default function RhythmTrack({ notes, currentTime }) {
  const HIT_LINE = 350;
  const SPEED = 0.25;

  return (
    <div style={styles.container}>
      <div style={styles.hitLine}></div>

      {notes.map((note) => {
        const timeDiff = note.targetTime - currentTime;

        const y = HIT_LINE - timeDiff * SPEED;

        if (y < -50 || y > 500) return null;

        return (
          <div
            key={note.id}
            style={{
              ...styles.note,
              transform: `translateY(${y}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "200px",
    height: "450px",
    background: "#222",
    margin: "20px auto",
    overflow: "hidden",
    border: "2px solid white",
  },
  hitLine: {
    position: "absolute",
    bottom: "60px",
    width: "100%",
    height: "4px",
    background: "yellow",
  },
  note: {
    position: "absolute",
    width: "40px",
    height: "20px",
    background: "cyan",
    left: "80px",
    borderRadius: "5px",
    transition: "transform 0.05s linear",
  },
};
