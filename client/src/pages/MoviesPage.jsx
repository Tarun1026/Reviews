import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import useMovieLink from '../hooks/useMovieLink';
import useIMDBLink from '../hooks/useIMDBLink';
import '../css/MoviesPage.css'; // Changed CSS file

const MoviesPage = () => {
  const { movies, upcomingMovies } = useMovieLink();
  const { popularMovies } = useIMDBLink();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0); // New state for popular movies
  const [moviesPerView, setMoviesPerView] = useState(1); 

  const navigate = useNavigate(); 

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

  // Handlers for slider navigation (New Releases)
  const goToNextMovie = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + moviesPerView) % movies.length
    );
  };

  const goToPreviousMovie = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - moviesPerView + movies.length) % movies.length
    );
  };

  // Handlers for slider navigation (Upcoming Movies)
  const goToNextUpcomingMovie = () => {
    setUpcomingIndex((prevIndex) =>
      (prevIndex + moviesPerView) % upcomingMovies.length
    );
  };

  const goToPreviousUpcomingMovie = () => {
    setUpcomingIndex((prevIndex) =>
      (prevIndex - moviesPerView + upcomingMovies.length) % upcomingMovies.length
    );
  };

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
      <div className="newMovieSection">
        <h2>New Releases</h2>
        <div className="newMovieSlider">
          <button className="newPrevButton" onClick={goToPreviousMovie}>❮</button>
          <div className="newMovieSliderContainer">
            {movies.slice(currentIndex, currentIndex + moviesPerView).map((movie) => (
              <div 
                className="newMovieCard" 
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="newMoviePoster"
                />
              </div>
            ))}
          </div>
          <button className="newNextButton" onClick={goToNextMovie}>❯</button>
        </div>
      </div>

      {/* Upcoming Movies Slider */}
      <div className="newMovieSection">
        <h2>Upcoming Movies</h2>
        <div className="newMovieSlider">
          <button className="newPrevButton" onClick={goToPreviousUpcomingMovie}>❮</button>
          <div className="newMovieSliderContainer">
            {upcomingMovies.slice(upcomingIndex, upcomingIndex + moviesPerView).map((movie) => (
              <div 
                className="newMovieCard" 
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="newMoviePoster"
                />
              </div>
            ))}
          </div>
          <button className="newNextButton" onClick={goToNextUpcomingMovie}>❯</button>
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
