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
import { settings} from '../component/SettingSlider';
import { genreMovieMap } from '../utils/Genre/genreMovieMap';
import FilterOptions from '../component/Filter';
import FilterCard from '../component/FilterCards/FilterCard';
const MoviesPage = () => {
  const endPoint="movie"
  const { movies, upcomingMovies } = useMovieLink();
  const [appliedFilters, setAppliedFilters] = useState({
    genre: '',
    language: '',
    releaseYear: '',
    popularity: ''
  });
  const navigate = useNavigate(); 

  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);
  

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

  return (
    <div className="newMoviesPageContainer">
      <Navbar />
      <FilterOptions setAppliedFilters={setAppliedFilters} genreMap={genreMovieMap} />
      <FilterCard setAppliedFilters={appliedFilters} endPoint={endPoint}/>
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
          <Slider ref={sliderRef2} {...settings}>
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
      {/* <div className="newMovieSection">
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
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default MoviesPage;
