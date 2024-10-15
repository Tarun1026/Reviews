const loadMovies = async (searchItem) => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=4b2313ca982860407b4ff3a8e3258ff7&query=${searchItem}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.results) {
        return data.results;
      }
      console.log("dat",data)
      return [];
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };
  
  export default loadMovies;
  