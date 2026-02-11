import { useState } from "react";
import { Select } from "antd";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GovernmentRevenue = () => {
  const [dateRange, setDateRange] = useState<"lastMonth" | "last3Months" | "last6Months" | "lastYear">("lastMonth");
  const [bankFilter, setBankFilter] = useState<string>("all");
  
  // Mock data for chart
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Tax Revenue (Millions NGN)",
        data: [35.8, 42.2, 38.9, 41.5, 47.3, 51.8, 56.2, 58.9, 62.1, 65.7, 68.2, 72.5],
        borderColor: "#006D35", // Primary
        backgroundColor: "rgba(0, 109, 53, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Target (Millions NGN)",
        data: [40, 40, 40, 45, 45, 45, 50, 50, 50, 55, 55, 55],
        borderColor: "#F0B323", // Accent Gold
        backgroundColor: "rgba(240, 179, 35, 0.1)",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  // Distribution by bank data
  const bankDistributionData = {
    labels: ["First Bank", "GTBank", "UBA", "Access Bank", "Zenith Bank", "Others"],
    datasets: [
      {
        data: [25, 18, 15, 13, 10, 19],
        backgroundColor: [
          "#006D35", // Primary
          "#004B23", // Primary Dark
          "#00A651", // Primary Light
          "#F0B323", // Accent Gold
          "#0B1120", // Secondary
          "#1A2235", // Secondary Light
        ],
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 2,
      },
    ],
  };

  // Bank performance data
  const bankPerformanceData = [
    { bank: "First Bank Nigeria", amount: "₦31,564,320.00", compliance: "98%", status: "Compliant" },
    { bank: "GTBank", amount: "₦22,845,150.00", compliance: "95%", status: "Compliant" },
    { bank: "UBA", amount: "₦18,725,680.00", compliance: "92%", status: "Compliant" },
    { bank: "Access Bank", amount: "₦16,437,925.00", compliance: "89%", status: "Compliant" },
    { bank: "Zenith Bank", amount: "₦12,954,610.00", compliance: "87%", status: "Compliant" },
    { bank: "Sterling Bank", amount: "₦7,832,425.00", compliance: "81%", status: "Attention" },
    { bank: "Unity Bank", amount: "₦5,218,735.00", compliance: "73%", status: "Attention" },
    { bank: "Fidelity Bank", amount: "₦4,985,150.00", compliance: "68%", status: "Warning" },
  ];

  const handleDateRangeChange = (range: "lastMonth" | "last3Months" | "last6Months" | "lastYear") => {
    setDateRange(range);
    // In a real app, this would trigger an API call to get new data
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1">
            INFLOW <span className="text-primary-light">INTELLIGENCE</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Multi-Channel Revenue Calibration Protocol
            </p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2 glass-card bg-white/2 border-white/5 p-1 rounded-2xl">
            <Select
              className="w-48 text-white min-h-[48px]"
              popupClassName="ant-select-dropdown"
              value={bankFilter}
              bordered={false}
              onChange={(value) => setBankFilter(value)}
              options={[
                { value: "all", label: "All Channels" },
                { value: "firstBank", label: "First Bank" },
                { value: "gtbank", label: "GTBank" },
              ]}
            />

            <div className="w-px h-8 bg-white/10 mx-2"></div>

            <div className="flex p-1">
              {[
                { id: "lastMonth", label: "1M" },
                { id: "last3Months", label: "3M" },
                { id: "last6Months", label: "6M" },
                { id: "lastYear", label: "1Y" },
              ].map((r) => (
                <button
                  key={r.id}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${
                    dateRange === r.id
                      ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-105"
                      : "text-white/80 hover:text-white/80"
                  }`}
                  onClick={() => handleDateRangeChange(r.id as any)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "Total Revenue (YTD)", val: "₦614.8M", growth: "+12.3%", color: "primary" },
          { label: "Average Monthly", val: "₦51.2M", growth: "+8.7%", color: "primary" },
          { label: "Forecasted Year-End", val: "₦742.1M", growth: "+15.6%", color: "primary" },
          { label: "Overall Compliance", val: "87.4%", growth: "+2.8%", color: "accent-gold" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-8 border-white/5 bg-white/2 hover:border-white/10 transition-all group rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/2 blur-2xl rounded-full group-hover:bg-white/5 transition-all"></div>
            <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-4">{m.label}</div>
            <div className="text-3xl font-black text-white tracking-tighter tabular-nums mb-6">{m.val}</div>
            <div className={`text-[9px] font-black flex items-center tracking-widest uppercase ${m.color === 'primary' ? 'text-primary' : 'text-accent-gold'}`}>
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {m.growth} PROTOCOL GAIN
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <div className="glass-card p-10 border-white/5 bg-white/2 rounded-[2.5rem] group relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full -mr-64 -mt-64 transition-all duration-1000 group-hover:bg-primary/10"></div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 relative z-10 gap-6">
          <div>
            <h3 className="text-xl font-black text-white tracking-tighter mb-2">REVENUE STREAM ANALYSIS</h3>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">Temporal Inflow Calibration Protocol</p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 shadow-[0_0_10px_rgba(0,109,53,1)]"></div>
              <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Actual Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full border border-white/20 mr-3 border-dashed"></div>
              <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Benchmark</span>
            </div>
          </div>
        </div>
        <div className="h-96 bg-white/2 rounded-[2rem] border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group/chart cursor-crosshair">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,109,53,0.05),transparent)] pointer-events-none transition-all duration-700 group-hover/chart:opacity-50"></div>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
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
              },
              scales: {
                y: {
                  grid: { color: "rgba(255, 255, 255, 0.03)" },
                  ticks: { color: "rgba(255, 255, 255, 0.2)", font: { size: 9, weight: "bold" } },
                },
                x: {
                  grid: { display: false },
                  ticks: { color: "rgba(255, 255, 255, 0.2)", font: { size: 9, weight: "bold" } },
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distribution */}
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-8 text-glow">Channel Distribution</h3>
          <div className="h-64 flex items-center justify-center relative">
            <Doughnut
              data={bankDistributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "right", labels: { color: "rgba(255, 255, 255, 0.6)", font: { size: 11, weight: "bold" }, usePointStyle: true, padding: 20 } },
                },
                cutout: "75%",
              }}
            />
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Dominant</span>
              <span className="text-xl font-bold text-white">25%</span>
            </div>
          </div>
        </div>

        {/* Growth Analysis */}
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-8">Quarterly Velocity</h3>
          <div className="space-y-6">
            {[
              { label: "Q1 GROWTH", val: "14.2%", p: 14.2, color: "primary" },
              { label: "Q2 GROWTH", val: "16.8%", p: 16.8, color: "primary" },
              { label: "Q3 GROWTH", val: "11.5%", p: 11.5, color: "primary" },
              { label: "Q4 PROJECTED", val: "18.3%", p: 18.3, color: "accent-gold" },
            ].map((q) => (
              <div key={q.label}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{q.label}</span>
                  <span className="text-xs font-bold text-white tabular-nums">+{q.val}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                  <div 
                    className={`h-full rounded-full shadow-[0_0_8px_rgba(0,109,53,0.5)] transition-all duration-1000 ${q.color === 'primary' ? 'bg-primary' : 'bg-accent-gold'}`} 
                    style={{ width: `${q.p}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Performance Table */}
      <div className="glass-card overflow-hidden border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem]">
        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-white tracking-tighter mb-2 uppercase">CHANNEL PERFORMANCE RELAY</h3>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em]">Institutional Compliance Architecture Audit</p>
          </div>
          <button className="btn-primary px-8 py-3 text-[10px] font-black tracking-widest uppercase">
            Extract Audit
          </button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/2">
                {["Channel Node", "Total Transmission", "Integrity Rate", "Current Status"].map((h) => (
                  <th key={h} className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bankPerformanceData.map((bank, index) => (
                <tr key={index} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{bank.bank}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap tabular-nums">
                    <div className="text-xs font-black text-white opacity-80 uppercase tracking-tighter group-hover:text-primary-light transition-colors">{bank.amount}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap tabular-nums">
                    <div className="text-xs font-black text-white/80 uppercase tracking-widest">{bank.compliance}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span className={`px-4 py-1 text-[8px] font-black tracking-widest uppercase rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.1)] 
                      ${bank.status === 'Compliant' ? 'bg-primary/10 text-primary border-primary/20' : 
                        bank.status === 'Attention' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/20' : 
                        'bg-accent-red/10 text-accent-red border-accent-red/20'}`}
                    >
                      {bank.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernmentRevenue; 