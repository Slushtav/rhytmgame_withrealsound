export default function HpBar({ hp }) {
  return (
    <div style={{ width: "250px", background: "#444" }}>
      <div
        style={{
          width: `${hp}%`,
          height: "20px",
          background: "red",
        }}
      />
    </div>
  );
}