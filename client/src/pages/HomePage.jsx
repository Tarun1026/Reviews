import React, { useEffect, useState, useRef } from "react";
import useMovieLink from "../hooks/useMovieLink";
import Navbar from "../component/Navbar";
import axios from "axios";
import "../css/HomePage.css";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import MovieCards from "../component/movieCards/MovieCards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewPage from "./ReviewPage";
function HomePage() {
  const { movies, newReleaseMovies, topRatedMovies } = useMovieLink();
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    
    navigate("/review", { state: { movie } });
  };

  return (
    <div className="homePageContainer">
      <Navbar/>

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

      <ToastContainer/>
    </div>
  );
}

export default HomePage;
