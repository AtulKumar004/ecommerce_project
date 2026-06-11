# ShopHub — E-Commerce Product Browser

Leegality first assignment

A React single-page application for browsing products with search, category/brand/price filters, pagination, and product detail views. Product data is fetched from the [DummyJSON](https://dummyjson.com) public API.

## Setup Instructions

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce_app

# Install dependencies
npm install

# Start the development server
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000) and reloads automatically on file changes.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm run build` | Create an optimized production build in `build/` |
| `npm test` | Run the test runner in watch mode |

### Production Build

```bash
npm run build
```

Serve the `build/` folder with any static file server, for example:

```bash
npx serve -s build
```

---

## Assumptions Made

- **Data source:** [DummyJSON](https://dummyjson.com) is used as the sole backend. No custom server or authentication is required.
- **Client-side filtering:** Search, price range, and brand filters are applied in the browser after fetching products. Only category changes trigger a new API request.
- **Product catalog size:** Up to 200 products are fetched at once (`limit=200`). Pagination is handled client-side (12 items per page).
- **No cart or checkout:** Cart and account icons in the header are presentational only — there is no cart state, checkout flow, or user authentication.
- **Filter limits:** Category and brand lists in the sidebar are capped at 10 items by default (`FILTER_LIMITS`), with selected values kept visible even when outside the initial list.
- **Browser support:** Modern evergreen browsers (Chrome, Firefox, Safari). The app targets Create React App's default browserslist configuration.
- **Network:** A stable internet connection is required to load product data from DummyJSON.

---

## Architectural Decisions

### Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 (Create React App) |
| Routing | React Router v7 (nested layout routes) |
| Styling | Tailwind CSS 3 with a custom design token theme |
| HTTP | Axios 1.6.8 via a shared `apiClient` instance |
| State | React Context + `useReducer` (no external state library) |

> **Note:** Despite the parent folder name, this is a **Create React App** project, not Next.js.

### Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI (SearchInput, Pagination, LoadingSpinner, …)
│   ├── filters/      # Filter sidebar and sub-filters (Category, Brand, Price)
│   ├── layout/       # App shell (Header, Layout with overlay sidebar)
│   └── product/      # ProductCard, ProductGrid
├── context/
│   ├── FilterContext.js   # Shared filter state (search, category, price, brands, page)
│   └── LayoutContext.js   # UI state (sidebar open/close, available brands)
├── hooks/
│   ├── useProducts.js     # Fetch + client-side filter + pagination logic
│   ├── useCategories.js   # Category list from API
│   └── useProductDetail.js
├── pages/
│   ├── ProductListingPage.jsx
│   └── ProductDetailPage.jsx
└── services/
    ├── apiClient.js       # Axios instance (base URL, headers)
    └── productService.js  # API method wrappers
```

### State Management

Two context providers wrap the app in `App.js`:

1. **`FilterProvider`** — Holds all product filter state in a reducer (`search`, `category`, `minPrice`, `maxPrice`, `brands`, `page`). Any component can read or update filters via `useFilters()` without prop drilling.
2. **`LayoutProvider`** — Manages UI-only state: sidebar visibility and the list of brands derived from the current product set (shared between the listing hook and filter sidebar).

### Data Fetching Strategy

- **Category fetch:** When a category is selected, `useProducts` calls `fetchProductsByCategory`. Otherwise it fetches all products.
- **Client-side filters:** Search, price range, and brand filters run in a `useMemo` over the loaded product list. This avoids excessive API calls and keeps filtering responsive.
- **Debounced search:** A shared `SearchInput` component debounces input (300 ms) before dispatching to `FilterContext`. The same component is used in both the header and filter sidebar, keeping both inputs in sync.

### Layout Pattern

The app uses a **nested layout route** (`Layout` → `Outlet`). The header is always visible; the filter sidebar slides in as an overlay (Amazon-style) and closes on navigation or backdrop click. Body scroll is locked while the sidebar is open.

### API Layer

Axios is configured once in `apiClient.js` with the DummyJSON base URL. `productService.js` exposes thin wrapper functions (`fetchProducts`, `fetchCategories`, etc.) that return `response.data`. Axios is pinned to **1.6.8** for compatibility with Create React App's Webpack 5 setup (newer Axios versions pull in Node.js adapters that CRA cannot bundle without extra configuration).

---

## Improvements If Given More Time

### Features

- **Server-side search and filtering** — Push search, price, and brand filters to DummyJSON query params (or a real backend) to reduce payload size and improve performance at scale.
- **URL-synced filters** — Persist filter state in query parameters so filters survive page refresh and can be shared via link.
- **Shopping cart** — Add cart context, add-to-cart on product cards/detail page, and a cart drawer or page.
- **Sort options** — Sort by price, rating, or title (DummyJSON supports `sortBy` on some endpoints).

### Technical

- **Unit and integration tests** — Cover filter reducer logic, `useProducts` filtering, and key user flows with React Testing Library.
- **Error boundaries** — Graceful fallback UI for unexpected render errors.
- **Request caching** — Use React Query or SWR to cache API responses, deduplicate requests, and simplify loading/error states.
- **TypeScript** — Migrate to TypeScript for stronger contracts on product shapes and filter state.
- **Accessibility audit** — Improve keyboard navigation for the overlay sidebar, add live regions for filter result counts, and ensure full screen-reader support.

### UX / UI

- **Skeleton loaders** — Replace spinners with skeleton cards during product load.
- **Empty states** — Dedicated illustrations/messages when no products match the current filters.
- **Mobile filter UX** — Bottom sheet or full-screen filter panel on small viewports instead of a narrow slide-over.
- **Infinite scroll** — Optional alternative to numbered pagination for mobile users.

### DevOps

- **Environment variables** — Move API base URL to `.env` for easier environment switching.
- **CI/CD pipeline** — Automated lint, test, and build on pull requests.
- **Deploy preview** — Host on Vercel, Netlify, or GitHub Pages with a one-click deploy workflow.
