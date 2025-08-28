import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getCredits } from "../services/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import useFavorites from "../hooks/useFavorites";

function Details() {
    const { id } = useParams();
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
    const cast = credits.cast.slice(0, 5);

    return (
        <div className="movie-details">
            <div className="movie-header">
                {movie.poster_path && (
            <img 
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
        )}

        <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>Ano: {movie.release_date?.slice(0, 4)}</p>
            <p>Avaliação: {movie.vote_average}</p>
            {director && <p>Diretor: {director.name}</p>}

             {isFavorite(movie.id) ? (
                <button className="fav-button remove" onClick={() => removeFavorite(movie.id)}>
                Remover dos favoritos
                </button>
            ) : (
                <button className="fav-button add" onClick={() => addFavorite(movie)}> 
                Adicionar aos favoritos
                </button>
            )}
        </div>
    </div>
            <div className="movie-overview">
                <h3>Sinopse</h3>
                <p>{movie.overview}</p>

                <h3>Elenco</h3>
                <ul>
                    {cast.map((actor) => (
                        <li key={actor.id}>
                            {actor.name} como {actor.character}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Details;