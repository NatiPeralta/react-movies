import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";

function Favorites() {
    const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

    return (
        <div className="favorites-container">
            <h1>Meus Favoritos</h1>
            {favorites.length === 0 ? (
                <p>Você não tem filmes favoritos ainda.</p>
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
        </div>
    );
}

export default Favorites;