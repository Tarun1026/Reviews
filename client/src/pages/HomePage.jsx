import React, { useState } from "react";
import "../css/HomePage.css";
import Modal from "../models/model";
import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";
import useMovieLink from "../hooks/useMovieLink";
import Navbar from "../component/Navbar"; // Import the new Navbar component

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
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
      {/* Navbar Section */}
      <Navbar onRegisterClick={handleRegisterClick} />

      {/* Movie Slider Section */}
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

      {/* Modal Section */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLogin ? (
          <LoginModel onSwitchToRegister={handleSwitchToRegister} />
        ) : (
          <RegisterModel onSwitchToLogin={handleLoginClick} />
        )}
      </Modal>
    </div>
  );
}

export default HomePage;
