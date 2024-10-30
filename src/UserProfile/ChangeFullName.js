import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";
import { useState } from "react";

export default function ChangeFullName({ onFullNameChange, fullName }) {
  const [newFullName, setNewFullName] = useState("");

  async function editFullName() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await fetch(
        `http://localhost:4000/users/user-full-name`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newUserFullName: newFullName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Full name wasn't changed!");
      }
      const data = await response.json();
      console.log("Full name was updated successfully", data);
      alert("Your full name was changed successfully!");

      onFullNameChange(newFullName);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <div className="input-group">
      <Input
        type="text"
        placeholder={fullName}
        value={newFullName}
        onChange={(el) => setNewFullName(el.target.value)}
      />
      <Button onClick={editFullName}>Edit</Button>
    </div>
  );
}
