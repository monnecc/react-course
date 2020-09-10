import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Movie[] } // todo: specify the data type too
  | { status: "error"; error: string };

type ApiResult = {
  data: ApiDataResult;
  status: number;
  statusText: string;
};

type ApiDataResult = {
  Response: string;
  Error: string;
  Search: Movie[];
};

export type Movie = {
  Title: string;
  Poster: string;
  imdbID: string;
};

export default function DiscoverMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTextTitle, setsearchTextTitle] = useState("life");
  const [searchTextYear, setSearchTextYear] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });

  const getMovies = async () => {
    let url =
      "http://www.omdbapi.com/?s=" +
      encodeURIComponent(searchTextTitle) +
      "&apikey=1bb277ac";

    if (searchTextYear) {
      url += "&y=" + searchTextYear;
    }

    const res: ApiResult = await axios.get(url);

    if (res.status !== 200) {
      throw new Error("Error fetching data: " + res.statusText);
    }
    if (res.data.Response === "False") {
      throw new Error("Error fetching data: " + res.data.Error);
    }

    console.log(res.data.Search);

    return res.data.Search;
  };

  async function searchMovies() {
    if (searchTextTitle === "") {
      setSearchState({ status: "idle" });
      return;
    }

    setSearchState({ status: "loading" });

    try {
      const newMovies = await getMovies();
      setSearchState({ status: "success", data: newMovies });
    } catch (error) {
      setSearchState({
        status: "error",
        error: "Error fetching data: " + error,
      });
    }
  }

  useEffect(() => {
    searchMovies();
  }, []);

  useEffect(() => {
    if (searchState.status === "idle") {
      setMovies([]);
    } else if (searchState.status === "loading") {
      return;
    } else if (searchState.status === "success") {
      setMovies(searchState.data);
    } else if (searchState.status === "error") {
      setMovies([]);
      alert(searchState.error);
    }
  }, [searchState]);

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
        {searchState.status === "loading" ? (
          <span>{searchState.status}</span>
        ) : null}
      </p>
      <ul>
        {searchState.status === "success"
          ? movies.map((m: Movie) => {
              return (
                <li key={m.Title}>
                  <div>
                    <div>
                      <span>{m.Title}</span>
                    </div>
                    <Link to={"/discover/" + m.imdbID}>
                      <img src={m.Poster} alt={m.Title} />
                    </Link>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
