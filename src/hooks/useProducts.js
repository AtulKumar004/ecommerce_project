import { useState, useEffect, useMemo } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../services/productService";

const ITEMS_PER_PAGE = 12;

export function useProducts(filters) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const data = filters.category
          ? await fetchProductsByCategory(filters.category)
          : await fetchProducts({ limit: 200 });

        if (!cancelled) setAllProducts(data.products || []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [filters.category]);

  const availableBrands = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand).filter(Boolean))].sort(),
    [allProducts],
  );

  const filteredProducts = useMemo(() => {
    const searchTerm = filters.search?.trim().toLowerCase();
    return allProducts.filter((product) => {
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm))
        return false;
      if (filters.minPrice !== "" && product.price < Number(filters.minPrice))
        return false;
      if (filters.maxPrice !== "" && product.price > Number(filters.maxPrice))
        return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand))
        return false;
      return true;
    });
  }, [allProducts, filters.search, filters.minPrice, filters.maxPrice, filters.brands]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(filters.page, totalPages || 1);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  return {
    products: paginatedProducts,
    totalProducts: filteredProducts.length,
    totalPages,
    availableBrands,
    loading,
    error,
  };
}
