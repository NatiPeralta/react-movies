import { useState, useEffect } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    //Carrega do localStage quando o componente monta
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    //Atualiza o localStorage sempre que favorites mudar
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        if (!favorites.some((fav) => fav.id === movie.id)) {
            setFavorites([...favorites, movie]);
        }
    };

    const removeFavorite = (movieId) => {
        setFavorites(favorites.filter((fav) => fav.id !== movieId));
    };

    const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

    return { favorites, addFavorites, removeFavorites, isFavorite };
}