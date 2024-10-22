import React, { useState, useEffect ,useRef} from 'react';
import Navbar from '../component/Navbar';
import useMovieLink from '../hooks/useMovieLink';
import '../css/MoviesPage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { genreMovieMap } from '../utils/Genre/genreMovieMap';
import FilterOptions from '../component/Filter';
import FilterCard from '../component/FilterCards/FilterCard';
import MovieCards from '../component/movieCards/MovieCards';

const MoviesPage = () => {
  const endPoint="movie"
  const { movies, upcomingMovies } = useMovieLink();
  const [appliedFilters, setAppliedFilters] = useState({
    genre: '',
    language: '',
    releaseYear: '',
    popularity: ''
  });

  

  
  return (
    <div className="newMoviesPageContainer">
      <Navbar />
      <FilterOptions setAppliedFilters={setAppliedFilters} genreMap={genreMovieMap} />
      <FilterCard setAppliedFilters={appliedFilters} endPoint={endPoint}/>
     
      <MovieCards movieSent={movies} heading={"New Releases"}/>
      <MovieCards movieSent={upcomingMovies} heading={"Upcoming Movies"}/>
      
      
     
    </div>
  );
};

export default MoviesPage;
