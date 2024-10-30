import { useState } from "react";
import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";

export default function ChangeUserName({ onUsernameChange, userName }) {
  const [newUsername, setNewUsername] = useState("");

  async function editUserName() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/users/username`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newUserName: newUsername,
        }),
      });
      if (!response.ok) {
        throw new Error("Username wasn't changed!");
      }
      const data = await response.json();
      console.log("Username was updated successfully", data);
      alert("Your username was changed successfully!");

      onUsernameChange(newUsername);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <div className="input-group">
      <Input
        type="text"
        placeholder={userName}
        value={newUsername}
        onChange={(el) => setNewUsername(el.target.value)}
      />
      <Button onClick={editUserName}>Edit</Button>
    </div>
  );
}
