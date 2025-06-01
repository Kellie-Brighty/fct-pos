import { useState, useEffect, useRef } from "react";
import BankDashboard from "../components/BankDashboard";
import BankDeclarationForm from "../components/BankDeclarationForm";
import BankTransactionReports from "../components/BankTransactionReports";
import BankPaymentHistory from "../components/BankPaymentHistory";
import BankSettings from "../components/BankSettings";
import LogoutModal from "../components/LogoutModal";

const BankPortal = () => {
  const [currentView, setCurrentView] = useState<
    "dashboard" | "declaration" | "reports" | "payments" | "settings"
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
    view: "dashboard" | "declaration" | "reports" | "payments" | "settings"
  ) => {
    setCurrentView(view);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Mock data for demonstration
  const systemCalculatedTax = 35250;

  const handleDeclarationSubmit = (data: any) => {
    console.log("Declaration submitted:", data);
    // In a real application, you would send this data to your backend
    alert("Declaration submitted successfully!");
    setCurrentView("dashboard");
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-xl font-bold">Bank Portal</h1>
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
                  onClick={() => handleMenuClick("declaration")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "declaration"
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  New Declaration
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Transaction Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleMenuClick("payments")}
                  className={`w-full flex items-center px-4 py-3 ${
                    currentView === "payments"
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Payment History
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
                  First Bank Nigeria PLC
                </span>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  FB
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="overflow-x-hidden">
            {currentView === "dashboard" && <BankDashboard />}

            {currentView === "declaration" && (
              <div className="p-4 md:p-6">
                <h1 className="text-2xl font-bold text-primary mb-6">
                  New Tax Declaration
                </h1>
                <BankDeclarationForm
                  onSubmit={handleDeclarationSubmit}
                  systemCalculatedTax={systemCalculatedTax}
                />
              </div>
            )}

            {currentView === "reports" && <BankTransactionReports />}

            {currentView === "payments" && <BankPaymentHistory />}

            {currentView === "settings" && <BankSettings />}
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

export default BankPortal;
