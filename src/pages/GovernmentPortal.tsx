import { useState, useEffect, useRef } from "react";
import LogoutModal from "../components/LogoutModal";
import GovernmentDashboard from "../components/GovernmentDashboard";
import GovernmentRevenue from "../components/GovernmentRevenue";
import GovernmentSettings from "../components/GovernmentSettings";
import GeospatialIntel from "../components/GeospatialIntel";
import Logo from "../components/Logo";

const GovernmentPortal = () => {
  const [currentView, setCurrentView] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle if sidebar is open and we're on mobile
      if (!sidebarOpen || window.innerWidth >= 1024) return;

      // Check if click is outside sidebar and not on the menu button
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Helper function to handle menu item clicks
  const handleMenuClick = (view: string) => {
    setCurrentView(view);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen bg-secondary flex flex-col font-sans overflow-hidden">
      <div className="flex relative flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-secondary-dark text-white w-64 fixed lg:sticky lg:top-0 h-full lg:h-screen z-20 transition-all duration-300 ease-in-out border-r border-white/5 ${
            sidebarOpen ? "left-0" : "-left-64"
          } lg:left-0 lg:translate-x-0`}
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                <Logo size="small" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-glow">REVENUE OPERATIONS</h1>
                <p className="text-[10px] text-white/80 uppercase tracking-widest font-semibold">Regulatory Hub</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 px-3">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleMenuClick("dashboard")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentView === "dashboard"
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-left text-sm font-semibold tracking-wide">System Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("revenue")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentView === "revenue"
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-left text-sm font-semibold tracking-wide">Collection Intelligence</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("geospatial")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentView === "geospatial"
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A2 2 0 013 15.483V4.354l6 2.667 6-2.667 6 2.667v11.129a2 2 0 01-1.126 1.792L15 20l-6-2.667L3 20"
                    />
                  </svg>
                  <span className="text-left text-sm font-semibold tracking-wide">Geospatial Intelligence</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-6 border-t border-white/5">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center text-white/80 hover:text-red-400 transition-all duration-300 w-full group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-semibold tracking-wide">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col relative lg:ml-0 overflow-hidden">
          {/* Top Bar */}
          <header className="bg-secondary/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10 w-full">
            <div className="flex justify-between items-center px-6 py-4">
              <button
                ref={menuButtonRef}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white/80 p-2 rounded-lg hover:bg-white/5 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-6">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-bold text-white tracking-tight">Abuja FCT IRS</span>
                  <span className="text-[10px] text-white/80 font-semibold uppercase tracking-widest leading-none mt-0.5">District Admin</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-prime-gradient p-[1px] shadow-lg shadow-primary/20">
                  <div className="w-full h-full rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">GA</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10 min-w-0 custom-scrollbar">
            {currentView === "dashboard" && <GovernmentDashboard />}
            {currentView === "revenue" && <GovernmentRevenue />}
            {currentView === "geospatial" && <GeospatialIntel />}
            {currentView === "settings" && <GovernmentSettings />}
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default GovernmentPortal;
