import { useState, useEffect } from "react";
import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { getPopularMovies, searchMovies } from "../services/api.js";
import "../styles/Home.css";
import useFavorites from "../hooks/useFavorites.js";

function Home() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const loadPopularMovies = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies(page); // passe a página para a API
      setMovies(data.results || []);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError("Não foi possível carregar os filmes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies(1);
  }, []);

  const handleSearch = async (page = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

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

  const handlePageChange = (newPage) => {
    if (hasSearched) {
      handleSearch(newPage);
    } else {
      loadPopularMovies(newPage);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  return (
    <div className="home-container">
      <form onSubmit={onSearchSubmit}>
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
        !loading && hasSearched && movies.length === 0 && <p>Nenhum filme encontrado.</p>
      )}
      </div>

      {movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Home;