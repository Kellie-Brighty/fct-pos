import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  bank: string;
  amount: string;
  location: string;
  status: "Confirmed" | "Processing" | "Flagged";
  timestamp: string;
}

const POSLiveFeed = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TXN-8842", bank: "First Bank", amount: "₦45,000", location: "Lagos Metro", status: "Confirmed", timestamp: "Just now" },
    { id: "TXN-8841", bank: "Zenith Bank", amount: "₦125,000", location: "Kano Commercial", status: "Confirmed", timestamp: "2 min ago" },
    { id: "TXN-8840", bank: "UBA", amount: "₦12,500", location: "Port Harcourt", status: "Processing", timestamp: "5 min ago" },
    { id: "TXN-8839", bank: "Access Bank", amount: "₦85,000", location: "Lagos Metro", status: "Confirmed", timestamp: "8 min ago" },
    { id: "TXN-8838", bank: "GTBank", amount: "₦250,000", location: "Abuja Central", status: "Flagged", timestamp: "12 min ago" },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const banks = ["First Bank", "Zenith Bank", "UBA", "Access Bank", "GTBank", "Sterling Bank"];
      const locations = ["Lagos Metro", "Kano Commercial", "Port Harcourt", "Abuja Central", "Ogun Industrial"];
      const statuses: ("Confirmed" | "Processing")[] = ["Confirmed", "Processing"];
      
      const newTx: Transaction = {
        id: `TXN-${Math.floor(Math.random() * 1000) + 9000}`,
        bank: banks[Math.floor(Math.random() * banks.length)],
        amount: `₦${(Math.floor(Math.random() * 200) + 5).toLocaleString()},000`,
        location: locations[Math.floor(Math.random() * locations.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: "Just now"
      };

      setTransactions(prev => [newTx, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden h-full">
      <div className="p-10 border-b border-white/5 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-1">
            Live Feed <span className="text-primary-light">POS Stream</span>
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse"></div>
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Live Protocol Active</span>
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      
      <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 max-h-[500px]">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-5 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-2xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-primary-light uppercase tracking-widest mb-1">{tx.id}</span>
                <span className="text-xs font-black text-white uppercase tracking-tight">{tx.bank}</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-sm font-black text-white tracking-tighter">{tx.amount}</span>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{tx.timestamp}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">{tx.location}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border ${
                tx.status === 'Confirmed' ? 'bg-primary/5 text-primary-light border-primary/20' : 
                tx.status === 'Flagged' ? 'bg-accent-red/5 text-accent-red border-accent-red/20' : 
                'bg-accent-gold/5 text-accent-gold border-accent-gold/20'
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    );
  };

export default POSLiveFeed;
