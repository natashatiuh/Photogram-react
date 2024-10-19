export default function Modal({ onClose, title, children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
        <div className="close" onClick={onClose}>
          <span>╳</span>
        </div>
      </div>
    </div>
  );
}
