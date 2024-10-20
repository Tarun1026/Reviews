import React, { useEffect, useRef, useState } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { settings } from "../SettingSlider";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFilterMovies from "../../hooks/useFilterMovies";
function FilterCard({ setAppliedFilters,endPoint }) {
    const {  filteredShows,showsData} = useFilterMovies(setAppliedFilters,endPoint);
    
    const sliderRef3 = useRef(null);
    const navigate = useNavigate();
    
    console.log("Filtered Shows Length:", filteredShows.length);
  
    const handleMovieClick = (movie) => {
      navigate('/review', { state: { movie } });
    };
  
  return (
    <>
    {filteredShows.length > 0 ? (
        <div className="movieSection">
          <h2>Based on your search</h2>
          <div className="carouselContainer1">
            <button className="prevButton" onClick={() => sliderRef3.current.slickPrev()}>
              <SlArrowLeftCircle />
            </button>
            <div className="movieCards1">
              <Slider ref={sliderRef3} {...settings}>
                {filteredShows.map((movie, index) => (
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
            <button className="nextButton" onClick={() => sliderRef3.current.slickNext()}>
              <SlArrowRightCircle />
            </button>
          </div>
        </div>
      ) : (
      //  {showsData && <h2>He</h2>}
      showsData && <h2>No WebSeries Found </h2>
      )}
      </>
  )
  
}

export default FilterCard