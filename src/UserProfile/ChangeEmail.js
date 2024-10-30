import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";
import { useState } from "react";

export default function ChangeEmail({ onEmailChange }) {
  const [newEmail, setNewEmail] = useState("");

  async function editEmail() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }
      const response = await fetch(`http://localhost:4000/auth/email`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newEmail: newEmail,
        }),
      });
      if (!response.ok) {
        throw new Error("Email wasn't changed!");
      }
      const data = await response.json();
      console.log("Email was updated successfully", data);
      alert("Your email was changed successfully!");

      onEmailChange(newEmail);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  return (
    <div className="input-group">
      <Input
        type="text"
        placeholder="New email..."
        value={newEmail}
        onChange={(el) => setNewEmail(el.target.value)}
      />
      <Button onClick={editEmail}>Edit</Button>
    </div>
  );
}
