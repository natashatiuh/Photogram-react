export default function Button({ children, onClick }) {
  return (
    <div className="buttons">
      <button onClick={onClick}>{children}</button>
    </div>
  );
}
