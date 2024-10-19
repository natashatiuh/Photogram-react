import Input from "./Input";
import Button from "./Button";

export default function ModalSignIn({
  email,
  password,
  setEmail,
  setPassword,
  onSignIn,
}) {
  return (
    <div>
      <Input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="modal-button">
        <Button onClick={onSignIn}>Sign In</Button>
      </div>
    </div>
  );
}
