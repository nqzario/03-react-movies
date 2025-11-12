import { useState } from "react";
import toast from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";

function App() {
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
      const results = await fetchMovies(query);
      setHasError(false);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
    } catch {
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
