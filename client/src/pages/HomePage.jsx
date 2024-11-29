import React, { useEffect, useState, useRef } from "react";
import Modal from "../models/model";
import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";
import useMovieLink from "../hooks/useMovieLink";
import useTVShowsLink from "../hooks/useTVShowsLink";
import Navbar from "../component/Navbar";
import axios from "axios";
import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import MovieCards from "../component/movieCards/MovieCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { movies, newReleaseMovies, topRatedMovies } = useMovieLink();
  const { newWebSeries } = useTVShowsLink();

  const navigate = useNavigate();

  // const handleRegisterClick = () => {
  //   setIsLogin(false);
  //   setModalOpen(true);
  // };

  // const handleLoginClick = () => {
  //   setIsLogin(true);
  // };

  // const handleSwitchToRegister = () => {
  //   setIsLogin(false);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  //   window.location.reload();
  // };

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true);
  //   setModalOpen(false);
  // };
  // const apiUrl = import.meta.env.VITE_API_URL;
  // const handleLogout = async () => {
  //   await axios
  //     .post(`/api/users/logOut`)
  //     .then((result) => {
  //       if (result.data.success) {
  //         toast.success(result.data.message, {
  //           position: "top-center",
  //           autoClose: 3000,
  //         });
  //       }
  //       setIsLoggedIn(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleMovieClick = (movie) => {
  //   navigate("/review", { state: { movie } });
  // };

  return (
    <div className="homePageContainer">
      <Navbar
        
      />

      {/* Featured Movie Slider */}

      <div className="movieSlider">
        <Carousel
          showArrows={true}
          showIndicators={false}
          // selectedItem={3},
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={3000}
        >
          {topRatedMovies.map((movie, index) => (
            <div
              key={index}
              className="movieContainer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="moviePoster"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <MovieCards movieSent={newReleaseMovies} heading={"Trending Today"} />
      <MovieCards movieSent={topRatedMovies} heading={"Top Rated"} />

      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLogin ? (
          <LoginModel
            onSwitchToRegister={handleSwitchToRegister}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <RegisterModel onSwitchToLogin={handleLoginClick} />
        )}
      </Modal> */}
      <ToastContainer/>
    </div>
  );
}
// export { settings };
export default HomePage;
