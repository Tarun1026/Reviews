import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import useMovieLink from '../hooks/useMovieLink';
import '../css/MoviesPage.css'; // Changed CSS file

const MoviesPage = () => {
  const { movies, upcomingMovies } = useMovieLink();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [moviesPerView, setMoviesPerView] = useState(1); // Dynamically set movies per view based on screen width
  const navigate = useNavigate(); 
  useEffect(() => {
    const updateMoviesPerView = () => {
      const containerWidth = window.innerWidth; // Use innerWidth for accurate screen width
      const movieWidth = 220; // Reduce the movie width to fit more cards in the row
      const maxMoviesPerRow = Math.floor(containerWidth / movieWidth); // Calculate how many fit per row
      setMoviesPerView(maxMoviesPerRow > 0 ? maxMoviesPerRow : 1); // Ensure at least 1 movie
    };
  
    updateMoviesPerView(); // Set initial movies per view
    window.addEventListener('resize', updateMoviesPerView); // Update on window resize
  
    return () => {
      window.removeEventListener('resize', updateMoviesPerView); // Cleanup on unmount
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
  const [upcomingIndex, setUpcomingIndex] = useState(0);

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

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } }); // Pass movie details via state
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
    </div>
  );
};

export default MoviesPage;
