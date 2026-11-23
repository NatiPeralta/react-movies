import "../styles/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">
          © {currentYear} <strong>React-Movies</strong>. Todos os direitos reservados.
        </p>
        <p className="footer-credits">
          Desenvolvido por Natália Peralta • Dados fornecidos pela API{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;