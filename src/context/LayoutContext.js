import { createContext, useContext, useState, useCallback } from 'react';

const LayoutContext = createContext(null);

/**
 * Provider (HOC-style wrapper) for global layout UI state.
 * Wraps the app in App.js and shares sidebar open/close state
 * between Header, Layout, and FilterSidebar without prop drilling.
 */
export function LayoutProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        availableBrands,
        setAvailableBrands,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

/** Hook to read layout UI state from any child of LayoutProvider. */
export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
};
