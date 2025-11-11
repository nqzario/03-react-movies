import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

async function fetchMovies(query: string, token: string): Promise<Movie[]> {
  const params = {
    params: {
      query,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    params
  );

  return response.data.results;
}
export default fetchMovies;
