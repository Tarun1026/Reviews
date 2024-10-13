import axios from "axios";
import React, { useEffect, useState } from "react";

const useMovieLink = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const[newReleaseMovies,setNewReleaseMovies]=useState([])
  const[topRatedMovies,setTopRatedMovies]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch New Releases (Popular Movies)
        let urlPopular = "https://api.themoviedb.org/3/movie/popular?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responsePopular = await axios.get(urlPopular);
        const dataPopular = responsePopular.data.results;
        setMovies(dataPopular);
        // console.log("movie",dataPopular)

        // Fetch Upcoming Movies
        let urlUpcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responseUpcoming = await axios.get(urlUpcoming);
        const dataUpcoming = responseUpcoming.data.results;
        setUpcomingMovies(dataUpcoming);

        let urlNewReleases = "https://api.themoviedb.org/3/movie/now_playing?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responseNew = await axios.get(urlNewReleases);
        const dataNewReleases = responseNew.data.results;
        setNewReleaseMovies(dataNewReleases);

        let urlTopReleases = "https://api.themoviedb.org/3/movie/top_rated?api_key=4b2313ca982860407b4ff3a8e3258ff7";
        const responseTopRated = await axios.get(urlTopReleases);
        const dataTopReleases = responseTopRated.data.results;
        setTopRatedMovies(dataTopReleases);

      } catch (error) {
        console.log("error fetching movie data:", error);
      }
    };
    fetchData();
  }, []);

  return { movies, upcomingMovies ,newReleaseMovies,topRatedMovies};
};

export default useMovieLink;
