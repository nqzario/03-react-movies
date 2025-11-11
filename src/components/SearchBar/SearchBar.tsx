import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";
function SearchBar({ onSubmit }: { onSubmit: (query: string) => void }) {
  const handleSubmit = (formData: FormData) => {
    const nameMovie = formData.get("query") as string;
    if (nameMovie.length === 0) {
      toast.error("Please enter your search query.");
    }
    return onSubmit(nameMovie);
  };
  return (
    <header className={styles.header}>
      <div>
        <Toaster />
      </div>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
export default SearchBar;
