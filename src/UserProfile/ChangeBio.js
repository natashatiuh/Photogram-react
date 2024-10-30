import { useState } from "react";
import Input from "../AuthPage/Input";
import Button from "../AuthPage/Button";

export default function ChangeBio({ onBioChange }) {
  const [newBio, setNewBio] = useState("");

  async function editBio() {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const response = await fetch(`http://localhost:4000/users/bio`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          bio: newBio,
        }),
      });
      if (!response.ok) {
        throw new Error("Bio wasn't changed!");
      }
      const data = await response.json();
      console.log("Bio was updated successfully", data);
      alert("Your bio was changed successfully!");

      onBioChange(newBio);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  return (
    <div className="input-group">
      <Input
        type="text"
        placeholder="New bio..."
        value={newBio}
        onChange={(el) => setNewBio(el.target.value)}
      />
      <Button onClick={editBio}>Edit</Button>
    </div>
  );
}
