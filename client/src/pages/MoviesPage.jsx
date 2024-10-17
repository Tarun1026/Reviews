import React, { useState, useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import useMovieLink from '../hooks/useMovieLink';
import useIMDBLink from '../hooks/useIMDBLink';
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import '../css/MoviesPage.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { settings,settings2 } from './HomePage';
const MoviesPage = () => {
  const { movies, upcomingMovies } = useMovieLink();
  const { popularMovies } = useIMDBLink();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0); // New state for popular movies
  const [moviesPerView, setMoviesPerView] = useState(1); 

  const navigate = useNavigate(); 

  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);
  useEffect(() => {
    const updateMoviesPerView = () => {
      const containerWidth = window.innerWidth; 
      const movieWidth = 220; 
      const maxMoviesPerRow = Math.floor(containerWidth / movieWidth); 
      setMoviesPerView(maxMoviesPerRow > 0 ? maxMoviesPerRow : 1); 
    };
  
    updateMoviesPerView(); 
    window.addEventListener('resize', updateMoviesPerView);
  
    return () => {
      window.removeEventListener('resize', updateMoviesPerView);
    };
  }, []);

  // // Handlers for slider navigation (New Releases)
  // const goToNextMovie = () => {
  //   setCurrentIndex((prevIndex) => 
  //     (prevIndex + moviesPerView) % movies.length
  //   );
  // };

  // const goToPreviousMovie = () => {
  //   setCurrentIndex((prevIndex) =>
  //     (prevIndex - moviesPerView + movies.length) % movies.length
  //   );
  // };

  // // Handlers for slider navigation (Upcoming Movies)
  // const goToNextUpcomingMovie = () => {
  //   setUpcomingIndex((prevIndex) =>
  //     (prevIndex + moviesPerView) % upcomingMovies.length
  //   );
  // };

  // const goToPreviousUpcomingMovie = () => {
  //   setUpcomingIndex((prevIndex) =>
  //     (prevIndex - moviesPerView + upcomingMovies.length) % upcomingMovies.length
  //   );
  // };

  // Handlers for slider navigation (Popular Movies)
  const goToNextPopularMovie = () => {
    setPopularIndex((prevIndex) =>
      (prevIndex + moviesPerView) % popularMovies.length
    );
  };

  const goToPreviousPopularMovie = () => {
    setPopularIndex((prevIndex) =>
      (prevIndex - moviesPerView + popularMovies.length) % popularMovies.length
    );
  };

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

  return (
    <div className="newMoviesPageContainer">
      <Navbar />

      {/* New Releases Slider */}
      <div className="movieSection">
        <h2>New Releases</h2>
        <div className="carouselContainer1">
        <button className="prevButton" onClick={() => sliderRef.current.slickPrev()}><SlArrowLeftCircle /></button>
          <div className="movieCards1">
          <Slider ref={sliderRef} {...settings}>
            {movies.map((movie, index) => (
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

      {/* Upcoming Movies Slider */}
      <div className="movieSection2">
        <h2>Upcoming Movies</h2>
        <div className="carouselContainer1">
        <button className="prevButton" onClick={() => sliderRef2.current.slickPrev()}><SlArrowLeftCircle /></button>
          <div className="movieCards1">
          <Slider ref={sliderRef2} {...settings2}>
            {upcomingMovies.map((movie, index) => (
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
      
      {/* Popular Movies Slider */}
      <div className="newMovieSection">
        <h2>Popular Movies</h2>
        <div className="newMovieSlider">
          <button className="newPrevButton" onClick={goToPreviousPopularMovie}>❮</button>
          <div className="newMovieSliderContainer">
            {popularMovies.slice(popularIndex, popularIndex + moviesPerView).map((movie) => (
              <div 
                className="newMovieCard" 
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={movie.title.primaryImage.imageUrl}
                  alt={movie.title}
                  className="newMoviePoster"
                />
              </div>
            ))}
          </div>
          <button className="newNextButton" onClick={goToNextPopularMovie}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
