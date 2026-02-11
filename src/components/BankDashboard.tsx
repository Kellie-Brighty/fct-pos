import { useState } from "react";
import MonthlyTaxChart from "./MonthlyTaxChart";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  tax: number;
  agent: string;
  location: string;
}

interface Declaration {
  id: string;
  period: string;
  submittedDate: string;
  declaredAmount: number;
  calculatedAmount: number;
  status: "Matched" | "Discrepancy" | "Pending" | "Paid";
  paymentDate?: string;
  invoiceNumber?: string;
}

const BankDashboard = () => {
  // Sample data - in a real app this would come from API
  const [activeTab, setActiveTab] = useState<
    "overview" | "transactions" | "declarations"
  >("overview");

  const transactionData: Transaction[] = [
    {
      id: "TX001",
      date: "2023-05-01",
      amount: 50000,
      tax: 100,
      agent: "Agent 1",
      location: "Wuse, FCT",
    },
    {
      id: "TX002",
      date: "2023-05-01",
      amount: 25000,
      tax: 50,
      agent: "Agent 2",
      location: "Garki, FCT",
    },
    {
      id: "TX003",
      date: "2023-05-02",
      amount: 100000,
      tax: 200,
      agent: "Agent 3",
      location: "Maitama, FCT",
    },
    {
      id: "TX004",
      date: "2023-05-02",
      amount: 75000,
      tax: 150,
      agent: "Agent 1",
      location: "Wuse, FCT",
    },
    {
      id: "TX005",
      date: "2023-05-03",
      amount: 30000,
      tax: 60,
      agent: "Agent 4",
      location: "Asokoro, FCT",
    },
    {
      id: "TX006",
      date: "2023-05-03",
      amount: 45000,
      tax: 90,
      agent: "Agent 2",
      location: "Garki, FCT",
    },
    {
      id: "TX007",
      date: "2023-05-04",
      amount: 60000,
      tax: 120,
      agent: "Agent 5",
      location: "Central Area, FCT",
    },
    {
      id: "TX008",
      date: "2023-05-04",
      amount: 80000,
      tax: 160,
      agent: "Agent 3",
      location: "Maitama, FCT",
    },
  ];

  const declarationData: Declaration[] = [
    {
      id: "DCL001",
      period: "January 2023",
      submittedDate: "2023-02-05",
      declaredAmount: 24500,
      calculatedAmount: 24500,
      status: "Paid",
      paymentDate: "2023-02-10",
      invoiceNumber: "INV20230001",
    },
    {
      id: "DCL002",
      period: "February 2023",
      submittedDate: "2023-03-04",
      declaredAmount: 28750,
      calculatedAmount: 28900,
      status: "Discrepancy",
    },
    {
      id: "DCL003",
      period: "March 2023",
      submittedDate: "2023-04-05",
      declaredAmount: 31200,
      calculatedAmount: 31200,
      status: "Paid",
      paymentDate: "2023-04-12",
      invoiceNumber: "INV20230025",
    },
    {
      id: "DCL004",
      period: "April 2023",
      submittedDate: "2023-05-03",
      declaredAmount: 29800,
      calculatedAmount: 29800,
      status: "Matched",
    },
  ];

  // Calculate summary data
  const totalTransactions = transactionData.length;
  const totalVolume = transactionData.reduce((sum, tx) => sum + tx.amount, 0);
  const totalTax = transactionData.reduce((sum, tx) => sum + tx.tax, 0);
  const uniqueAgents = new Set(transactionData.map((tx) => tx.agent)).size;

  // Helper function for status badges
  const getStatusBadge = (status: Declaration["status"]) => {
    switch (status) {
      case "Matched":
        return (
          <span className="px-3 py-1 bg-primary/10 text-primary-light border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            Matched
          </span>
        );
      case "Discrepancy":
        return (
          <span className="px-3 py-1 bg-accent-red/10 text-accent-red border border-accent-red/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            Discrepancy
          </span>
        );
      case "Pending":
        return (
          <span className="px-3 py-1 bg-white/5 text-white/80 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
            Pending
          </span>
        );
      case "Paid":
        return (
          <span className="px-3 py-1 bg-primary/10 text-primary-high border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            Paid
          </span>
        );
      default:
        return null;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };


  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-3">
            Operations Center
          </p>
          <h2 className="text-4xl font-black text-white font-heading tracking-tighter text-glow">
            Institutional Hub <span className="text-primary-light">Overview</span>
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-white/5 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-8 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-1 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "overview"
                ? "border-b-2 border-primary text-primary-light text-glow"
                : "text-white/80 hover:text-white/80"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-4 px-1 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "transactions"
                ? "border-b-2 border-primary text-primary-light text-glow"
                : "text-white/80 hover:text-white/80"
            }`}
          >
            Recent Transactions
          </button>
          <button
            onClick={() => setActiveTab("declarations")}
            className={`pb-4 px-1 text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "declarations"
                ? "border-b-2 border-primary text-primary-light text-glow"
                : "text-white/80 hover:text-white/80"
            }`}
          >
            Declaration History
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Summary Cards */}
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/2 shadow-2xl group hover:border-primary/20 transition-all duration-500">
              <h3 className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-4">
                Total Transactions
              </h3>
              <p className="text-3xl font-black text-white tracking-tighter text-glow mb-2">
                {totalTransactions}
              </p>
              <p className="text-primary-light text-[10px] font-black uppercase tracking-widest">
                +12.5% Monthly Growth
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/2 shadow-2xl group hover:border-secondary/20 transition-all duration-500">
              <h3 className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-4">
                Transaction Volume
              </h3>
              <p className="text-3xl font-black text-white tracking-tighter text-glow mb-2">
                {formatCurrency(totalVolume)}
              </p>
              <p className="text-primary-light text-[10px] font-black uppercase tracking-widest">+8.2% Volume Surge</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/2 shadow-2xl group hover:border-accent-blue/20 transition-all duration-500">
              <h3 className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-4">
                Tax Collected
              </h3>
              <p className="text-3xl font-black text-white tracking-tighter text-glow mb-2">
                {formatCurrency(totalTax)}
              </p>
              <p className="text-primary-light text-[10px] font-black uppercase tracking-widest">+5.1% Collection Rate</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/2 shadow-2xl group hover:border-accent-gold/20 transition-all duration-500">
              <h3 className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-4">
                Active Agents
              </h3>
              <p className="text-3xl font-black text-white tracking-tighter text-glow mb-2">
                {uniqueAgents}
              </p>
              <p className="text-primary-light text-[10px] font-black uppercase tracking-widest">+2 Verified Terminals</p>
            </div>
          </div>

          {/* Tax Deduction Trend Chart - Always using bar chart */}
          <div className="mb-10">
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-6">
              Tax Deduction Trends
            </h2>
            <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/2 shadow-2xl">
              <MonthlyTaxChart variant="bar" />
            </div>
          </div>

          {/* Tax Declaration Status */}
          <div className="mb-10">
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-6">
              Recent Tax Declarations
            </h2>
            <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/80 uppercase tracking-widest">Period</th>
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/80 uppercase tracking-widest">Submitted</th>
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/80 uppercase tracking-widest">Declared Amount</th>
                      <th className="px-6 py-4 text-left text-[9px] font-black text-white/80 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-transparent">
                    {declarationData.slice(0, 3).map((declaration) => (
                      <tr key={declaration.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-white uppercase tracking-wide">
                          {declaration.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-white/80 uppercase">
                          {declaration.submittedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-primary-light tracking-tight">
                          {formatCurrency(declaration.declaredAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(declaration.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-8">
            <div>
              <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2 pl-1">
                Transaction History
              </h2>
              <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40">Monthly view of processed payments</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search records..."
                  className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                />
              </div>
              <button className="btn-primary px-8 py-3 text-[10px] tracking-widest uppercase font-black">
                Export Data
              </button>
            </div>
          </div>

          {/* Desktop view for transactions */}
          <div className="glass-card border-white/5 bg-white/2 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead>
                  <tr className="bg-white/2">
                    {["Invoice ID", "Date", "Amount", "Tax", "Agent", "Location"].map((header) => (
                      <th key={header} className="px-6 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactionData.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-primary uppercase tracking-tight">
                        {formatCurrency(transaction.tax)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-widest opacity-60">
                        {transaction.agent}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-40">
                        {transaction.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white/5 px-8 py-6 flex items-center justify-between border-t border-white/5">
              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                Showing <span className="text-white/80">8 of 12 Records</span>
              </p>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all">Previous</button>
                <div className="flex space-x-1">
                  {[1, 2, 3].map(n => (
                    <button key={n} className={`w-8 h-8 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center ${n === 2 ? 'bg-primary text-white' : 'bg-white/5 text-white/80'}`}>{n}</button>
                  ))}
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Declarations Tab */}
      {activeTab === "declarations" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-8">
            <div>
              <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2 pl-1">
                Tax Declaration Archive
              </h2>
              <p className="text-[10px] font-black text-white uppercase tracking-widest opacity-40">History of submitted tax filings</p>
            </div>
            
            <button className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black">
              New Declaration
            </button>
          </div>

          {/* Desktop view for declarations */}
          <div className="glass-card border-white/5 bg-white/2 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/5">
                <thead>
                  <tr className="bg-white/2">
                    {["ID", "Period", "Date Submitted", "Declared Amount", "Calculated Tax", "Status", "Actions"].map((header) => (
                      <th key={header} className="px-6 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {declarationData.map((declaration) => (
                    <tr key={declaration.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                        {declaration.id}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase tracking-widest opacity-60">
                        {declaration.period}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-40">
                        {declaration.submittedDate}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight">
                        {formatCurrency(declaration.declaredAmount)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight opacity-40">
                        {formatCurrency(declaration.calculatedAmount)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        {getStatusBadge(declaration.status)}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-xs">
                        <div className="flex items-center space-x-4">
                          {declaration.status === "Matched" && (
                            <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-all">
                              Settle Tax
                            </button>
                          )}
                          {declaration.status === "Discrepancy" && (
                            <button className="text-[10px] font-black text-accent-red hover:text-white uppercase tracking-widest transition-all">
                              Reconcile
                            </button>
                          )}
                          {declaration.status === "Paid" && (
                            <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest flex items-center transition-all">
                              View Details
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

          <div className="mt-12 glass-card border-white/5 bg-white/2 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#006D3508,transparent)] pointer-events-none"></div>
            <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-12">
              Submission Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-white/80 uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                  Submission Rules
                </h4>
                <ul className="text-[10px] font-black text-white/80 space-y-4 uppercase tracking-[0.2em]">
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Deadline: 7th of every month</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Scope: All processed transactions</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Tax Rate: 0.2% per transaction</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Discrepancy: Over 1.0% triggers review</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-white/80 uppercase tracking-widest flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                  Payment Pipeline
                </h4>
                <ul className="text-[10px] font-black text-white/80 space-y-4 uppercase tracking-[0.2em]">
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Invoice generated after review</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Payment Window: 14 days post-invoice</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Payment Channels: Quickteller / PayDirect</li>
                  <li className="flex items-center"><span className="w-1 h-1 bg-white/20 rounded-full mr-3"></span>Real-time receipt download available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDashboard;
