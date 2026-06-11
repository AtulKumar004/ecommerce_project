export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      }
    }
    const result = [];
    let prev;
    for (const page of pages) {
      if (prev && page - prev > 1) result.push('...');
      result.push(page);
      prev = page;
    }
    return result;
  };

  const btnBase = 'px-3 py-2 rounded-lg text-body-sm border transition-colors';
  const btnActive = 'bg-secondary text-white border-secondary';
  const btnDefault = 'border-gray-300 text-gray-700 hover:bg-gray-50';
  const btnDisabled = 'border-gray-200 text-gray-300 cursor-not-allowed';

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnDefault}`}
      >
        ← Prev
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-gray-400 text-body-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${page === currentPage ? btnActive : btnDefault}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnDefault}`}
      >
        Next →
      </button>
    </div>
  );
}
