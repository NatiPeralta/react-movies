function Pagination ({ currentPage, totalPages, onPageChange }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <span style={{ margin: "0 10px" }}>
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