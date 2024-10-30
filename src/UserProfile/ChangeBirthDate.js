import { useState } from "react";
import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";

export default function ChangeBirthDate({ onBirthDateChange, birthDate }) {
  const [newBirthDate, setNewBirthdate] = useState("");

  async function editBirthDate() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/users/birth-date`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newDate: newBirthDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Birth date wasn't changed!");
      }
      const data = await response.json();
      console.log("Birth date was updated successfully", data);
      alert("Your birth date was changed successfully!");

      onBirthDateChange(newBirthDate);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  return (
    <div className="input-group">
      <Input
        type="date"
        placeholder={birthDate}
        value={newBirthDate}
        onChange={(el) => setNewBirthdate(el.target.value)}
      />
      <Button onClick={editBirthDate}>Edit</Button>
    </div>
  );
}
