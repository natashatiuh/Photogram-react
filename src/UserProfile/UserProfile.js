import { useState, useEffect } from "react";
import Navbar from "../AuthPage/Navbar";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import Button from "../AuthPage/Button";
import Modal from "../AuthPage/Modal";
import Input from "../AuthPage/Input";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newBirthDate, setNewBirthdate] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:4000/users/user`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data!");
        }
        const data = await response.json();
        setUserInfo(data.userInfo);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Navbar />
      <div className="user-profile">
        <h2>User Profile</h2>
        <Avatar />
        {userInfo && (
          <UserInfo
            userName={userInfo.userName}
            fullName={userInfo.fullName}
            bio={userInfo.bio}
            birthDate={new Date(userInfo.dateOfBirth).toLocaleDateString()}
            followers={userInfo.followers}
            followings={userInfo.followings}
            posts={userInfo.posts}
          />
        )}
      </div>
      <div className="edit-info">
        <Button onClick={toggleModal}>Edit info</Button>
      </div>

      {isModalOpen && (
        <div className="edit-modal">
          <Modal onClose={toggleModal} title="Edit your information">
            <div className="input-group">
              <Input
                type="text"
                placeholder="New username..."
                value={newUsername}
                onChange={(el) => setNewUsername(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
            <div className="input-group">
              <Input
                type="text"
                placeholder="New fullname..."
                value={newFullName}
                onChange={(el) => setNewFullName(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
            <div className="input-group">
              <Input
                type="text"
                placeholder="New bio..."
                value={newBio}
                onChange={(el) => setNewBio(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
            <div className="input-group">
              <Input
                type="text"
                placeholder="New birth date..."
                value={newBirthDate}
                onChange={(el) => setNewBirthdate(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
            <div className="input-group">
              <Input
                type="text"
                placeholder="New email..."
                value={newEmail}
                onChange={(el) => setNewEmail(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
            <div className="input-group">
              <Input
                type="text"
                placeholder="New password..."
                value={newPassword}
                onChange={(el) => setNewPassword(el.target.value)}
              />
              <Button>Edit</Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
