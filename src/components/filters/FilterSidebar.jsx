import { useMemo } from 'react';
import { useFilters } from '../../context/FilterContext';
import { useLayout } from '../../context/LayoutContext';
import { useCategories } from '../../hooks/useCategories';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import BrandFilter from './BrandFilter';
import LoadingSpinner from '../common/LoadingSpinner';
import SearchInput from '../common/SearchInput';

function SectionDivider() {
  return <div className="border-t border-gray-200" />;
}

export default function FilterSidebar() {
  const { filters, dispatch, limits } = useFilters();
  const { availableBrands } = useLayout();
  const { categories, loading: catLoading } = useCategories();

  const visibleCategories = useMemo(() => {
    const limited = categories.slice(0, limits.maxCategories);
    if (!filters.category) return limited;
    const isSelectedVisible = limited.some((cat) => cat.slug === filters.category);
    if (isSelectedVisible) return limited;
    const selected = categories.find((cat) => cat.slug === filters.category);
    return selected ? [...limited, selected] : limited;
  }, [categories, limits.maxCategories, filters.category]);

  const visibleBrands = useMemo(() => {
    const limited = availableBrands.slice(0, limits.maxBrands);
    const extraSelected = filters.brands.filter((brand) => !limited.includes(brand));
    return [...limited, ...extraSelected];
  }, [availableBrands, limits.maxBrands, filters.brands]);

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.brands.length > 0;

  return (
    <div className="p-4">
      <div className="mb-5">
        <SearchInput
          value={filters.search}
          onChange={(search) => dispatch({ type: 'SET_SEARCH', payload: search })}
          placeholder="Search..."
          inputClassName="w-full pl-9 pr-3 py-2 text-body-sm border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-ring focus:border-transparent"
        />
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-caption text-secondary hover:text-secondary-dark hover:underline font-medium mb-4"
        >
          Reset All
        </button>
      )}

      <div className="space-y-5">
        {catLoading ? (
          <LoadingSpinner message="Loading categories..." />
        ) : (
          <CategoryFilter
            categories={visibleCategories}
            selectedCategory={filters.category}
            onCategoryChange={(cat) => dispatch({ type: 'SET_CATEGORY', payload: cat })}
          />
        )}

        <SectionDivider />

        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onPriceChange={({ min, max }) =>
            dispatch({ type: 'SET_PRICE_RANGE', payload: { min, max } })
          }
        />

        {visibleBrands.length > 0 && (
          <>
            <SectionDivider />
            <BrandFilter
              brands={visibleBrands}
              selectedBrands={filters.brands}
              onBrandToggle={(brand) => dispatch({ type: 'TOGGLE_BRAND', payload: brand })}
            />
          </>
        )}
      </div>
    </div>
  );
}
