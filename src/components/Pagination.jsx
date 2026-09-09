import "../styles/Home.css";

function Pagination ({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="page-btn">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <span>
                Página {currentPage} de {totalPages}
            </span>
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        </div>
    );
}

export default Pagination;