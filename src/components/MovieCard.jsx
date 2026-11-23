import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

export default function MovieCard({ movie, isFavorite, addFavorite, removeFavorite }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  const favorited = isFavorite(movie.id);

  // Formata a nota para 1 casa decimal (ex: 8.4) ou exibe "N/A" se for 0/indisponível
  const rating =
    movie.vote_average && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster-wrapper">
          <img src={posterUrl} alt={movie.title} loading="lazy" />
          <span className="movie-rating" title="Avaliação média">
            ★ {rating}
          </span>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.slice(0, 4) || "Ano desconhecido"}</p>
        </div>
      </Link>

      <div className="favorite-btn">
        {favorited ? (
          <button
            className="btn-remove"
            onClick={() => removeFavorite(movie.id)}
          >
            Remover dos favoritos
          </button>
        ) : (
          <button onClick={() => addFavorite(movie)}>
            Adicionar aos favoritos
          </button>
        )}
      </div>
    </div>
  );
}