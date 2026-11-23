import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites.js";
import MovieCard from "../components/MovieCard.jsx";
import { getPopularMovies } from "../services/api.js";
import "../styles/Favorites.css";

function Favorites() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const data = await getPopularMovies(1);
        setSuggestions(data.results || []);
      } catch (err) {
        console.error("Erro ao carregar sugestões:", err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, []);

  // Filtra filmes que ainda não estão nos favoritos e pega uma fila de 5
  const recommendedMovies = suggestions
    .filter((movie) => !isFavorite(movie.id))
    .slice(0, 5);

  return (
    <div className="favorites-container">
      <h1>Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">Você não tem filmes favoritos ainda.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          ))}
        </div>
      )}

      {/* Seção de Sugestões */}
      {!loadingSuggestions && recommendedMovies.length > 0 && (
        <section className="favorites-suggestions">
          <div className="suggestions-header">
            <h2>Quer adicionar mais filmes aos seus favoritos?</h2>
            <p>Confira alguns destaques populares que ainda não estão na sua lista:</p>
          </div>

          <div className="favorites-grid">
            {recommendedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))}
          </div>

          <div className="suggestions-footer">
            <Link to="/" className="btn-see-more">
              Ver mais filmes
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Favorites;