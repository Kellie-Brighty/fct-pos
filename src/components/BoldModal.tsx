import React, { useEffect } from "react";

interface BoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

const BoldModal: React.FC<BoldModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  showCancel = false,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          glow: "bg-primary/10",
          iconColor: "text-primary",
          borderColor: "border-primary/20",
          dots: "bg-primary/40",
        };
      case "error":
        return {
          glow: "bg-accent-red/10",
          iconColor: "text-accent-red",
          borderColor: "border-accent-red/20",
          dots: "bg-accent-red/40",
        };
      case "warning":
        return {
          glow: "bg-accent-gold/10",
          iconColor: "text-accent-gold",
          borderColor: "border-accent-gold/20",
          dots: "bg-accent-gold/40",
        };
      default:
        return {
          glow: "bg-white/5",
          iconColor: "text-white/80",
          borderColor: "border-white/10",
          dots: "bg-white/20",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="w-full max-w-lg glass-card border-white/5 bg-white/2 rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        <div className={`absolute -right-16 -top-16 w-48 h-48 blur-3xl transition-all ${styles.glow}`}></div>
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <span className={`w-8 h-px ${styles.dots}`}></span>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${styles.iconColor}`}>
              Institutional Alert
            </p>
            <span className={`w-8 h-px ${styles.dots}`}></span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            {title}
          </h2>
        </div>

        {/* Message */}
        <div className="mb-10 relative z-10">
          <p className="text-sm font-black text-white/80 uppercase tracking-widest text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          {showCancel && (
            <button
              onClick={onClose}
              className="px-10 py-4 glass-card border border-white/10 text-[10px] font-black text-white hover:bg-white/5 uppercase tracking-widest transition-all rounded-2xl"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm || onClose}
            className="btn-primary px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl"
          >
            {confirmText}
          </button>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          <div className={`w-1 h-1 rounded-full ${styles.dots}`}></div>
          <div className={`w-1 h-1 rounded-full ${styles.dots} opacity-40`}></div>
          <div className={`w-1 h-1 rounded-full ${styles.dots} opacity-10`}></div>
        </div>
      </div>
    </div>
  );
};

export default BoldModal;
