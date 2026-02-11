import { useState } from "react";
import { Link } from "react-router-dom";
import BankOnboardingForm from "../components/BankOnboardingForm";
import { BankOnboardingData } from "../types";
import Logo from "../components/Logo";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BankOnboardingData | null>(
    null
  );

  const handleSubmit = (data: BankOnboardingData) => {
    console.log("Registration data:", data);
    // In a real application, you would send this data to your backend
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-secondary py-20 px-4 relative overflow-hidden text-white font-sans selection:bg-primary/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3511,transparent)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in duration-1000">
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 p-4 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
              <Logo size="large" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white font-heading tracking-tighter text-glow">
            Agency <span className="text-primary-light">Registration</span>
          </h1>
          <p className="mt-4 text-white/80 font-medium uppercase tracking-[0.2em] text-xs">Register your institution with the POS system</p>
        </div>

        {!isSubmitted ? (
          <div className="glass-card p-1 rounded-[2.5rem] border-white/5 bg-white/2">
            <div className="bg-[#05080F]/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.3rem]">
              <BankOnboardingForm onSubmit={handleSubmit} />
            </div>
          </div>
        ) : (
          <div className="glass-card p-1 items-center overflow-hidden rounded-[2.5rem] border-white/5 bg-white/2 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            <div className="bg-[#05080F]/90 backdrop-blur-3xl p-12 md:p-20 rounded-[2.3rem]">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary shadow-[0_0_30px_rgba(0,109,53,0.3)] text-primary-high mb-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-white mb-4 font-heading tracking-tight text-glow">
                  Registration Successful!
                </h2>
                <p className="text-white/80 font-medium">
                  We have received the registration for {submittedData?.bankName}.
                </p>
              </div>

              <div className="bg-white/2 backdrop-blur-md rounded-3xl p-8 border border-white/5 mb-10">
                <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">Registration Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Institution</p>
                    <p className="text-sm font-bold text-white uppercase">{submittedData?.bankName}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Tax ID</p>
                    <p className="text-sm font-bold text-white uppercase">{submittedData?.taxIdNumber}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm font-bold text-white uppercase">{submittedData?.officialEmail}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mb-1">POS Agents</p>
                    <p className="text-sm font-bold text-white uppercase">{submittedData?.posAgentsCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20 mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3522,transparent)] pointer-events-none"></div>
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white mb-3 font-heading uppercase tracking-widest">
                      Protocol & Next Steps
                    </h3>
                    <p className="text-white/80 text-xs font-medium leading-relaxed mb-4">
                      Your application is now undergoing institutional verification. Please check your email at{" "}
                      <span className="text-primary-light font-bold">
                        {submittedData?.officialEmail}
                      </span>{" "}
                      for further instructions.
                    </p>
                    <p className="text-white/80 text-xs font-medium leading-relaxed">
                      Verification normally completes within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Link
                  to="/"
                  className="btn-primary px-10 py-4 text-xs tracking-widest uppercase font-black"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-white/80 text-xs font-medium uppercase tracking-widest">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-primary-light font-bold hover:text-white transition-colors ml-2"
            >
              Log In
            </Link>
          </p>
          <p className="mt-4 text-[10px] text-white/80 font-medium uppercase tracking-[0.2em]">
            Support:{" "}
            <a
              href="mailto:support@fctpostaxation.gov.ng"
              className="hover:text-white transition-colors"
            >
              support@fctpostaxation.gov.ng
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
