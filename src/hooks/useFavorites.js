import { useState } from "react";

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            const updated = [...prev, movie];
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => {
            const updated = prev.filter((m) => m.id !== id);
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (id) => favorites.some((m) => m.id === id);

    return { favorites, addFavorite, removeFavorite, isFavorite };
}