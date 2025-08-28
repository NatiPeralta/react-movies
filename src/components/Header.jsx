import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <nav className="nav">
                <Link 
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
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
        </header>
    );
}

export default Header;