import React, {  useState } from "react";
import Navbar from "../component/Navbar";
import useTVShowsLink from "../hooks/useTVShowsLink";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FilterOptions from "../component/Filter";
import { genreMap } from "../utils/Genre/genreUtils";
import FilterCard from "../component/FilterCards/FilterCard";
import { networkIds } from "../utils/NetworkIDs/webSeriesNetworkId";
import MovieCards from "../component/movieCards/MovieCards";

function WebSeriesPage() {
  const endPoint="tv"
  const [appliedFilters, setAppliedFilters] = useState({
    genre: '',
    language: '',
    releaseYear: '',
    popularity: ''
  });
  const { tvShows, newWebSeries} = useTVShowsLink(networkIds);
  return (
    <div>
      <Navbar />

      <FilterOptions setAppliedFilters={setAppliedFilters} genreMap={genreMap} />
      
<FilterCard setAppliedFilters={appliedFilters} endPoint={endPoint}/>
<MovieCards movieSent={tvShows} heading={"Top Rated"}/>
<MovieCards movieSent={newWebSeries} heading={"New Releases"}/>

      
    </div>
  );
}

export default WebSeriesPage;
