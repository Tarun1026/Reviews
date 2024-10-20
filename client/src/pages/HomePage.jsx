import React, { useEffect, useState,useRef } from "react";
import Modal from "../models/model";
import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";
import useMovieLink from "../hooks/useMovieLink";
import useTVShowsLink from "../hooks/useTVShowsLink";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import Navbar from "../component/Navbar"; 
import axios from "axios";
import "../css/HomePage.css";
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../component/SettingSlider";

function HomePage() {
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { movies, newReleaseMovies, topRatedMovies } = useMovieLink();
 const {newWebSeries}=useTVShowsLink()

  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await axios.post("/api/users/logOut")
      .then((result) => {
        setIsLoggedIn(false);
      })
      .catch(err => console.log(err));
  };

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

 

  return (
    <div className="homePageContainer">
      <Navbar onRegisterClick={handleRegisterClick} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Featured Movie Slider */}
      
      <div className="movieSlider">
       <Carousel
        showArrows={true}
        // selectedItem={3},
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
       >
        {movies.map((movie, index) => (
          <div key={index} className="movieContainer" onClick={() => handleMovieClick(movie)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="moviePoster"
            />
          </div>
        ))}
      </Carousel>
    </div>

      {/* Now Playing Section */}
      <div className="movieSection">
        <h2>Trending Today</h2>
        <div className="carouselContainer1">
        <button className="prevButton" onClick={() => sliderRef.current.slickPrev()}><SlArrowLeftCircle /></button>
          <div className="movieCards1">
          <Slider ref={sliderRef} {...settings}>
            {newReleaseMovies.map((movie, index) => (
              <div
                key={index}
                className="movieCardLarge"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="moviePosterLarge"
                />
                <div className="ratingContainer">
                  <span className="star">⭐</span>
                  <span className="rating">{movie.vote_average}</span>
                </div>
                <div className="movieDetails">
                  <h3>{movie.title}</h3>
                  <p>Release year • {movie.release_date.substring(0, 4)}</p>
                  <button className="seeReviewsButton">See reviews</button>
                </div>
              </div>
            ))}
            </Slider>
          </div>
          <button className="nextButton" onClick={() => sliderRef.current.slickNext()}><SlArrowRightCircle /></button>
        </div>
      </div>

      {/* Top Rated Section */}
      <div className="movieSection2">
        <h2>Top Rated</h2>
        <div className="carouselContainer1">
        <button className="prevButton" onClick={() => sliderRef2.current.slickPrev()}><SlArrowLeftCircle /></button>
          <div className="movieCards1">
          <Slider ref={sliderRef2} {...settings}>
            {topRatedMovies.map((movie, index) => (
              <div
                key={index}
                className="movieCardLarge"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="moviePosterLarge"
                />
                <div className="ratingContainer">
                  <span className="star">⭐</span>
                  <span className="rating">{movie.vote_average}</span>
                </div>
                <div className="movieDetails">
                  <h3>{movie.title}</h3>
                  <p>Release year • {movie.release_date || movie.first_air_date}</p>
                  <button className="seeReviewsButton">See reviews</button>
                </div>
              </div>
            ))}
            </Slider>
          </div>
          <button className="nextButton" onClick={() => sliderRef2.current.slickNext()}><SlArrowRightCircle /></button>
        </div>
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
// export { settings }; 
export default HomePage;
