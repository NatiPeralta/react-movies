import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites, removeFavorite, isFavorite } = useFavorites();

    if (favorites.length === 0) return <p>Você não tem filmes favoritos ainda.</p>;

    return (
        <div>
            <h1>Meus Favoritos</h1>
            <ul style={{ padding: 0 }}>
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isFavorite={isFavorite}
                        removeFavorite={removeFavorite}
                    />    
                ))}
            </ul>
        </div>
    );
}

export default Favorites;