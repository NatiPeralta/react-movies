import { useState, useEffect } from "react";
import "../styles/HeroBanner.css";

function HeroBanner({ movies, onExploreClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtra apenas filmes que possuem imagem de fundo (backdrop_path)
  const featuredMovies = movies
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Troca o filme de fundo a cada 6 segundos

    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex];
  const backdropUrl = currentMovie
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : "";

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : "none",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-inner">
            <div className="hero-content">
                <span className="hero-badge">Catálogo & Lançamentos</span>
                <h1>Explore o universo do cinema em um só lugar</h1>
                <p>
                    Descubra os principais lançamentos, pesquise seus títulos
                    favoritos, confira detalhes completos e monte sua lista personalizada
                    para assistir depois.
                </p>

                <div className="hero-actions">
                    <button
                    type="button"
                    className="hero-btn-primary"
                    onClick={onExploreClick}
                    >
                        Explorar Filmes
                    </button>
                </div>

          {currentMovie && (
            <p className="hero-featured-title">
              Em destaque: <strong>{currentMovie.title}</strong>
            </p>
          )}
        </div>

        {/* Indicadores (bolinhas) para trocar o fundo manualmente */}
        {featuredMovies.length > 1 && (
        <div className="hero-dots">
            {featuredMovies.map((movie, index) => (
              <button
                key={movie.id}
                type="button"
                aria-label={`Ver destaque ${movie.title}`}
                className={`hero-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
        </div>
        )}
        <div className="scroll-indicator" onClick={onExploreClick}>
            <span>Role para ver o catálogo</span>
            <div className="scroll-arrow">↓</div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;