import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useFilterMovies(filterOptions = {},endPoint) { 
  
    const [filteredShows, setFilteredShows] = useState([]); 
    const [showsData,setShowsData]=useState(false)
 
  
    
    const fetchMultiplePages = async () => {
      try {
        let allShows = [];
        let voteAverageParams = {};
  
        // Handle vote_average logic based on popularity filter
        if (filterOptions.popularity === 'lt5') {
          voteAverageParams['vote_average.lte'] = 5;
        } else if (filterOptions.popularity === 'gt5') {
          voteAverageParams['vote_average.gte'] = 5;
        } else if (filterOptions.popularity === 'gt6') {
          voteAverageParams['vote_average.gte'] = 6;
        } else if (filterOptions.popularity === 'gt7') {
          voteAverageParams['vote_average.gte'] = 7;
        } else if (filterOptions.popularity === 'gt8') {
          voteAverageParams['vote_average.gte'] = 8;
        } else if (filterOptions.popularity === 'gt9') {
          voteAverageParams['vote_average.gte'] = 9;
        }
  
        for (let page = 1; page <= 3; page++) {
          const response = await axios.get(`https://api.themoviedb.org/3/discover/${endPoint}`, {
            params: {
              api_key: '4b2313ca982860407b4ff3a8e3258ff7',
              with_genres: filterOptions?.genre || null,
              with_original_language: filterOptions?.language || null,
              "first_air_date.gte": filterOptions?.releaseYear || null,
              page: page,
              ...voteAverageParams // Spread the vote average params dynamically
            },
          });
          console.log('Fetched Page:', page, response.data.results);
          allShows = allShows.concat(response.data.results);
        }
  
        if (allShows.length === 0) {
          setShowsData(true);
          console.log("No shows found for the given filters.");
        }
  
        setFilteredShows(allShows);
      } catch (error) {
        console.error('Error fetching TV shows with filters:', error);
      }
    };
  
    

    // Trigger the fetch function whenever filter options change
    useEffect(() => {
      console.log("Filter Options Changed:", filterOptions);
      if (Object.values(filterOptions).some((val) => val)) {
        fetchMultiplePages(); // Fetch filtered results
      }
    }, [filterOptions]);
    

   
    return { filteredShows,showsData};
}

export default useFilterMovies;
