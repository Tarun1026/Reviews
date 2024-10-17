import React,{useEffect,useState} from 'react'
import axios from 'axios';
function useTVShowsLink() {
    const [tvShows,setTVShows]=useState([])
    const [newWebSeries,setNewWebSeries]=useState([])
    useEffect(()=>{
        const fetchTVShows = async () => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/discover/tv`, 
                {
                  params: {
                    api_key: '4b2313ca982860407b4ff3a8e3258ff7',
                 
                    sort_by: 'vote_count.desc', 
               
                  }
                }
              );
            //   const filteredShows = response.data.results.filter(show => show.vote_average >= 7);
            //   console.log("flietre",filteredShows)
              console.log( "tv shows",response.data.results); 
              setTVShows(response.data.results)
            } catch (error) {
              console.error('Error fetching TV shows:', error);
              return [];
            }

            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                  params: {
                    api_key: '4b2313ca982860407b4ff3a8e3258ff7',  // Replace with your TMDb API key
                    sort_by: 'first_air_date.desc',  // Sort by most recent air date
                    first_air_date_gte: '2023-01-01',  // Shows released after January 1, 2023
                    first_air_date_lte: new Date().toISOString().split('T')[0],  // Shows released up to today
                    'vote_count.gte': 10,  // Only shows with at least 10 votes
                    page: 1
                  }
                });
            
                console.log('New Web Series:', response.data.results);
                setNewWebSeries(response.data.results)
              } catch (error) {
                console.error('Error fetching new web series:', error);
              }
            
          };
          fetchTVShows()
        },[])
  return {tvShows,newWebSeries}
}

export default useTVShowsLink