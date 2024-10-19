import Button from "./Button";

export default function AuthBox({ onSignIn, onSignUp }) {
  return (
    <div className="auth-box">
      <h2>Authorization</h2>
      <div className="auth-buttons">
        <Button onClick={() => onSignIn()}>Sign In</Button>
        <Button onClick={() => onSignUp()}>Sign Up</Button>
      </div>
    </div>
  );
}
