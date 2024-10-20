import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { networkIds } from '../utils/NetworkIDs/webSeriesNetworkId';
function useTVShowsLink(networkIds) { // Default to an empty object for filterOptions
    const [tvShows, setTVShows] = useState([]); // For storing all TV shows
    const [newWebSeries, setNewWebSeries] = useState([]); // For storing newly released web series
   
   
    useEffect(() => {
        const fetchTVShows = async () => {
           
            const results = [];
        
            try {
                for (const id of networkIds) {
                    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                        params: {
                            api_key: '4b2313ca982860407b4ff3a8e3258ff7',
                            with_networks: id, 
                            sort_by: 'vote_count.desc',
                            // "vote_count.gte":"23980",
                            // with_original_language:"hi"
                        }
                    });
                    results.push(...response.data.results); // Combine results
                }
        
                const uniqueResults = [...new Map(results.map(item => [item.id, item])).values()];
                setTVShows(uniqueResults); // Set fetched TV shows
            } catch (error) {
                console.error('Error fetching TV shows:', error);
            }

            const results2=[]
            try {
                for (const id of networkIds) {
                    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                       params: {
                        api_key: '4b2313ca982860407b4ff3a8e3258ff7',
                        "first_air_date.gte": '2023-01-01',
                        "first_air_date.lte": new Date().toISOString().split('T')[0],
                        'vote_count.gte': 10,
                        // page: 1
                        
                }})
                
                    results2.push(...response.data.results); // Combine results
                }
        
                const uniqueResults2 = [...new Map(results2.map(item => [item.id, item])).values()];
                setNewWebSeries(uniqueResults2); // Set fetched TV shows
            } catch (error) {
                console.error('Error fetching TV shows:', error);
            }
       

        };

        fetchTVShows();
    }, []);


    return { tvShows, newWebSeries};
}

export default useTVShowsLink;
