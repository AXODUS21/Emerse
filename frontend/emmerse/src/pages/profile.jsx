import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useGetUserId from "../hooks/getUserId.js";
import pfp from "../Images/user.png";

const Profile = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [userData, setUserData] = useState();
  const [editedUserData, setEditedUserData] = useState();
  const userID = useGetUserId();

  const fetchUserData = async () => {
    const response = await axios.get(`http://localhost:5000/users/${userID}`);
    setUserData(response.data);
    setEditedUserData({ ...response.data });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
    alert("You have been successfully logged out");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const saveChanges = async () => {
    await axios.put(`http://localhost:5000/users/${userID}`, editedUserData);
    setUserData(editedUserData);
  };

  return (
    <div className="profile-container">
      <div className="info">
        <img src={pfp} alt="User profile" />
        <h3>{userData?.username}</h3>

        <div className="user-data">
          <h3>+63 {userData?.contactNumber}</h3>
          <h3>{userData?.address}</h3>
        </div>
      </div>

      <div className="edit-details-container">
        <input
          type="text"
          name="contactNumber"
          placeholder="Change your contact number"
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Change your address"
          onChange={handleInputChange}
        />
        <button onClick={saveChanges}>Save Changes</button>
      </div>

      <div className="recent-purchases-container">
        <h2>Recent Purchases</h2>
      </div>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Profile;
