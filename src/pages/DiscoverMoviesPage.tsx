import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DiscoverMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("life");

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async () => {
    if (searchText === "") {
      setMovies([]);
      return;
    }

    const res = await axios.get(
      "http://www.omdbapi.com/?s=" + searchText + "&apikey=1bb277ac"
    );

    setMovies(res.data.Search);
  };

  return (
    <div>
      <span>Search</span>
      <input
        placeholder="Title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>
      <ul>
        {movies.map((m: any) => {
          return <li key={m.Title}>{m.Title}</li>;
        })}
      </ul>
    </div>
  );
}
