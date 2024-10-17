import React, { useEffect, useState,useRef } from "react";
import Modal from "../models/model";
import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";
import useMovieLink from "../hooks/useMovieLink";
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
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // Dynamically update based on screen size
  slidesToScroll: 2,
  arrows:false,
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
  
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 900, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 400, settings: { slidesToShow: 1 } }
  ]
};
const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // Dynamically update based on screen size
  slidesToScroll: 2,
  arrows:false,
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
  
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 900, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
    { breakpoint: 400, settings: { slidesToShow: 1 } }
  ]
};

function HomePage() {
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);

  
 
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { movies, newReleaseMovies, topRatedMovies } = useMovieLink();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [topRatedIndex, setTopRatedIndex] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState(5); // New state for movies to show

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

 

  // const goToNextNowPlaying = () => {
  //   setNowPlayingIndex((prevIndex) => (prevIndex + 1) % newReleaseMovies.length);
  // };

  // const goToPreviousNowPlaying = () => {
  //   setNowPlayingIndex(
  //     (prevIndex) => (prevIndex - 1 + newReleaseMovies.length) % newReleaseMovies.length
  //   );
  // };

  // const goToNextTopRated = () => {
  //   setTopRatedIndex((prevIndex) => (prevIndex + 1) % topRatedMovies.length);
  // };

  // const goToPreviousTopRated = () => {
  //   setTopRatedIndex(
  //     (prevIndex) => (prevIndex - 1 + topRatedMovies.length) % topRatedMovies.length
  //   );
  // };

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

  // Function to update the number of movies to show based on window size
  // Function to update the number of movies to show based on window size
// const updateMoviesToShow = () => {
//   const width = window.outerWidth;
  // console.log("Current width:", width); 

//   if (width < 400) {
//     setMoviesToShow(1);
//     // console.log("Setting movies to show: 1");
//   } else if (width < 600) {
//     setMoviesToShow(2);
//     // console.log("Setting movies to show: 2");
//   } else if (width < 900) {
//     setMoviesToShow(3);
//     // console.log("Setting movies to show: 3");
//   } else if (width < 1200) {
//     setMoviesToShow(4);
//     // console.log("Setting movies to show: 4");
//   } else {
//     setMoviesToShow(5);
//     // console.log("Setting movies to show: 5");
//   }
// };

// useEffect(() => {
//   updateMoviesToShow(); // Set initial number of movies on mount

//   const handleResize = () => {
//     // console.log("Resize event detected."); // Debug statement for resize
//     updateMoviesToShow(); // Update number of movies on resize
//   };

//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize); // Cleanup listener
// }, []);

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
          <Slider ref={sliderRef2} {...settings2}>
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
                  <p>Release year • {movie.release_date.substring(0, 4)}</p>
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
export { settings, settings2 }; 
export default HomePage;
