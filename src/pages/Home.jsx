import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";
import MovieCard from "../components/MovieCard.jsx";
import Pagination from "../components/Pagination.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import { getPopularMovies, searchMovies } from "../services/api.js";
import "../styles/Home.css";
import useFavorites from "../hooks/useFavorites.js";

function Home() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const catalogRef = useRef(null);
  const hasSearched = Boolean(query.trim());

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleSearch = async (searchQuery, page = 1) => {
    setLoading(true);
    setError(null);
    try {
        const data = await searchMovies(searchQuery, page);
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

    // Reage automaticamente quando a URL muda (ex: nova busca ou clique em Home)
    useEffect(() => {
      if (hasSearched) {
        handleSearch(query, 1);
      } else {
        loadPopularMovies(1);
      }
    }, [query]);

  const handlePageChange = (newPage) => {
    if (hasSearched) {
      handleSearch(query, newPage);
    } else {
      loadPopularMovies(newPage);
    }
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {!hasSearched && movies.length > 0 && (
        <HeroBanner movies={movies} onExploreClick={scrollToCatalog} />
      )}

      <div ref={catalogRef} className="catalog-section">
        <h2 className="catalog-title">
          {hasSearched ? `Resultados para "${query}"` : "Filmes Populares"}
        </h2>

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
        !loading && hasSearched && <p>Nenhum filme encontrado.</p>
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
   </div> 
  );
}

export default Home;