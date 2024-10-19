import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AuthBox from "./AuthBox";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import axios from "axios";
import ModalSignIn from "./ModalSignIn";

const ActiveModal = {
  None: 0,
  SignIn: 1,
  SignUp: 2,
};

export default function AuthPage() {
  const [activeModal, setActiveModal] = useState(ActiveModal.None);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDOB] = useState(new Date());
  const [age, setAge] = useState(0);

  const today = new Date();

  useEffect(() => {
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth);
      let calculateAge = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dob.getDate())
      ) {
        calculateAge--;
      }
      setAge(calculateAge--);
    }
  }, [dateOfBirth]);

  function handleSignIn() {
    axios
      .post("http://localhost:4000/auth/sign-in", { email, password })
      .then((response) => {
        const { tokens } = response.data;
        console.log("Sign-in successful!", tokens);
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Sign-in failed!", error);
      });
  }

  function handleSignUp() {
    if (
      !email ||
      !password ||
      !repeatPassword ||
      !userName ||
      !fullName ||
      !dateOfBirth
    ) {
      alert("All fields are required!");
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (age < 13) {
      alert("User must be at least 13 years old to sign up.");
      return;
    }

    axios
      .post("http://localhost:4000/auth/sign-up", {
        email,
        password,
        userName,
        fullName,
        dateOfBirth,
      })
      .then((response) => {
        if (
          !email ||
          !password ||
          !repeatPassword ||
          !userName ||
          !fullName ||
          !dateOfBirth
        ) {
          alert("All fields are required!");
          return;
        }
        if (password !== repeatPassword) {
          alert("Passwords do not match!");
          return;
        }
        const { tokens } = response.data;
        console.log("Sign-up successful!", tokens);
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("Sign-up failed!", error);
      });
  }

  return (
    <div>
      <Navbar />
      <AuthBox
        onSignIn={() => setActiveModal(ActiveModal.SignIn)}
        onSignUp={() => setActiveModal(ActiveModal.SignUp)}
      />

      {activeModal === ActiveModal.SignIn && (
        <Modal
          onClose={() => {
            setActiveModal(ActiveModal.None);
            setSubmitted(false);
            setEmail("");
            setPassword("");
          }}
          title={"Sign In"}
        >
          <ModalSignIn
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSignIn={handleSignIn}
          />
        </Modal>
      )}

      {activeModal === ActiveModal.SignUp && (
        <Modal
          onClose={() => {
            setActiveModal(ActiveModal.None);
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            setUserName("");
            setFullName("");
            setDOB("");
          }}
          title={"Sign Up"}
        >
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
          <Input
            type="password"
            placeholder="Repeat password..."
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Fullname..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Date of Birth🎂</label>
          <Input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDOB(e.target.value)}
          />
          <div className="modal-button">
            <Button onClick={handleSignUp}>Sign Up</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
