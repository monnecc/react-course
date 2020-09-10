import React, { useEffect, useState } from "react";
import axios from "axios";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any } // todo: specify the data type too
  | { status: "error"; error: any };

export default function DiscoverMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchTextTitle, setsearchTextTitle] = useState("life");
  const [searchTextYear, setSearchTextYear] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async () => {
    if (searchTextTitle === "") {
      setMovies([]);
      return;
    }

    setSearchState({ status: "loading" });

    const newMovies = await getMovies();

    setMovies(newMovies);

    //setSearchState({ status: "success" });
  };

  const getMovies = async () => {
    let url =
      "http://www.omdbapi.com/?s=" +
      encodeURIComponent(searchTextTitle) +
      "&apikey=1bb277ac";

    if (searchTextYear) {
      url += "&y=" + searchTextYear;
    }

    const res = await axios.get(url);

    return res.data.Search;
  };

  return (
    <div>
      <p>
        <span>Search</span>
        <input
          placeholder="Title"
          value={searchTextTitle}
          onChange={(e) => setsearchTextTitle(e.target.value)}
        />
        <input
          placeholder="Release year"
          value={searchTextYear}
          onChange={(e) => setSearchTextYear(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
        <span>{searchState.status}</span>
      </p>
      <ul>
        {movies.map((m: any) => {
          return <li key={m.Title}>{m.Title}</li>;
        })}
      </ul>
    </div>
  );
}
