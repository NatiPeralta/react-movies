import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="React Movies Logo" className="logo-img" />
            </div>
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