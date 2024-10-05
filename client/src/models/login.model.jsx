import React, { useState } from "react";
import "../css/RegisterModel.css"; 
import "../css/LoginPage.css"
import googleIcon from '../assets/google.svg'; // Import as a regular image
import { Link } from "react-router-dom";
import axios from "axios";


function LoginModel({ onSwitchToRegister, onLoginSuccess  }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
   
  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post("/api/users/login", { email, password })
    .then((result) => {
      console.log(result);
      if (onLoginSuccess) { 
        onLoginSuccess(); // Ensure this is only called if defined
      }
    })
    .catch(err => console.log(err));
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <button className="btnRegister" onClick={handleLogin}>Login</button>
        </div>
        <div className="registerWith">or Login with</div>
        <div className="googleButton">
          <img src={googleIcon} alt="Google" className="googleIcon" />
        </div>
        <div className="member">
          Don't have an account? <Link onClick={onSwitchToRegister}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginModel;
