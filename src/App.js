import { useState } from "react";
import AuthPage from "./AuthPage/AuthPage";
import UserProfile from "./UserProfile/UserProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
