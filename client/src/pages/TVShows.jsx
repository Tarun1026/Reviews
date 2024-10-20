import React, { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import useTVShowsLink from "../hooks/useTVShowsLink";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { settings } from "../component/SettingSlider";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FilterOptions from "../component/Filter";
import { genreMap } from "../utils/Genre/genreUtils";
import FilterCard from "../component/FilterCards/FilterCard";
import { networkIds } from "../utils/NetworkIDs/TVShowsNetworkId";
function TVShows() {
  const endPoint="tv"
  const [appliedFilters, setAppliedFilters] = useState({
    genre: '',
    language: '',
    releaseYear: '',
    popularity: ''
  });
  const { tvShows, newWebSeries} = useTVShowsLink(networkIds);
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);
  const navigate = useNavigate();
  
  // console.log("Filtered Shows Length:", filteredShows.length);

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

  

  return (
    <div>
      <Navbar />

      <FilterOptions setAppliedFilters={setAppliedFilters} genreMap={genreMap} />
      
<FilterCard setAppliedFilters={appliedFilters} endPoint={endPoint}/>
      <div className="movieSection">
        <h2>Hindi Shows</h2>
        <div className="carouselContainer1">
          <button className="prevButton" onClick={() => sliderRef.current.slickPrev()}>
            <SlArrowLeftCircle />
          </button>
          <div className="movieCards1">
            <Slider ref={sliderRef} {...settings}>
              {tvShows.map((movie, index) => (
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
                    <h3>{movie.title || movie.original_name}</h3>
                    <p>Release year • {movie.release_date || movie.first_air_date}</p>
                    <button className="seeReviewsButton">See reviews</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <button className="nextButton" onClick={() => sliderRef.current.slickNext()}>
            <SlArrowRightCircle />
          </button>
        </div>
      </div>

      <div className="movieSection2">
        <h2>New Releases</h2>
        <div className="carouselContainer1">
          <button className="prevButton" onClick={() => sliderRef2.current.slickPrev()}>
            <SlArrowLeftCircle />
          </button>
          <div className="movieCards1">
            <Slider ref={sliderRef2} {...settings}>
              {newWebSeries.map((movie, index) => (
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
                    <h3>{movie.title || movie.original_name}</h3>
                    <p>Release year • {movie.release_date || movie.first_air_date}</p>
                    <button className="seeReviewsButton">See reviews</button>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <button className="nextButton" onClick={() => sliderRef2.current.slickNext()}>
            <SlArrowRightCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TVShows;
