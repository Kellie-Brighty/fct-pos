import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import BankPortal from "./pages/BankPortal";
import ConsultantPortal from "./pages/ConsultantPortal";
import GovernmentPortal from "./pages/GovernmentPortal";
import Footer from "./Footer";

// Components
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary relative rounded-sm overflow-hidden border-2 border-white">
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent-gold"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-blue"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent-blue"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold text-white font-heading">
            FCT POS Taxation System
          </h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <a
            href="#features"
            className="text-white hover:text-accent-gold transition"
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-white hover:text-accent-gold transition"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="bg-accent-blue hover:bg-opacity-80 px-4 py-2 rounded-md text-white font-medium transition"
          >
            Login
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-dark py-3 px-4 mt-1 border-t border-primary-light">
          <div className="flex flex-col space-y-3">
            <a
              href="#features"
              className="text-white hover:text-accent-gold transition py-2 px-1 border-b border-primary-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-white hover:text-accent-gold transition py-2 px-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading">
              POS Agency Taxation & Visibility System
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              A transparent and efficient tax collection system for POS
              transactions in the Federal Capital Territory, Abuja.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="bg-accent-gold hover:bg-opacity-80 px-6 py-3 rounded-md text-secondary-dark font-bold transition text-center"
              >
                Register Bank
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 px-6 py-3 rounded-md text-primary font-bold transition text-center"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            {/* POS Transaction Illustration Placeholder */}
            <div className="w-full max-w-md mx-auto bg-white bg-opacity-10 rounded-lg p-6 border border-white border-opacity-20">
              <div className="aspect-video bg-primary-light rounded-lg flex items-center justify-center">
                <div className="relative w-24 h-32 bg-white rounded-md shadow-lg">
                  <div className="absolute top-2 left-0 right-0 mx-auto w-20 h-4 bg-gray-200 rounded-sm"></div>
                  <div className="absolute bottom-4 left-0 right-0 mx-auto w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <div className="absolute bottom-20 left-0 right-0 mx-auto w-16 h-3 bg-gray-300 rounded-sm"></div>
                </div>
                <div className="ml-4 w-32 h-24 bg-white rounded-md shadow-lg p-2">
                  <div className="w-full h-4 bg-gray-200 rounded-sm mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 rounded-sm mb-2"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary hover:shadow-lg transition">
      <div className="text-accent-blue mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-heading">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading">
            Key System Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform ensures transparent and efficient tax collection for
            all POS transactions in the FCT.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            }
            title="Real-time Monitoring"
            description="Track all POS transactions and tax deductions in real-time for complete visibility."
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
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
            }
            title="Automated Calculations"
            description="Precise 0.2% tax calculation on every transaction with automated reconciliation."
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
            title="Secure Integration"
            description="Bank-level security with OAuth 2.0 for all data exchanges and API integrations."
          />
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-primary-light to-primary"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 font-heading">Contact Us</h2>
            <p className="text-gray-600">
              Have questions about the FCT POS Taxation System? Reach out to our
              team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 font-heading">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary-light rounded-full p-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">info@fctpostaxation.gov.ng</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-light rounded-full p-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-600">+234 803 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-light rounded-full p-2 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Office</h4>
                    <p className="text-gray-600">
                      FCT Revenue Office, Abuja, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 font-heading">
                Support Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span className="text-gray-600">9:00 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </li>
              </ul>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 font-heading">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-primary-light hover:bg-primary rounded-full p-2 text-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 5.796a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.805-2.27 8.22 8.22 0 01-2.606.996A4.096 4.096 0 0013.847 9.67c0 .322.036.635.106.935a11.648 11.648 0 01-8.457-4.287 4.109 4.109 0 001.27 5.477A4.086 4.086 0 015.47 11.15v.052a4.106 4.106 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85 8.233 8.233 0 01-5.096 1.756 8.33 8.33 0 01-.979-.057 11.617 11.617 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.53A8.318 8.318 0 0022 5.796z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-primary-light hover:bg-primary rounded-full p-2 text-white transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <Hero />
      <Features />
      <ContactSection />
      <Footer />
    </div>
  );
};

// Main App Component with Routing
const App = () => {
  // Simple authentication check
  const isAuthenticated = (requiredUserType: string) => {
    const userType = sessionStorage.getItem("userType");
    return userType === requiredUserType;
  };

  // Protected route component
  const ProtectedRoute = ({
    children,
    requiredUserType,
  }: {
    children: React.ReactElement;
    requiredUserType: string;
  }) => {
    if (!isAuthenticated(requiredUserType)) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/bank-portal"
          element={
            <ProtectedRoute requiredUserType="bank">
              <BankPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultant-portal"
          element={
            <ProtectedRoute requiredUserType="consultant">
              <ConsultantPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/government-portal"
          element={
            <ProtectedRoute requiredUserType="government">
              <GovernmentPortal />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
