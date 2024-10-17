import React, { useRef, useState } from "react";
import Navbar from "../component/Navbar";
import useTVShowsLink from "../hooks/useTVShowsLink";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { settings, settings2 } from "./HomePage";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function WebSeriesPage() {
  const { tvShows, newWebSeries } = useTVShowsLink();
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false); // For showing filter options
  const [filterOptions, setFilterOptions] = useState({
    genre: '',
    language: '',
    releaseYear: '',
    popularity: ''
  });

  const handleMovieClick = (movie) => {
    navigate('/review', { state: { movie } });
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen); // Show/hide filter options
  };

  const applyFilters = () => {
    // Apply the filter logic here and update the displayed TV shows based on filterOptions
    console.log("Applying filters:", filterOptions);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Navbar />

      {/* Filter Button */}
      <div className="filterButtonContainer">
        <button className="filterButton" onClick={toggleFilters}>
          Filters
        </button>
        {filtersOpen && (
          <div className="filterOptions">
            <label>
              Genre:
              <select name="genre" value={filterOptions.genre} onChange={handleFilterChange}>
                <option value="">Select Genre</option>
                <option value="action">Action</option>
                <option value="drama">Drama</option>
                <option value="comedy">Comedy</option>
                {/* Add more genres */}
              </select>
            </label>
            <label>
              Language:
              <select name="language" value={filterOptions.language} onChange={handleFilterChange}>
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                {/* Add more languages */}
              </select>
            </label>
            <label>
              Release Year:
              <input
                type="number"
                name="releaseYear"
                placeholder="Year"
                // className="year"
                value={filterOptions.releaseYear}
                onChange={handleFilterChange}
              />
            </label>
            <label>
              Popularity:
              <select name="popularity" value={filterOptions.popularity} onChange={handleFilterChange}>
                <option value="">Select Popularity</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </label>
            <button onClick={applyFilters} className="applyFilterButton">Apply Filters</button>
          </div>
        )}
      </div>

      <div className="movieSection">
        <h2>Top Rated</h2>
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
            <Slider ref={sliderRef2} {...settings2}>
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

export default WebSeriesPage;
