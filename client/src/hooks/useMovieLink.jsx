import axios from "axios";
import React, { useEffect, useState } from "react";
// import dotenv from "dotenv"
// dotenv.config({
//   path:"./.env"
// })
const useMovieLink = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const[newReleaseMovies,setNewReleaseMovies]=useState([])
  const[topRatedMovies,setTopRatedMovies]=useState([])
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API;
      try {
        // Fetch New Releases (Popular Movies)
        setLoading(true);
        let urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        const responsePopular = await axios.get(urlPopular);
        const dataPopular = responsePopular.data.results;
        setMovies(dataPopular);
        setLoading(false)
        // console.log("movie",dataPopular)

        // Fetch Upcoming Movies
        let urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
        const responseUpcoming = await axios.get(urlUpcoming);
        const dataUpcoming = responseUpcoming.data.results;
        setUpcomingMovies(dataUpcoming);

        let urlNewReleases = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
        const responseNew = await axios.get(urlNewReleases);
        const dataNewReleases = responseNew.data.results;
        // console.log("data",dataNewReleases)
        setNewReleaseMovies(dataNewReleases);

        let urlTopReleases = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
        const responseTopRated = await axios.get(urlTopReleases);
        const dataTopReleases = responseTopRated.data.results;
        setTopRatedMovies(dataTopReleases);

      } catch (error) {
        console.log("error fetching movie data:", error);
      }
    };
    fetchData();
  }, []);

  return { movies, upcomingMovies ,newReleaseMovies,topRatedMovies,loading};
};

export default useMovieLink;
