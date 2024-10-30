import { useState, useEffect } from "react";
import Navbar from "../AuthPage/Navbar";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import Button from "../AuthPage/Button";
import Modal from "../AuthPage/Modal";
import ChangeUserName from "./ChangeUsername";
import ChangeFullName from "./ChangeFullName";
import ChangeBio from "./ChangeBio";
import ChangeBirthDate from "./ChangeBirthDate";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleUsernameChange(newUsername) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      userName: newUsername,
    }));
  }

  function handleFullNameChange(newFullName) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      fullName: newFullName,
    }));
  }

  function handleBioChange(newBio) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      bio: newBio,
    }));
  }

  function handleBirthDateChange(newBirthDate) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      dateOfBirth: newBirthDate,
    }));
  }

  function handleEmailChange(newEmail) {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      email: newEmail,
    }));
  }

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`http://localhost:4000/users/user`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
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
            <ChangeUserName onUsernameChange={handleUsernameChange} />
            <ChangeFullName onFullNameChange={handleFullNameChange} />
            <ChangeBio onBioChange={handleBioChange} />
            <ChangeBirthDate onBirthDateChange={handleBirthDateChange} />
            <ChangeEmail onEmailChange={handleEmailChange} />
            <ChangePassword />
          </Modal>
        </div>
      )}
    </div>
  );
}
