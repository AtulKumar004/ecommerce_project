import { createContext, useContext, useReducer } from 'react';

export const FILTER_LIMITS = {
  maxCategories: 10,
  maxBrands: 10,
};

const initialState = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  brands: [],
  page: 1,
};

function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: state.category === action.payload ? '' : action.payload,
        brands: [],
        page: 1,
      };
    case 'SET_PRICE_RANGE':
      return { ...state, minPrice: action.payload.min, maxPrice: action.payload.max, page: 1 };
    case 'TOGGLE_BRAND': {
      const brands = state.brands.includes(action.payload)
        ? state.brands.filter((b) => b !== action.payload)
        : [...state.brands, action.payload];
      return { ...state, brands, page: 1 };
    }
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const FilterContext = createContext(null);

/**
 * Provider (HOC-style wrapper) for product filter state.
 * Wraps the app so listing page, sidebar, and hooks share
 * the same search, category, price, brand, and pagination filters.
 */
export function FilterProvider({ children, limits = FILTER_LIMITS }) {
  const [filters, dispatch] = useReducer(filterReducer, initialState);
  console.log("filters ====>" , filters)
  return (
    <FilterContext.Provider value={{ filters, dispatch, limits }}>
      {children}
    </FilterContext.Provider>
  );
}

/** Hook to read and update shared filter state from any child of FilterProvider. */
export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used inside FilterProvider');
  return ctx;
};
