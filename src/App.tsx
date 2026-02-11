import React, { useState } from "react";
import { Select, ConfigProvider, theme } from "antd";
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
import Logo from "./components/Logo";
import PosTerminalImg from "./assets/pos-terminal.png";

// Components
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-xl border-b border-white/10 py-5 transition-all duration-500">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <Logo size="medium" />
          <div>
            <h1 className="text-xl font-black text-white font-heading tracking-tighter text-glow group-hover:scale-105 transition-transform duration-300">
              FCT <span className="text-primary-light">POS</span> TAXATION
            </h1>
            <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] leading-none">Institutional Portal</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <a
            href="#features"
            className="text-[11px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all duration-300"
          >
            System capabilities
          </a>
          <a
            href="#contact"
            className="text-[11px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all duration-300"
          >
            Contact
          </a>
          <Link
            to="/login"
            className="btn-primary"
          >
            Secure Access
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
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
        <div className="md:hidden glass-card mx-4 mt-4 overflow-hidden animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 space-y-6">
            <a
              href="#features"
              className="text-xs font-black text-white/80 uppercase tracking-widest border-b border-white/5 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Operational Specs
            </a>
            <a
              href="#contact"
              className="text-xs font-black text-white/80 uppercase tracking-widest border-b border-white/5 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Directives
            </a>
            <Link
              to="/login"
              className="btn-primary text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative pt-44 pb-32 overflow-hidden bg-secondary">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-[10%] w-[40%] h-[40%] bg-accent-gold/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 font-heading leading-[0.95] tracking-tighter text-glow">
              Automated <br />
              <span className="text-primary-light">POS Revenue</span> <br />
              <span className="text-accent-gold">Registry</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-12 text-white/50 font-medium leading-relaxed max-w-lg">
              A simple and transparent way to collect taxes from POS transactions in Abuja.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <Link
                to="/register"
                className="btn-primary text-lg px-10 py-4 scale-105 hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(0,109,53,0.4)]"
              >
                Register Now
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 rounded-xl border border-white/10 text-white font-black hover:bg-white/5 transition-all duration-300 text-center uppercase tracking-[0.2em] text-[10px] flex items-center justify-center backdrop-blur-sm"
              >
                Log In
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block animate-in zoom-in fade-in duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-dark rounded-3xl blur-[20px] opacity-20 group-hover:opacity-40 transition-all duration-1000"></div>
              <div className="relative glass-card p-1 border-white/10 overflow-hidden rounded-3xl">
                <div className="bg-secondary-dark/80 p-8 rounded-[22px]">
                   <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-secondary-dark/50 border border-white/5 flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,109,53,0.3),transparent)]"></div>
                      
                      {/* POS Terminal Asset */}
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <img 
                          src={PosTerminalImg} 
                          alt="Bold POS Terminal" 
                          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-6 hover:rotate-0 transition-transform duration-700"
                        />
                        
                        {/* Shadow / Floating Effect */}
                        <div className="absolute bottom-4 w-4/5 h-6 bg-black/60 blur-2xl rounded-full -z-10"></div>
                      </div>
                   </div>
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
    <div className="glass-card p-10 group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
        <div className="text-primary-light group-hover:text-primary-high transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-black text-white mb-4 font-heading group-hover:text-primary-light transition-colors tracking-tight uppercase">
        {title}
      </h3>
      <p className="text-white/80 font-medium leading-relaxed group-hover:text-white/80 transition-colors">
        {description}
      </p>
    </div>
  );
};

