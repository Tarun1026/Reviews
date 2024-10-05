import React, { useState, useEffect } from "react";

const useIMDBLink = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://imdb188.p.rapidapi.com/api/v1/getPopularMovies";
      const options = {
        method: "POST",
        headers: {
          "x-rapidapi-key": "a1dab9bf6dmshb7ca80ddae28c6cp1d84a2jsnce613014eb03",
          "x-rapidapi-host": "imdb188.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: {
            anyPrimaryCountries: ["IN"],
          },
          limit: 200,
          releaseDate: {
            releaseDateRange: {
              end: "2029-12-31",
              start: "2020-01-01",
            },
          },
          userRatings: {
            aggregateRatingRange: { max: 10, min: 6 },
            ratingsCountRange: { min: 1000 },
          },
          genre: {
            allGenreIds: ["Action"],
          },
          runtime: {
            runtimeRangeMinutes: { max: 120, min: 0 },
          },
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("res", result);  // Check the complete response structure
        setPopularMovies(result.data.list); // Set the 'list' array from result
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return {popularMovies}} 

export default useIMDBLink;
