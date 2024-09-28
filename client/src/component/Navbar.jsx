// Navbar.jsx
import React from "react";
import "../css/Navbar.css"; 

const Navbar = ({ onRegisterClick }) => {
  return (
    <div className="navDiv">
      <div className="navItem">Movie Review</div>
      <div className="navItem">Movies</div>
      <div className="navItem">Web Series</div>
      <div className="navItem">TV Shows</div>
      <input type="text" className="searchInput" placeholder="Search..." />
      <button className="registerButton" onClick={onRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default Navbar;
