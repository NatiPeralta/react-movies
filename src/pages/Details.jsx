import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getCredits } from "../services/api.js";
import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";
import useFavorites from "../hooks/useFavorites.js";
import "../styles/Details.css";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getCredits(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message || "Erro ao carregar os detalhes do filme");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!movie || !credits) return null;

  const director = credits.crew.find((person) => person.job === "Director");
  const cast = credits.cast.slice(0, 6);
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const rating =
    movie.vote_average && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="details-page">
      {/* Fundo cinematográfico com degradê */}
      {backdropUrl && (
        <div
          className="details-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      <div className="movie-details-container">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>

        <div className="movie-header">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          )}

          <div className="movie-details-info">
            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="movie-tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-meta">
              <span className="meta-rating">★ {rating}</span>
              {movie.release_date && (
                <span>{movie.release_date.slice(0, 4)}</span>
              )}
              {movie.runtime > 0 && <span>{movie.runtime} min</span>}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {director && (
              <p className="movie-director">
                <span>Direção:</span> <strong>{director.name}</strong>
              </p>
            )}

            <div className="movie-overview">
              <h3>Sinopse</h3>
              <p>{movie.overview || "Sinopse não disponível em português."}</p>
            </div>

            <div className="details-actions">
              {isFavorite(movie.id) ? (
                <button
                  className="fav-button remove"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Remover dos favoritos
                </button>
              ) : (
                <button
                  className="fav-button add"
                  onClick={() => addFavorite(movie)}
                >
                  Adicionar aos favoritos
                </button>
              )}
            </div>
          </div>
        </div>

        {cast.length > 0 && (
          <div className="movie-cast-section">
            <h3>Elenco Principal</h3>
            <div className="cast-grid">
              {cast.map((actor) => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "https://via.placeholder.com/200x300?text=Sem+Foto"
                    }
                    alt={actor.name}
                  />
                  <div className="cast-info">
                    <strong>{actor.name}</strong>
                    <span>{actor.character}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;