import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      navigate("/");
      return;
    }
    // Redireciona para a Home com o parâmetro de busca na URL
    navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <header className="header">
        <div className="header-content">
            <Link to="/" className="logo-container" onClick={() => setSearchTerm("")}>
                <img src={logo} alt="React Movies Logo" className="logo-img" />
            </Link>

            <nav className="nav">
            <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setSearchTerm("")}
            >
                Home
            </Link>
            <Link
                to="/favorites"
                className={location.pathname === "/favorites" ? "active" : ""}
            >
                Favoritos
            </Link>
            </nav>

            <form className="header-search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar filmes..."
                aria-label="Buscar filmes"
            />
            <button type="submit">Buscar</button>
            </form>
        </div>
    </header>
  );
}

export default Header;