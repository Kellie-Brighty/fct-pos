import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import POSLiveFeed from "./POSLiveFeed";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConsultantDashboard = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "quarterly">(
    "monthly"
  );

  // Sample data for demonstration
  const pendingDeclarations = [
    {
      id: "DCL001",
      bank: "First Bank Nigeria",
      period: "Q1 2023",
      amount: 1250000,
      status: "Pending Review",
    },
    {
      id: "DCL002",
      bank: "UBA",
      period: "Q1 2023",
      amount: 980000,
      status: "Pending Review",
    },
    {
      id: "DCL003",
      bank: "Zenith Bank",
      period: "Q1 2023",
      amount: 1430000,
      status: "Under Assessment",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Approved Declaration",
      bank: "Access Bank",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Requested Additional Info",
      bank: "Wema Bank",
      time: "Yesterday",
    },
    {
      id: 3,
      action: "Updated Client Profile",
      bank: "GTBank",
      time: "Yesterday",
    },
    {
      id: 4,
      action: "Completed Assessment",
      bank: "First Bank Nigeria",
      time: "3 days ago",
    },
    {
      id: 5,
      action: "Generated Report",
      bank: "Standard Chartered",
      time: "1 week ago",
    },
  ];

  // Chart data
  const complianceData = {
    labels: ["First Bank", "UBA", "GTBank", "Zenith", "Access", "Sterling"],
    datasets: [
      {
        label: "Compliance Rate (%)",
        data: [96, 88, 92, 98, 85, 94],
        backgroundColor: "rgba(0, 109, 53, 0.4)", // Primary Emerald
        borderColor: "rgba(0, 109, 53, 1)",
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: "rgba(0, 109, 53, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.4)",
          font: {
            family: "Inter",
            weight: "bold",
            size: 10,
          },
          callback: function (value: any) {
            return value + "%";
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.4)",
          font: {
            family: "Inter",
            weight: "bold",
            size: 10,
          },
        },
      },
    },
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[10px] font-black text-primary-high uppercase tracking-[0.4em] mb-3">
            Portfolio Command
          </p>
          <h2 className="text-4xl font-black text-white font-heading tracking-tighter text-glow">
            Advisory Hub <span className="text-primary-light">Engine</span>
          </h2>
        </div>
        
        <div className="mt-8 md:mt-0 glass-card bg-white/2 border-white/5 p-1.5 flex shadow-2xl rounded-2xl">
          {["weekly", "monthly", "quarterly"].map((p) => (
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Assigned Banks", val: "12", gain: "+2 New", color: "primary" },
          { label: "Pending Reviews", val: "08", gain: "3 Urgent", color: "accent-red" },
          { label: "Total Transaction Volume", val: "₦2.4 Billion", gain: "+15.2% vs last month", color: "primary" },
          { label: "Total Revenue", val: "₦158.3M", gain: "+12.4% vs last month", color: "primary" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-8 border-white/5 bg-white/2 hover:border-white/10 transition-all group rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/2 blur-2xl rounded-full group-hover:bg-white/5 transition-all"></div>
            <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-4">{m.label}</div>
            <div className="text-3xl font-black text-white tracking-tighter tabular-nums mb-6">{m.val}</div>
            <div className={`text-[9px] font-black flex items-center tracking-widest uppercase ${m.color === 'primary' ? 'text-primary' : 'text-accent-red'}`}>
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {m.gain}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Live POS Feed */}
        <div className="lg:col-span-1 xl:col-span-1 h-full">
          <POSLiveFeed />
        </div>

        <div className="lg:col-span-2 xl:col-span-3 space-y-8">
          {/* Priority Reviews */}
        <div className="lg:col-span-2 glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="p-10 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em]">
              Urgent Reviews
            </h2>
            <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-colors border border-primary/10 px-4 py-2 rounded-xl bg-primary/5">
              Review All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead>
                <tr className="bg-white/2">
                  {["Declaration ID", "Bank Name", "Total Amount", "Status", "Action"].map((h) => (
                    <th key={h} className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingDeclarations.map((declaration) => (
                  <tr key={declaration.id} className="hover:bg-white/5 transition-all group">
                    <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-primary-light tracking-widest">
                      {declaration.id}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest mb-1">{declaration.bank}</div>
                      <div className="text-[9px] font-black text-white/80 uppercase tracking-widest">{declaration.period}</div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white tracking-tighter tabular-nums">
                      {formatCurrency(declaration.amount)}
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <span
                        className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                          declaration.status === "Pending Review"
                            ? "bg-accent-blue/10 text-accent-blue border-accent-blue/20"
                            : "bg-accent-gold/10 text-accent-gold border-accent-gold/20"
                        }`}
                      >
                        {declaration.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Protocol Log */}
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden">
          <div className="p-10 border-b border-white/5">
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em]">
              Activity History
            </h2>
          </div>
          <div className="p-10 space-y-8 flex-1">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-6 group-hover:bg-primary/20 transition-all shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest mb-1">{activity.action}</div>
                  <div className="text-[9px] font-black text-white/80 uppercase tracking-widest">{activity.bank}</div>
                </div>
                <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] whitespace-nowrap ml-4 pt-1">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Client Compliance Matrix */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
              Client Compliance Matrix
            </h2>
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Institutional Integrity Calibration</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shadow-[0_0_10px_rgba(0,109,53,1)]"></div>
              <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Active Rate</span>
            </div>
          </div>
        </div>
        <div className="h-80 bg-white/2 rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group/chart cursor-crosshair">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,109,53,0.05),transparent)] pointer-events-none transition-all duration-700 group-hover/chart:opacity-50"></div>
          <Bar 
            data={complianceData} 
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  grid: { color: "rgba(255, 255, 255, 0.03)" },
                  ticks: { ...chartOptions.scales.y.ticks, color: "rgba(255, 255, 255, 0.2)", font: { size: 9, weight: "900" } }
                },
                x: {
                  ...chartOptions.scales.x,
                  ticks: { ...chartOptions.scales.x.ticks, color: "rgba(255, 255, 255, 0.2)", font: { size: 9, weight: "900" } }
                }
              },
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  backgroundColor: "rgba(11, 17, 32, 0.95)",
                  titleFont: { family: "Inter", weight: "bold", size: 12 },
                  bodyFont: { family: "Inter", weight: "bold", size: 11 },
                  titleColor: "#00FF7F",
                  padding: 16,
                  cornerRadius: 16,
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  displayColors: false,
                },
              }
            } as any} 
          />
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/10"></div>
        <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10">
          Pending Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {[
            { label: "Review First Bank filing", time: "Deadline in 48h", status: "Critical", color: "accent-red", icon: "priority_high" },
            { label: "Audit Zenith Bank records", time: "Scheduled for today", status: "Routine", color: "primary", icon: "visibility" },
            { label: "Check monthly performance", time: "End of month", status: "Low", color: "white/20", icon: "bar_chart" },
            { label: "Verify bank settlement", time: "Deadline in 12h", status: "High", color: "accent-gold", icon: "settings_input_component" },
          ].map((task, i) => (
            <div key={i} className="flex items-center p-8 bg-white/2 rounded-[2rem] border border-white/5 group hover:bg-white/5 transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-8 group-hover:scale-110 transition-transform ${task.status === 'Critical' ? 'shadow-[0_0_20px_rgba(255,90,90,0.1)]' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${task.status === 'Critical' ? 'bg-accent-red animate-pulse' : (task.status === 'Routine' ? 'bg-primary' : (task.status === 'High' ? 'bg-accent-gold' : 'bg-white/20'))}`}></div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1 group-hover:text-primary-light transition-colors">
                  {task.label}
                </p>
                <p className="text-[9px] font-black text-white/80 uppercase tracking-[0.2em]">{task.time}</p>
              </div>
              <span className={`text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-widest border border-white/5 ${task.status === 'Critical' ? 'text-accent-red bg-accent-red/5 border-accent-red/10' : 'text-white/80'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
