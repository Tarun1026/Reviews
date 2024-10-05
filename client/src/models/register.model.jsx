import React,{useState} from "react";
import "../css/RegisterModel.css";
import { Link } from "react-router-dom";
import googleIcon from '../assets/google.svg'; // Import as a regular image
import axios from "axios"
const RegisterModel=({ onSwitchToLogin })=> {

  const [username,setusername]=useState()
  const[email,setEmail]=useState()
  const [password,setPassword]=useState()
  const[confirmPassword,setConfirmPassword]=useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        username,
        email,
        password,
        confirmPassword,
    };
    await axios.post("/api/users/register", data)
        .then((result) => console.log(result))
        .catch(err => console.log("Error:", err));
};
  return (
    <div className="registerMainContainer">
      <div className="registerFormContainer">
        <h2 className="heading">Register</h2>
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="text"
            // id="username"
            // name="username"
            onChange={(e)=>setusername(e.target.value)}
          />
          <label htmlFor="username" className="labels">Username</label>
        </div>
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="email"
            // id="email"
            // name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="email" className="labels">Email</label>
        </div>
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="password"
            // id="createPassword"
            // name="createPassword"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <label htmlFor="createPassword" className="labels">Create Password</label>
        </div>
        <div className="registerInputContainer">
          <input
            className="registerInputField"
            type="password"
            // id="confirmPassword"
            // name="confirmPassword"
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword" className="labels">Confirm Password</label>
        </div>
        <div>
          <button className="btnRegister" onClick={handleSubmit}>Register</button>
        </div>
        <div className="registerWith">or Register with</div>
        <div className="googleButton">
          <img src={googleIcon} alt="Google" className="googleIcon" />
        </div>
        <div className="member">
          Already a member? <Link onClick={onSwitchToLogin}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterModel;
