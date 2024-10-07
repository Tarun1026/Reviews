import React, { useEffect, useState } from 'react';
import getUserDetail from '../hooks/GetUserDetails';
import axios from 'axios'; // Use axios to send data to the backend
import "../css/AccountSettingPage.css";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '********', // Default to hidden password
    profileImage: '', // Add profile image
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetail();
      
      if (userDetails) {
        setUserData({
          username: userDetails.username,
          email: userDetails.email,
          password: '********',
          profileImage: userDetails.profileImage, // Get profile image URL
        });
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Function to send updated details to backend for specific field
  const handleSave = async (field) => {
    try {
      let payload = {};

      if (field === 'username') {
        payload = { username: userData.username };
      } else if (field === 'email') {
        payload = { email: userData.email };
      } else if (field === 'password') {
        // Validate password fields
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
          alert('New password and confirmation do not match');
          return;
        }
        if (passwordData.newPassword.length < 6) {
          alert('Password must be greater than 6 characters');
          return;
        }
        payload = {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        };
      }

      // Send the update to the backend only for the specific field
      const response = await axios.post(`/api/users/update-${field}`, payload);

      if (response.status === 200) {
        alert(`${field} updated successfully`);
        setEditMode({ ...editMode, [field]: false }); // Exit edit mode
      } else {
        alert(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(`Error updating ${field}`);
    }
  };

  // Function to handle profile image upload
  const handleProfileImageUpload = async () => {
    if (!profileImage) {
      alert("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append('profileImage', profileImage); // Append the profile image

    try {
      const response = await axios.post('/api/users/update-profile-image', formData); // Send formData directly

      if (response.status === 200) {
        alert("Profile image uploaded successfully");
      } else {
        alert("Failed to upload profile image");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Error uploading profile image");
    }
  };

  return (
    <div className="account-settings">
      <h2 className="account-settings-title">Account Settings</h2>

      <div className="profile-section">
        {userData.profileImage ? (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="profile-avatar"
            onClick={() => document.getElementById('profileImageInput').click()}
          />
        ) : (
          <FaUserCircle
            size={100}
            className="profile-icon"
            onClick={() => document.getElementById('profileImageInput').click()}
          />
        )}
        <input
          type="file"
          id="profileImageInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        {profileImage && (
          <button className="upload-btn" onClick={handleProfileImageUpload}>Upload Profile Image</button>
        )}
      </div>

      <div className="account-section">
        <h3>Username</h3>
        <div className="account-field">
          {editMode.username ? (
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.username}</span>
          )}
          <button onClick={() => editMode.username ? handleSave('username') : handleEditClick('username')}>
            {editMode.username ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="account-section">
        <h3>Email</h3>
        <div className="account-field">
          {editMode.email ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
          <button onClick={() => editMode.email ? handleSave('email') : handleEditClick('email')}>
            {editMode.email ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="account-section">
        <h3>Password</h3>
        <div className="account-field">
          {editMode.password ? (
            <div className="password-edit">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </div>
          ) : (
            <span>{userData.password}</span>
          )}
          <button onClick={() => editMode.password ? handleSave('password') : handleEditClick('password')}>
            {editMode.password ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
