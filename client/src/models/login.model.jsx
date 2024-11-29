import React, { useState } from "react";
import "../css/RegisterModel.css"; 
import "../css/LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginModel({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`/api/users/login`, { email, password });
      console.log("log", result);
      if (result.data.success) { // Check success based on your API response
        if (result.data.success) {
          toast.success(result.data.message, {
            position: "top-center",
            autoClose: 3000,
          });

          setTimeout(() => {
            onLoginSuccess();
            window.location.reload();
          }, 3000);
      }
    }
    } catch (err) {
      
      toast.error("Invalid Details", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error("Error:", err);
    }
  };

  return (
    <div className="loginMainContainer">
      <div className="registerFormContainer">
        <h2 className="heading">Login</h2>
      
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
      <ToastContainer/>
    </div>
  );
}

export default LoginModel;
