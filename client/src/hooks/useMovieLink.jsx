import axios from "axios";
import React, { useEffect, useState } from "react";

const useMovieLink = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch New Releases (Popular Movies)
        let urlPopular = "https://api.themoviedb.org/3/movie/popular?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responsePopular = await axios.get(urlPopular);
        const dataPopular = responsePopular.data.results;
        setMovies(dataPopular);
        console.log("movie",dataPopular)

        // Fetch Upcoming Movies
        let urlUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responseUpcoming = await axios.get(urlUpcoming);
        const dataUpcoming = responseUpcoming.data.results;
        setUpcomingMovies(dataUpcoming);

      } catch (error) {
        console.log("error fetching movie data:", error);
      }
    };
    fetchData();
  }, []);

  return { movies, upcomingMovies };
};

export default useMovieLink;
