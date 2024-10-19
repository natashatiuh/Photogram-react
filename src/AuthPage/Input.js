export default function Input({ type, placeholder, value, onChange }) {
  return (
    <div className="inputs">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
