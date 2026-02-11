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
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-gold/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="glass-card w-full max-w-md overflow-hidden relative z-10 border-white/20">
        <div className="bg-prime-gradient p-8 flex flex-col items-center border-b border-white/10">
          {/* Abuja Logo */}
          <div className="bg-white/10 p-4 rounded-full backdrop-blur-md mb-4 border border-white/20 shadow-xl">
            <Logo size="large" />
          </div>
          <h1 className="text-white text-2xl font-bold font-heading tracking-tight text-glow">
            FCT POS Taxation
          </h1>
          <p className="text-white/80 text-sm font-medium uppercase tracking-widest mt-1">
            System Portal
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-white mb-8 text-center font-heading">
            Secure Log In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-lg text-sm backdrop-blur-md animate-pulse">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 ml-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 ml-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full btn-primary py-4 text-base shadow-lg shadow-primary/20 flex items-center justify-center group ${
                isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoggingIn ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
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
                  Logging In...
                </span>
              ) : (
                <>
                  Log In
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Institutional Badge / Demo Info */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="text-[10px] font-bold text-white uppercase tracking-[4px]">
                FCT IRS OFFICIAL ACCESS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
