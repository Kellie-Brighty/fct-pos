import { useState, useEffect, useRef } from "react";
import LogoutModal from "../components/LogoutModal";

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
    <div className="min-h-screen bg-gray-light flex flex-col">
      <div className="flex relative">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-primary text-white w-64 fixed h-full z-20 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "left-0" : "-left-64"
          } lg:left-0`}
        >
          <div className="p-4 border-b border-primary-light">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-accent-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h1 className="text-xl font-bold">Government Portal</h1>
            </div>
          </div>

          <nav className="mt-6">
            <ul>
              <li>
                <button
                  onClick={() => handleMenuClick("dashboard")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "dashboard"
                      ? "bg-primary-light"
                      : "hover:bg-primary-light"
                  } transition`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
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
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("banks")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "banks"
                      ? "bg-primary-light"
                      : "hover:bg-primary-light"
                  } transition`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                  Bank Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("revenue")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "revenue"
                      ? "bg-primary-light"
                      : "hover:bg-primary-light"
                  } transition`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
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
                  Revenue Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("reports")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "reports"
                      ? "bg-primary-light"
                      : "hover:bg-primary-light"
                  } transition`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
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
                  Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("settings")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "settings"
                      ? "bg-primary-light"
                      : "hover:bg-primary-light"
                  } transition`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
              </li>
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-primary-light">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center text-white hover:text-accent-gold transition w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
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
        <div className="lg:ml-64 w-full">
          {/* Top Bar */}
          <header className="bg-white shadow-sm w-full">
            <div className="flex justify-between items-center px-4 md:px-6 py-3">
              <button
                ref={menuButtonRef}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray p-2 rounded-md hover:bg-gray-100 focus:outline-none"
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

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Government Admin - Abuja FCT
                </span>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  GA
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="overflow-x-hidden p-4 md:p-6">
            {currentView === "dashboard" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-primary mb-4">
                  Government Dashboard
                </h2>
                <p className="text-gray-600 mb-4">
                  Welcome to the FCT POS Taxation System Government Portal.
                </p>
                <div className="text-sm text-gray-500">
                  <p>This is a placeholder for the Government Dashboard.</p>
                  <p>Government portal features will be implemented here.</p>
                </div>
              </div>
            )}
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
