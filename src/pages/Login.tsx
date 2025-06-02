import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

// Temporary user credentials
export const tempCredentials = {
  banks: [
    {
      email: "firstbank@example.com",
      password: "bank123",
      name: "First Bank Nigeria PLC",
    },
    { email: "zenith@example.com", password: "bank123", name: "Zenith Bank" },
    { email: "gtbank@example.com", password: "bank123", name: "GTBank" },
  ],
  consultants: [
    {
      email: "consultant@example.com",
      password: "consultant123",
      name: "John Adeyemi",
    },
    {
      email: "senior@example.com",
      password: "consultant123",
      name: "Sarah Okoro",
    },
  ],
  government: [
    { email: "admin@fct.gov.ng", password: "admin123", name: "FCT Admin" },
    {
      email: "director@fct.gov.ng",
      password: "admin123",
      name: "Tax Director",
    },
  ],
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    // Simple validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setIsLoggingIn(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      let isAuthenticated = false;
      let userName = "";
      let userType = "";

      // Check bank credentials
      const bankUser = tempCredentials.banks.find(
        (user) => user.email === email && user.password === password
      );
      if (bankUser) {
        isAuthenticated = true;
        userName = bankUser.name;
        userType = "bank";
      }

      // Check consultant credentials
      const consultantUser = tempCredentials.consultants.find(
        (user) => user.email === email && user.password === password
      );
      if (consultantUser) {
        isAuthenticated = true;
        userName = consultantUser.name;
        userType = "consultant";
      }

      // Check government credentials
      const govUser = tempCredentials.government.find(
        (user) => user.email === email && user.password === password
      );
      if (govUser) {
        isAuthenticated = true;
        userName = govUser.name;
        userType = "government";
      }

      if (isAuthenticated) {
        // Store user info in session storage
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("userName", userName);

        // Redirect based on user type
        if (userType === "bank") {
          navigate("/bank-portal");
        } else if (userType === "consultant") {
          navigate("/consultant-portal");
        } else if (userType === "government") {
          navigate("/government-portal");
        }
      } else {
        setError("Invalid email or password");
      }

      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
        <div className="bg-primary p-6 flex flex-col items-center">
          {/* Abuja Logo */}
          <Logo size="large" className="mb-4" />
          <h1 className="text-white text-xl font-bold">
            FCT Agency POS Taxation
          </h1>
          <p className="text-white text-sm opacity-90">
            Federal Capital Territory, Abuja
          </p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition ${
                isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Temporary Credentials Help */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Demo Credentials
            </h3>
            <div className="text-xs text-blue-700">
              <p className="mb-1">
                <strong>Bank:</strong> firstbank@example.com / bank123
              </p>
              <p className="mb-1">
                <strong>Consultant:</strong> consultant@example.com /
                consultant123
              </p>
              <p>
                <strong>Government:</strong> admin@fct.gov.ng / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
