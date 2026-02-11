import { useState, useEffect, useRef } from "react";
import ConsultantDashboard from "../components/ConsultantDashboard";
import ClientManagement from "../components/ClientManagement";
import TaxAssessment from "../components/TaxAssessment";
import ConsultantReports from "../components/ConsultantReports";
import ConsultantSettings from "../components/ConsultantSettings";
import GeospatialIntel from "../components/GeospatialIntel";
import LogoutModal from "../components/LogoutModal";
import Logo from "../components/Logo";

const ConsultantPortal = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "clients" | "assessment" | "reports" | "settings" | "geospatial"
  >("dashboard");
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
  const handleMenuClick = (
    view: "dashboard" | "clients" | "assessment" | "reports" | "settings" | "geospatial"
  ) => {
    setCurrentView(view);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen bg-secondary flex flex-col font-sans selection:bg-primary/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#006D3508,transparent)] pointer-events-none"></div>
      <div className="flex relative flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-secondary/40 backdrop-blur-2xl border-r border-white/5 text-white w-64 fixed lg:sticky lg:top-0 h-full lg:h-screen z-20 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "left-0" : "-left-64"
          } lg:left-0 lg:translate-x-0`}
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center space-x-3">
              <Logo size="small" />
              <h1 className="text-sm font-black text-white font-heading uppercase tracking-widest text-glow">Portfolio Management</h1>
            </div>
          </div>

          <nav className="mt-6">
            <ul>
              <li>
                <button
                  onClick={() => handleMenuClick("dashboard")}
                  className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentView === "dashboard"
                      ? "bg-white/5 text-primary-light border-r-2 border-primary"
                      : "text-white/80 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-4 shrink-0"
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
                  <span className="text-left">Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("clients")}
                  className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentView === "clients"
                      ? "bg-white/5 text-primary-light border-r-2 border-primary"
                      : "text-white/80 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="text-left">Clients Portfolio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("assessment")}
                  className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentView === "assessment"
                      ? "bg-white/5 text-primary-light border-r-2 border-primary"
                      : "text-white/80 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-left">Tax Evaluation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("geospatial")}
                  className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentView === "geospatial"
                      ? "bg-white/5 text-primary-light border-r-2 border-primary"
                      : "text-white/80 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-4 shrink-0"
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
                  <span className="text-left">Geospatial Intel</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("reports")}
                  className={`w-full flex items-center px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                    currentView === "reports"
                      ? "bg-white/5 text-primary-light border-r-2 border-primary"
                      : "text-white/80 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-left">Fiscal Analytical Insights</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-6 border-t border-white/5 bg-secondary/20">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center text-white/80 hover:text-white transition-all w-full text-xs font-bold uppercase tracking-widest group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-4 group-hover:text-accent-red transition-colors"
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
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col relative z-10 lg:ml-0 overflow-hidden">
          {/* Top Bar */}
          <header className="bg-secondary/40 backdrop-blur-2xl border-b border-white/5 w-full">
            <div className="flex justify-between items-center px-6 md:px-10 py-4">
              <button
                ref={menuButtonRef}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white/80 p-2 rounded-xl hover:bg-white/5 transition-all"
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
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none mb-1">Fiscal Consultant Identity</p>
                  <p className="text-xs font-bold text-white uppercase tracking-wide">
                    Jane Doe - Abuja FCT
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-prime-gradient p-px">
                  <div className="w-full h-full bg-secondary rounded-[11px] flex items-center justify-center text-xs font-black text-primary-light">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10 min-w-0 custom-scrollbar">
            {currentView === "dashboard" && <ConsultantDashboard />}
            {currentView === "clients" && <ClientManagement />}
            {currentView === "assessment" && <TaxAssessment />}
            {currentView === "reports" && <ConsultantReports />}
            {currentView === "geospatial" && <GeospatialIntel />}
            {currentView === "settings" && <ConsultantSettings />}
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

export default ConsultantPortal;
