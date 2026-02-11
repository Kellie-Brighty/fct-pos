import React from "react";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("userName");

    // Close the modal
    onClose();

    // Redirect to login page
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="w-full max-w-lg glass-card border-white/5 bg-white/2 rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-accent-red/10 blur-3xl"></div>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <span className="w-8 h-px bg-accent-red/40"></span>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-red">
              Security Protocol
            </p>
            <span className="w-8 h-px bg-accent-red/40"></span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            Confirm Logout
          </h2>
        </div>

        {/* Message */}
        <div className="mb-10 relative z-10">
          <p className="text-sm font-black text-white/80 uppercase tracking-widest text-center leading-relaxed">
            Are you sure you want to terminate your active session and exit the portal?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <button
            onClick={onClose}
            className="px-10 py-4 glass-card border border-white/10 text-[10px] font-black text-white hover:bg-white/5 uppercase tracking-widest transition-all rounded-2xl"
          >
            Stay Connected
          </button>
          <button
            onClick={handleLogout}
            className="bg-accent-red text-white px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-500 transition-all shadow-lg shadow-red-500/20 active:scale-95"
          >
            Terminate Session
          </button>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          <div className="w-1 h-1 rounded-full bg-accent-red/40"></div>
          <div className="w-1 h-1 rounded-full bg-accent-red/20 opacity-40"></div>
          <div className="w-1 h-1 rounded-full bg-accent-red/10 opacity-10"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