const AgentTaxStatusCheck = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState<"phone" | "taxId">("phone");
  const [isChecking, setIsChecking] = useState(false);
  const [searchResult, setSearchResult] = useState<null | {
    status: "paid" | "unpaid" | "not_found";
    agentName?: string;
    bankName?: string;
    lastPaymentDate?: string;
    dueAmount?: number;
  }>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Demo data
      if (searchInput === "08012345678" || searchInput === "FCTPOS123") {
        setSearchResult({
          status: "paid",
          agentName: "John Doe",
          bankName: "First Bank Nigeria PLC",
          lastPaymentDate: "2023-06-15",
        });
      } else if (searchInput === "08087654321" || searchInput === "FCTPOS456") {
        setSearchResult({
          status: "unpaid",
          agentName: "Jane Smith",
          bankName: "Zenith Bank",
          dueAmount: 25000,
        });
      } else {
        setSearchResult({
          status: "not_found",
        });
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchResult(null);
  };

  return (
    <section className="py-32 relative bg-secondary overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-1000">
             <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-4">Check Status</p>
             <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter text-glow">
                POS Agent <span className="text-primary-light">Tax</span> Check
             </h2>
          </div>

          <div className="glass-card p-1 items-center overflow-hidden rounded-[2rem] border-white/5 bg-white/2 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="bg-[#05080F]/80 backdrop-blur-3xl p-10 md:p-14 rounded-[1.8rem]">
               <form onSubmit={handleSearch} className="space-y-10">
                   <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label htmlFor="searchType" className="block text-[10px] font-black text-white/80 uppercase tracking-widest ml-1">Search By</label>
                      <div className="relative">
                        <Select
                          className="w-full text-white min-h-[48px]"
                          popupClassName="ant-select-dropdown"
                          value={searchType}
                          onChange={(value) => setSearchType(value)}
                          options={[
                            { value: "phone", label: "Phone Number" },
                            { value: "taxId", label: "Tax ID Number" },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="searchInput" className="block text-[10px] font-black text-white/80 uppercase tracking-widest ml-1">
                        {searchType === "phone" ? "Enter Phone Number" : "Enter Tax ID"}
                      </label>
                      <input
                        type={searchType === "phone" ? "tel" : "text"}
                        id="searchInput"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder={searchType === "phone" ? "000 000 0000" : "X-000-000"}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button
                      type="submit"
                      disabled={isChecking || !searchInput}
                      className="btn-primary text-sm px-12 py-5 scale-105"
                    >
                      {isChecking ? "Synchronizing..." : "Initiate Verification"}
                    </button>
                    {searchResult && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-[0.3em] transition-all"
                      >
                        Clear Buffer
                      </button>
                    )}
                  </div>
               </form>

               {searchResult && (
                 <div className="mt-16 animate-in zoom-in-95 fade-in duration-500">
                    <div className="p-px rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent">
                       <div className="bg-white/2 backdrop-blur-md rounded-3xl p-10 border border-white/5 items-center flex flex-col md:flex-row gap-10">
                          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${
                            searchResult.status === "paid" ? "bg-primary/10 border-primary shadow-[0_0_30px_rgba(0,109,53,0.3)]" : 
                            searchResult.status === "unpaid" ? "bg-accent-red/10 border-accent-red/50 shadow-[0_0_30px_rgba(255,90,90,0.2)]" :
                            "bg-white/5 border-white/20"
                          }`}>
                             {searchResult.status === "paid" ? (
                               <svg className="w-10 h-10 text-primary-high" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                             ) : searchResult.status === "unpaid" ? (
                               <svg className="w-10 h-10 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             ) : (
                               <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                             )}
                          </div>
                          
                          <div className="flex-1 text-center md:text-left">
                             <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.4em] mb-2">Subject Identified</p>
                             <h3 className="text-3xl font-black text-white mb-2 font-heading tracking-tight">{searchResult.agentName || "Null Result"}</h3>
                             <p className={`text-sm font-bold uppercase tracking-widest ${searchResult.status === "paid" ? "text-primary-high" : "text-accent-red"}`}>
                                {searchResult.status === "paid" ? "Protocol: Compliant" : searchResult.status === "unpaid" ? "Protocol: Breach Detected" : "Identity Not Found"}
                             </p>
                          </div>
                                                    <div className="grid grid-cols-2 gap-10 text-center md:text-right border-l border-white/5 pl-10">
                             <div>
                                <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Bank</p>
                                <p className="text-xs font-bold text-white uppercase">{searchResult.bankName || "N/A"}</p>
                             </div>
                             <div>
                                {searchResult.status === "paid" ? (
                                  <>
                                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Date Paid</p>
                                    <p className="text-xs font-bold text-white uppercase">{searchResult.lastPaymentDate}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Amount Due</p>
                                    <p className="text-xs font-bold text-accent-red uppercase">₦{searchResult.dueAmount?.toLocaleString()}</p>
                                  </>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 relative bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 animate-in fade-in duration-1000">
          <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter text-glow">
            System <span className="text-primary-light">Features</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 font-medium">
            Helping Abuja manage POS taxes with simple and clear tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            title="Tracking"
            description="Real-time monitoring of POS transactions to ensure correct tax collection."
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            title="Calculations"
            description="Automatically calculate taxes based on transaction volume with zero errors."
          />

          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
            title="Security"
            description="High-level security for all data and bank connections, keeping your information safe."
          />
        </div>
      </div>
    </section>
  );
};


const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#006D3511,transparent)] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card p-1 items-center overflow-hidden rounded-[2.5rem] border-white/5 bg-white/2 shadow-[0_0_50px_rgba(0,0,0,0.3)] max-w-5xl mx-auto">
          <div className="bg-[#05080F]/90 backdrop-blur-3xl p-12 md:p-20 rounded-[2.3rem]">
            <div className="grid md:grid-cols-2 gap-20">
              <div>
                <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-4">Get In Touch</p>
                <h2 className="text-4xl font-black text-white font-heading tracking-tighter text-glow mb-8 leading-none">
                  Help Center
                </h2>
                <p className="text-white/80 font-medium leading-relaxed mb-12">
                  Contact the FCT team for any help or questions about the system.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-all">
                      <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none mb-1">Email Us</p>
                      <p className="text-sm font-bold text-white tracking-wide">info@fctpostaxation.gov.ng</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-all">
                      <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/80 uppercase tracking-widest leading-none mb-1">Call Us</p>
                      <p className="text-sm font-bold text-white tracking-wide">+234 803 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
                            <div className="bg-white/5 rounded-3xl p-10 border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3522,transparent)] pointer-events-none"></div>
                <h3 className="text-xl font-black text-white mb-8 font-heading uppercase tracking-tighter text-glow">Send us a Message</h3>
                <form className="space-y-6">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/80" />
                  <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/80" />
                  <textarea rows={4} placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-white/80"></textarea>
                  <button type="submit" className="w-full btn-primary py-4 text-xs shadow-[0_0_20px_rgba(0,109,53,0.3)]">Send Message</button>
                </form>
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
      <AgentTaxStatusCheck />
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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#006D35",
          colorBgContainer: "rgba(255, 255, 255, 0.02)",
          colorBorder: "rgba(255, 255, 255, 0.1)",
          colorText: "#ffffff",
          colorTextPlaceholder: "rgba(255, 255, 255, 0.2)",
          borderRadius: 16,
        },
      }}
    >
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
    </ConfigProvider>
  );
};

export default App;
