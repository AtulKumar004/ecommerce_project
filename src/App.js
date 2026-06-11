import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { LayoutProvider } from './context/LayoutContext';
import Layout from './components/layout/Layout';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductListingPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
            </Route>
          </Routes>
        </LayoutProvider>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
