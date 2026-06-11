import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/productService';

const normalizeCategory = (cat) =>
  typeof cat === 'string'
    ? { slug: cat, name: cat.replace(/-/g, ' ') }
    : { slug: cat.slug, name: cat.name };

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then((data) => {
        if (!cancelled) setCategories(data.map(normalizeCategory));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { categories, loading, error };
}
