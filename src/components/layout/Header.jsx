import { Link } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";
import { useFilters } from "../../context/FilterContext";
import SearchInput from "../common/SearchInput";

export default function Header() {
  const { toggleSidebar } = useLayout();
  const { filters, dispatch } = useFilters();

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-[60] flex-shrink-0 h-14">
      <div className="h-full px-4 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-primary-dark transition-colors"
          aria-label="Toggle filters sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-heading">🛒</span>
          <span className="text-title font-bold tracking-tight group-hover:text-secondary-lighter transition-colors hidden sm:inline">
            ShopHub
          </span>
        </Link>

        <div className="flex-1 max-w-2xl mx-auto">
          <SearchInput
            value={filters.search}
            onChange={(search) => dispatch({ type: "SET_SEARCH", payload: search })}
            placeholder="Search products..."
            inputClassName="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-800 text-body-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-light"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-primary-dark transition-colors"
            aria-label="Shopping cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-primary-dark transition-colors"
            aria-label="User account"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
