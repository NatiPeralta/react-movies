import { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { favorites, addFavorites, removeFavorites, isFavorite } = useFavorites();

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    const apiKey = "6119b68cf5e68e614987d6bc308aeaaa";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro na requisição");
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buscar Filmes</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome do filme"
      />
      <button onClick={handleSearch}>Buscar</button>

      {loading && <Loader />}
      {error && <Error message={error} />}

      <ul style={{ padding: 0 }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite}
            addFavorite={addFavorites}
            removeFavorite={removeFavorites}
        />
        ))}
      </ul>
    </div>
  );
}

export default Home;