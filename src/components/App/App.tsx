import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import axios from "axios";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
function App() {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loader, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleSearch = async (query: string) => {
    setLoading(true);
    setMovies([]);

    try {
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

      const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        params
      );
      setHasError(false);
      if (res.data.results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(res.data.results);
    } catch (err) {
      toast.error("Error fetching movies.");
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loader ? (
        <Loader />
      ) : hasError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={handleClick} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
export default App;
