import React, { useState } from "react";
import Modal from "../models/model";
import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";
import useMovieLink from "../hooks/useMovieLink"

import Navbar from "../component/Navbar"; 
import axios from "axios";
import "../css/HomePage.css";

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { movies } = useMovieLink();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setModalOpen(false);
  };

  const handleLogout =async () => {
    await axios.post("/api/users/logOut")
    .then((result) => {
      console.log("res",result)
      setIsLoggedIn(false);
    })
    .catch(err => console.log(err));
  };

  const goToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPreviousMovie = () => {
    setCurrentMovieIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  return (
    <div className="homePageContainer">
      <Navbar onRegisterClick={handleRegisterClick} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="movieSlider">
        <button className="prevButton" onClick={goToPreviousMovie}>
          ❮
        </button>
        <div className="movieContainer">
          {movies.length > 0 && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movies[currentMovieIndex].poster_path}`}
              alt={movies[currentMovieIndex].title}
              className="moviePoster"
            />
          )}
        </div>
        <button className="nextButton" onClick={goToNextMovie}>
          ❯
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLogin ? (
          <LoginModel onSwitchToRegister={handleSwitchToRegister} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterModel onSwitchToLogin={handleLoginClick} />
        )}
      </Modal>
    </div>
  );
}

export default HomePage;
