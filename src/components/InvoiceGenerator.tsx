import { useState, useEffect } from "react";
import { BankDeclarationData } from "./BankDeclarationForm";

interface InvoiceGeneratorProps {
  declarationData: BankDeclarationData;
  systemCalculatedTax: number;
  discrepancyPercentage: number;
  onClose: () => void;
}

const InvoiceGenerator = ({
  declarationData,
  systemCalculatedTax,
  discrepancyPercentage,
  onClose,
}: InvoiceGeneratorProps) => {
  const [stage, setStage] = useState<
    "reconciling" | "generating" | "complete" | "discrepancy"
  >("reconciling");
  const [progress, setProgress] = useState(0);
  const [invoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().substring(0, 10)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    taxAmount: declarationData.totalTaxAmount,
    adminFee: declarationData.totalTaxAmount * 0.02, // 2% admin fee
  });

  const hasDiscrepancy = discrepancyPercentage !== 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const reconcileInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 50) {
          clearInterval(reconcileInterval);
          if (hasDiscrepancy) {
            setStage("discrepancy");
          } else {
            setStage("generating");
          }
          return 50;
        }
        return prev + 1;
      });
    }, 40);

    if (!hasDiscrepancy) {
      setTimeout(() => {
        const generateInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(generateInterval);
              setStage("complete");
              return 100;
            }
            return prev + 1;
          });
        }, 40);
      }, 2000);
    }

    return () => {
      document.body.style.overflow = "unset";
      clearInterval(reconcileInterval);
    };
  }, [hasDiscrepancy]);

  const ReconciliationAnimation = () => (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative w-48 h-48 mb-12">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div>
        <div className="absolute inset-4 border-2 border-primary-light/10 rounded-full animate-pulse"></div>
        
        {/* Central Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-primary/20 backdrop-blur-xl border border-primary/30 rounded-[2rem] flex items-center justify-center animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-4">
        {stage === "reconciling" ? "PROTOCOL RECONCILIATION" : "MANIFEST GENERATION"}
      </h3>
      <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
        {stage === "reconciling"
          ? "Cross-referencing institutional data with system logs"
          : "Finalizing institutional tax alignment manifest"}
      </p>

      {/* Premium Progress Bar */}
      <div className="w-full max-w-md bg-white/5 rounded-full h-1 overflow-hidden mb-4 p-[1px] border border-white/5">
        <div
          className="bg-primary h-full rounded-full shadow-[0_0_20px_rgba(0,109,53,0.8)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-[10px] font-black text-primary tracking-[0.2em]">{progress}% ALIGNED</p>
    </div>
  );

  const DiscrepancyNotification = () => (
    <div className="p-12 text-center animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-accent-red/10 border border-accent-red/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(255,107,107,0.1)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">RECONCILIATION DISCREPANCY</h3>
      <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Security Protocol Requirement: 100% Alignment</p>

      <div className="bg-white/2 border border-white/5 rounded-[2rem] p-8 mb-12">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Institutional</p>
            <p className="text-sm font-black text-white uppercase tracking-tight">₦{declarationData.totalTaxAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Regulatory</p>
            <p className="text-sm font-black text-white uppercase tracking-tight">₦{systemCalculatedTax.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Variance</p>
            <p className="text-sm font-black text-accent-red uppercase tracking-tight">{discrepancyPercentage}%</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="btn-primary bg-accent-red border-accent-red/20 hover:bg-accent-red/80 px-12 py-5 text-[10px] font-black tracking-widest uppercase"
      >
        Re-calibrate Declaration
      </button>
    </div>
  );

  const Invoice = () => (
    <div className="p-12 relative overflow-hidden group">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 pb-12 border-b border-white/5">
        <div>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-primary/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">TAX <span className="text-primary-light">MANIFEST</span></h1>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Regulatory Jurisdiction: FCT</p>
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Institutional Alignment Hub</p>
          </div>
        </div>

        <div className="mt-8 md:mt-0 glass-card p-6 bg-white/2 text-right">
          <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Manifest Identification</p>
          <p className="text-sm font-black text-white tracking-tighter uppercase">{invoiceData.invoiceNumber}</p>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Sequential Integrity ID</p>
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">{declarationData.referenceId}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-6">Institution Node</h2>
          <p className="text-lg font-black text-white uppercase tracking-tight mb-2">{declarationData.bankName}</p>
          <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Verified POS Service Provider</p>
        </div>
        <div className="grid grid-cols-2 gap-8 bg-white/2 p-8 rounded-3xl border border-white/5">
          <div>
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Protocol Cycle</p>
            <p className="text-[11px] font-black text-white uppercase tracking-widest">{declarationData.period}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Alignment Status</p>
            <p className="text-[11px] font-black text-primary-light uppercase tracking-widest shadow-text-primary">SYNCHRONIZED</p>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-12 overflow-hidden rounded-3xl border border-white/5">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="text-left p-6 text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Component Description</th>
              <th className="text-right p-6 text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Asset Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-6">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Transaction Remittance</p>
                <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Primary asset pool allocation</p>
              </td>
              <td className="text-right p-6 text-sm font-black text-white tabular-nums">
                ₦{invoiceData.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td className="p-6">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Protocol Admin Fee (2%)</p>
                <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Institutional coordination overhead</p>
              </td>
              <td className="text-right p-6 text-sm font-black text-white tabular-nums">
                ₦{invoiceData.adminFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-primary/20">
              <td className="p-8 text-sm font-black text-white uppercase tracking-[0.2em]">Total Alignment Value</td>
              <td className="text-right p-8 text-2xl font-black text-white tabular-nums tracking-tighter">
                ₦{(invoiceData.taxAmount + invoiceData.adminFee).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-left py-4 px-6 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[8px] font-black text-white/80 uppercase tracking-[0.3em] mb-1">Security Disclaimer</p>
          <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">Encryption-verified by Regulatory Ops Command</p>
        </div>
        
        <div className="flex space-x-6">
          <button 
            onClick={onClose}
            className="px-10 py-5 text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all"
          >
            Exit Portal
          </button>
          <button className="btn-primary px-12 py-5 text-[10px] font-black tracking-widest uppercase">
            Execute Settlement
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
      {/* Backdrop with extreme blur and dark tint */}
      <div className="fixed inset-0 bg-secondary/90 backdrop-blur-3xl animate-in fade-in duration-700" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl z-10 my-auto glass-card border-white/5 bg-white/2 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500">
        {/* Subtle Background Glow */}
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          {(stage === "reconciling" || stage === "generating") && <ReconciliationAnimation />}
          {stage === "complete" && <Invoice />}
          {stage === "discrepancy" && <DiscrepancyNotification />}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
