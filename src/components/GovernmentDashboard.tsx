import { useState } from "react";
import MonthlyTaxChart from "./MonthlyTaxChart";

const GovernmentDashboard = () => {
  // This would normally be fetched from an API
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalTaxCollected: "₦126.6M",
    monthlyTarget: "₦150,000,000.00",
    complianceRate: "87%",
    activeBanks: 23,
    totalTransactions: "6.46M",
    avgTaxPerTransaction: "₦19.60",
    yearToDateGrowth: "+16.3%",
    pendingInvoices: 4,
    paidInvoices: 19,
    // New transaction volume data
    transactionVolume: "₦63.3B",
    volumeGrowth: "+12.7%",
    peakHour: "12:00 - 13:00",
    avgTransactionSize: "₦9,800.00",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-3">
            System Overview
          </p>
          <h2 className="text-4xl font-black text-white font-heading tracking-tighter text-glow">
            Regulatory Ops <span className="text-primary-light">Command</span>
          </h2>
        </div>
        <div className="mt-8 md:mt-0 glass-card bg-white/2 border-white/5 p-1.5 flex shadow-2xl rounded-2xl">
          {["daily", "weekly", "monthly"].map((p) => (
            <button
              key={p}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-500 ${
                period === p
                  ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-105"
                  : "text-white/80 hover:text-white/80"
              }`}
              onClick={() => setPeriod(p as any)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Collected */}
        <div className="glass-card p-8 border-white/5 bg-white/2 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden rounded-[2rem]">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
              Total Revenue
            </h3>
            <span className="text-[10px] font-black text-primary-light bg-primary/10 px-3 py-1 rounded-full tracking-widest border border-primary/20">
              {dashboardMetrics.yearToDateGrowth}
            </span>
          </div>
          <div className="text-3xl font-black text-white mb-8 tracking-tighter tabular-nums">
            {dashboardMetrics.totalTaxCollected}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-[9px] font-black tracking-widest uppercase">
              <span className="text-white/80">Target Progress</span>
              <span className="text-white/80">{dashboardMetrics.complianceRate}</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full shadow-[0_0_15px_rgba(0,109,53,0.5)] transition-all duration-1000"
                style={{ width: dashboardMetrics.complianceRate }}
              ></div>
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="glass-card p-8 border-white/5 bg-white/2 hover:border-accent-gold/20 transition-all duration-500 group relative overflow-hidden rounded-[2rem]">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent-gold/5 blur-3xl group-hover:bg-accent-gold/10 transition-all duration-700"></div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
              Transaction Volume
            </h3>
            <span className="text-[10px] font-black text-accent-gold bg-accent-gold/10 px-3 py-1 rounded-full tracking-widest border border-accent-gold/20">
              {dashboardMetrics.volumeGrowth}
            </span>
          </div>
          <div className="text-3xl font-black text-white mb-8 tracking-tighter tabular-nums">
            {dashboardMetrics.transactionVolume}
          </div>
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Avg Transaction</p>
              <p className="text-xs font-black text-white/80 tabular-nums">{dashboardMetrics.avgTransactionSize}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Peak Time</p>
              <p className="text-xs font-black text-white/80">{dashboardMetrics.peakHour}</p>
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="glass-card p-8 border-white/5 bg-white/2 rounded-[2rem] group hover:border-white/10 transition-all duration-500">
          <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest leading-none mb-1">
            Analytical Protocol
          </p>
          <h3 className="text-sm font-black text-white uppercase tracking-tighter">
            Fiscal Summary
          </h3>
          <div className="text-5xl font-black text-white mb-8 tracking-tighter tabular-nums text-glow-primary">
            {dashboardMetrics.complianceRate}
          </div>
          <div className="space-y-4">
            {[
              { label: "Active Banks", val: dashboardMetrics.activeBanks, color: "text-primary" },
              { label: "Paid", val: dashboardMetrics.paidInvoices, color: "text-primary-light" },
              { label: "Pending", val: dashboardMetrics.pendingInvoices, color: "text-accent-gold" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center text-[9px] font-black tracking-widest uppercase">
                <span className="text-white/80">{item.label}</span>
                <span className={`${item.color} tabular-nums`}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="glass-card p-8 border-white/5 bg-white/2 hover:border-white/10 rounded-[2rem] transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">
            Collection Activity
          </h3>
          <div className="text-3xl font-black text-white mb-2 tracking-tighter tabular-nums group-hover:scale-105 transition-transform duration-500 origin-left">
            {dashboardMetrics.totalTransactions}
          </div>
          <p className="text-[9px] font-black text-white/80 mb-10 tracking-widest uppercase opacity-40">Total Verified Transactions</p>
          <div className="pt-6 border-t border-white/5">
            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-2">Efficiency Index</p>
            <div className="flex items-baseline">
              <span className="text-xl font-black tabular-nums text-white/80">{dashboardMetrics.avgTaxPerTransaction}</span>
              <span className="text-[9px] font-black ml-2 text-white/80 tracking-widest">/ BANK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Trend Analysis */}
        <div className="lg:col-span-2 glass-card p-10 border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <h3 className="text-xl font-black text-white tracking-tighter mb-2">REVENUE TRENDS</h3>
              <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">Monthly Tax Collection Analysis</p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shadow-[0_0_10px_rgba(0,109,53,1)]"></div>
                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 mr-3 border border-accent-gold/60"></div>
                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Projected</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full bg-white/2 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group/chart">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,109,53,0.05),transparent)] pointer-events-none"></div>
            <MonthlyTaxChart />
          </div>
        </div>

        {/* Transmission Log (Recent Activity) */}
        <div className="glass-card flex flex-col h-full border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-white/5 bg-white/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-widest opacity-80">Recent Transfers</h3>
              <button className="text-[9px] font-black text-primary-light uppercase tracking-widest hover:text-white transition-all bg-primary/5 border border-primary/10 px-4 py-2 rounded-xl">
                View All
              </button>
            </div>
            <p className="text-[9px] text-white/80 font-black uppercase tracking-[0.2em]">Verified Bank Settlements</p>
          </div>
          
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
            {[
              { bank: "First Bank Nigeria", amt: "₦12,564,320.00", date: "MAY 15", status: "VERIFIED" },
              { bank: "GTBank", amt: "₦9,845,150.00", date: "MAY 14", status: "VERIFIED" },
              { bank: "Union Bank", amt: "₦7,125,680.00", date: "MAY 13", status: "VERIFIED" },
              { bank: "Access Bank", amt: "₦8,437,925.00", date: "MAY 12", status: "PENDING" },
              { bank: "Zenith Bank", amt: "₦15,230,000.00", date: "MAY 11", status: "VERIFIED" },
            ].map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-4 -mx-4 rounded-2xl transition-all border border-transparent hover:border-white/5">
                <div className="flex items-center space-x-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${tx.status === "VERIFIED" ? "bg-primary shadow-[0_0_10px_rgba(0,109,53,1)]" : "bg-accent-gold shadow-[0_0_10px_rgba(240,179,35,1)]"} transition-all group-hover:scale-125`}></div>
                  <div>
                    <p className="text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{tx.bank}</p>
                    <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mt-1 group-hover:text-white/80">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-white tabular-nums tracking-tighter group-hover:text-primary-light transition-colors">{tx.amt}</p>
                  <p className={`text-[8px] font-black tracking-widest uppercase mt-1 ${tx.status === "VERIFIED" ? "text-primary opacity-60" : "text-accent-gold opacity-60"}`}>
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-white/5 border-t border-white/5 text-center">
            <span className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em]">System Status: <span className="text-primary-light">All Banks Connected</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
