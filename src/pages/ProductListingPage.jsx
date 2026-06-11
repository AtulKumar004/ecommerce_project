import { useEffect } from "react";
import { useFilters } from "../context/FilterContext";
import { useLayout } from "../context/LayoutContext";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import Pagination from "../components/common/Pagination";

export default function ProductListingPage() {
  const { filters, dispatch } = useFilters();
  const { setAvailableBrands } = useLayout();
  const {
    products,
    totalProducts,
    totalPages,
    availableBrands,
    loading,
    error,
  } = useProducts(filters);

  useEffect(() => {
    setAvailableBrands(availableBrands);
  }, [availableBrands, setAvailableBrands]);

  const pageTitle = filters.category
    ? filters.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "All Products";

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-title font-bold text-gray-800">{pageTitle}</h1>
        {!loading && !error && (
          <span className="text-body-sm text-gray-500">
            {totalProducts} results
          </span>
        )}
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        totalProducts={totalProducts}
      />

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => dispatch({ type: "SET_PAGE", payload: page })}
      />
    </div>
  );
}
