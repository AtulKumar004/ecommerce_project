import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";
import Header from "./Header";
import FilterSidebar from "../filters/FilterSidebar";

const HEADER_HEIGHT = "3.5rem";

/**
 * App layout shell (layout route wrapper).
 * Wraps every page with a shared navbar and an overlay filter sidebar.
 * Child routes render inside <Outlet /> so main content stays full-width
 * while the sidebar slides over it (Amazon-style).
 */
export default function Layout() {
  const { sidebarOpen, setSidebarOpen } = useLayout();
  const location = useLocation();

  // Close sidebar when user navigates to another page.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  // Lock page scroll while sidebar is open; only sidebar content scrolls.
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col  bg-gray-50">
      <Header />

      <div className="flex-1 min-h-0 relative">
        <main
          className={`h-full overflow-y-auto ${sidebarOpen ? "overflow-hidden" : ""}`}
        >
          <Outlet />
        </main>

        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setSidebarOpen(false)}
          className={`fixed left-0 right-0 bottom-0 z-40 bg-black/40 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ top: HEADER_HEIGHT }}
        />

        <aside
          aria-hidden={!sidebarOpen}
          className={`fixed left-0 z-50 w-72 max-w-[85vw] bg-gray-100 border-r border-gray-200 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full pointer-events-none"
          }`}
          style={{ top: HEADER_HEIGHT, bottom: 0 }}
        >
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            <FilterSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
