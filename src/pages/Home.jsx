import { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { searchMovies } from "../services/api";
import "../styles/Home.css";
import useFavorites from "../hooks/useFavorites";

function Home() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (page = 1) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query, page);
      setMovies(data.results || []);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB limita 500 páginas
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || "Erro na requisição");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(1); }}>
      <h1>Buscar Filmes</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do filme"
      />
      <button type="submit" disabled={loading}>Buscar</button>
    </form>

    {loading && <Loader />}
      {error && <Error message={error} />}

      <div className="movie-grid">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite} 
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))
      ) : (
        !loading && <p>Nenhum filme encontrado.</p>
      )}
      </div>

      {movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handleSearch(page)}
        />
      )}
    </div>
  );
}

export default Home;