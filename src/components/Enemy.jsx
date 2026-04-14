export default function Enemy({ hp, image }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={image}
        alt="enemy"
        style={{ width: "150px" }}
      />
      <p>HP: {hp}</p>
    </div>
  );
}