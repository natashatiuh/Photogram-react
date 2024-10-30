import { useState } from "react";
import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  async function editPassword() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/auth/password`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Password wasn't changed!");
      }
      const data = await response.json();
      console.log("Password was updated successfully", data);
      alert("Password was changed successfully!");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  return (
    <div>
      <div className="input-group">
        <Input
          type="password"
          placeholder="Current password..."
          value={currentPassword}
          onChange={(el) => setCurrentPassword(el.target.value)}
        />
      </div>
      <div className="input-group">
        <Input
          type="password"
          placeholder="New password..."
          value={newPassword}
          onChange={(el) => setNewPassword(el.target.value)}
        />
        <Button onClick={editPassword}>Edit</Button>
      </div>
    </div>
  );
}
