import React, { useState } from 'react';
import "../css/HomePage.css";
import Modal from '../models/model';
import RegisterModel from '../models/register.model';
import LoginModel from '../models/login.model';

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegisterClick = () => {
    setIsLogin(false);
    setModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="homePageContainer">
      <div className='navDiv'>
        <div className="navItem">Movie Review</div>
        <div className="navItem">Movies</div>
        <div className="navItem">Web Series</div>
        <div className="navItem">TV Shows</div>
        <input type='text' className="searchInput" />
        <button className="registerButton" onClick={handleRegisterClick}>Register</button>
      </div>
      <div className="content">
        {/* Add your content here */}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLogin 
          ? <LoginModel onSwitchToRegister={handleSwitchToRegister} /> 
          : <RegisterModel onSwitchToLogin={handleLoginClick} />}
      </Modal>
    </div>
  );
}

export default HomePage;
