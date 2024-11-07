import React, { useState } from "react";
import "../css/RegisterModel.css";
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert
import axios from "axios";

const RegisterModel = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      confirmPassword,
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const result = await axios.post(`${apiUrl}/api/users/register`, data);
      console.log(result);

      if (result.data.success) {
        setShowAlert(true); // Show alert on successful registration

        // Hide the alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false); // Hide alert after 3 seconds
        }, 3000);
        onSwitchToLogin();
      }
    } catch (err) {
      console.log("Error:", err);
      // Optionally, you can handle error messages with another alert
    }
  };

  return (
    <div className="registerMainContainer">
      <div className="registerFormContainer">
        <h2 className="heading">Register</h2>

        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Registration successful!
          </Alert>
        )}

        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username" className="labels">Username</label>
        </div>

        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="labels">Email</label>
        </div>

        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="createPassword" className="labels">Create Password</label>
        </div>

        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="labels">Confirm Password</label>
        </div>

        <div>
          <button className="btnRegister" onClick={handleSubmit}>Register</button>
        </div>

        <div className="member">
          Already a member? <Link onClick={onSwitchToLogin}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterModel;
