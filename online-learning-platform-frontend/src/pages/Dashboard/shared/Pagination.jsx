const Pagination = ({ page, setPage, total, limit }) => {
  const totalPages = total ? Math.ceil(total / limit) : 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-between mt-6">
      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          disabled={page <= 1}
          onClick={() => setPage(prev => prev - 1)}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition
            ${
              page <= 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-2 rounded-lg border text-sm font-semibold transition
              ${
                num === page
                  ? "bg-[#309255] text-white border-[#309255]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#309255]/10 hover:text-[#309255]"
              }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition
            ${
              page >= totalPages
                ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          Next
        </button>
      </div>

      {/* Page info */}
      <span className="text-sm text-gray-600 font-medium">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>
    </div>
  );
};

export default Pagination;
