import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFavorite, addFavorite, removeFavorite }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=Sem+Imagem";

    return (
    <li style={{ listStyle: "none", marginBottom: "20px" }}>
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} width={150} />
      </Link>

      <div>
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.slice(0, 4) || "Ano desconhecido"}</p>

        {isFavorite(movie.id) ? (
        <button onClick={() => removeFavorite(movie.id)}>Remover dos favoritos</button>
      ) : (
        <button onClick={() => addFavorite(movie)}>Adicionar aos favoritos</button>
      )}
      </div>
    </li>
    );
}