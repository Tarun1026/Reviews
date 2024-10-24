import React, { useState } from "react";
import Navbar from "../component/Navbar";
import useTVShowsLink from "../hooks/useTVShowsLink";

import FilterOptions from "../component/Filter";
import { genreMap } from "../utils/Genre/genreUtils";
import FilterCard from "../component/FilterCards/FilterCard";
import { networkIds } from "../utils/NetworkIDs/TVShowsNetworkId";
import MovieCards from "../component/movieCards/MovieCards";
function TVShows() {
  const endPoint = "tv";
  const languageHindi="hi"
  const languagePunjabi="pa"

  const [appliedFilters, setAppliedFilters] = useState({
    genre: "",
    language: "",
    releaseYear: "",
    popularity: "",
  });
  const { tvShows, newWebSeries,hindi,punjabi } = useTVShowsLink(networkIds,languageHindi,languagePunjabi);
 

  return (
    <div>
      <Navbar />

      <FilterOptions
        setAppliedFilters={setAppliedFilters}
        genreMap={genreMap}
      />

      <FilterCard setAppliedFilters={appliedFilters} endPoint={endPoint} />
      <MovieCards movieSent={tvShows} heading={"Top Rated"} />
      <MovieCards movieSent={newWebSeries} heading={"New Releases"} />
      <MovieCards movieSent={hindi} heading={"Hindi"} />
      <MovieCards movieSent={punjabi} heading={"Punjabi"} />
    </div>
  );
}

export default TVShows;
