import React, { useState } from "react";
import "../css/RegisterModel.css"; 
import "../css/LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert

function LoginModel({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/login", { email, password });
      console.log("log", result);
      if (result.data.success) { // Check success based on your API response
        setShowAlert(true); // Show alert on successful login

        // Set a timeout to hide the alert after 2-3 seconds
        setTimeout(() => {
          setShowAlert(false); // Hide alert after 3 seconds
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    } catch (err) {
      console.log(err);
      // Handle error here (you could show another alert for login errors)
    }
  };

  return (
    <div className="loginMainContainer">
      <div className="registerFormContainer">
        <h2 className="heading">Login</h2>
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Login successful!
          </Alert>
        )}
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="email"
            id="email"
            name="email"
            value={email} // Set input value
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="password"
            id="password"
            name="password"
            value={password} // Set input value
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <button className="btnRegister" onClick={handleLogin}>Login</button>
        </div>
        <div className="member">
          Don't have an account? <Link onClick={onSwitchToRegister}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginModel;
