import { useState } from "react";

interface Payment {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  method: "Bank Transfer" | "Card Payment" | "Direct Debit";
  reference: string;
  period: string;
  status: "Successful" | "Pending" | "Failed";
  receiptUrl?: string;
}

const BankPaymentHistory = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Sample data for demonstration
  const payments: Payment[] = [
    {
      id: "PMT001",
      invoiceNumber: "INV20230001",
      date: "2023-02-10",
      amount: 24500,
      method: "Bank Transfer",
      reference: "FCTPOS/FB/JAN23/001",
      period: "January 2023",
      status: "Successful",
      receiptUrl: "#",
    },
    {
      id: "PMT002",
      invoiceNumber: "INV20230025",
      date: "2023-04-12",
      amount: 31200,
      method: "Direct Debit",
      reference: "FCTPOS/FB/MAR23/003",
      period: "March 2023",
      status: "Successful",
      receiptUrl: "#",
    },
    {
      id: "PMT003",
      invoiceNumber: "INV20230042",
      date: "2023-05-15",
      amount: 29800,
      method: "Card Payment",
      reference: "FCTPOS/FB/APR23/002",
      period: "April 2023",
      status: "Pending",
    },
    {
      id: "PMT004",
      invoiceNumber: "INV20230034",
      date: "2023-03-08",
      amount: 28900,
      method: "Bank Transfer",
      reference: "FCTPOS/FB/FEB23/001",
      period: "February 2023",
      status: "Failed",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Filter payments based on status
  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter(
          (payment) => payment.status.toLowerCase() === filterStatus
        );



  return (
    <div className="p-4 md:p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 font-heading tracking-tighter text-glow">
          Payment Ledger
        </h1>
        <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
          Institutional Remittance History • Sequential Transaction Logs • Fiscal Manifest
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-10 gap-8">
        <div className="flex items-center space-x-6">
          <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Protocol Filter:</span>
          <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
            {["all", "successful", "pending", "failed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filterStatus === status 
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(0,109,53,0.4)]" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search Ledger (ID / RF)..."
              className="w-full sm:w-72 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="btn-primary px-8 py-3 text-[10px] tracking-widest uppercase font-black">
            Execute Search
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        {[
          { label: "Successful Cycles", count: payments.filter((p) => p.status === "Successful").length, color: "primary", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
          { label: "Pending Verification", count: payments.filter((p) => p.status === "Pending").length, color: "blue", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
          { label: "Failed Protocols", count: payments.filter((p) => p.status === "Failed").length, color: "accent-red", icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl border-white/5 bg-white/2 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}/5 blur-3xl -mr-10 -mt-10 group-hover:bg-${stat.color}/10 transition-colors`}></div>
            <div className="flex items-center space-x-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 flex items-center justify-center border border-${stat.color}/20`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${stat.color === 'primary' ? 'primary-light' : stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white uppercase tracking-tighter">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Desktop view */}
      <div className="hidden md:block glass-card border-white/5 bg-white/2 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/2">
                {["Payment ID", "Invoice #", "Date", "Amount", "Method", "Period", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                    {payment.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {payment.date}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {payment.method}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {payment.period}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      payment.status === 'Successful' ? 'bg-primary/10 text-primary-light border border-primary/20' :
                      payment.status === 'Pending' ? 'bg-blue/10 text-blue border border-blue/20' :
                      'bg-accent-red/10 text-accent-red border border-accent-red/20'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs">
                    <div className="flex items-center space-x-4">
                      {payment.status === "Successful" && payment.receiptUrl && (
                        <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest flex items-center transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Manifest
                        </button>
                      )}
                      {payment.status === "Failed" && (
                        <button className="text-[10px] font-black text-accent-red hover:text-white uppercase tracking-widest flex items-center transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Re-Sync
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mt-10 glass-card border-white/5 bg-white/2 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#006D3508,transparent)] pointer-events-none"></div>
        <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-12">
          Protocol Documentation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/80 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
              Supported Remittance Channels
            </h4>
            <ul className="text-xs font-medium text-white/80 space-y-4 uppercase tracking-wider">
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Institutional Bank Transfer (FCT-POS Collection Node)</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Cryptographic Card Processing via Core Gateway</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Authorized Direct Debit Protocols</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Mobile USSD Transaction Interface</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white/80 uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
              Institutional Timelines
            </h4>
            <ul className="text-xs font-medium text-white/80 space-y-4 uppercase tracking-wider">
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Remittance Deadline: T+14 Days (Post-Manifest Generation)</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Latency Penalty: 5.0% Protocol Surcharge on Expiry</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Real-time Manifest Generation on Protocol Success</li>
              <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Propagation Delay: Up to 24 Hours (Internal Node Sync)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankPaymentHistory;
