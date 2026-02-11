import { useState } from "react";
import { Select } from "antd";
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ConsultantReports = () => {
  const [reportType, setReportType] = useState<
    "summary" | "detailed" | "compliance"
  >("summary");
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "annual">(
    "quarterly"
  );

  // Sample data for the charts
  const summaryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tax Revenue (NGN)",
        data: [25400000, 28700000, 32100000, 29800000, 31500000, 34200000],
        backgroundColor: "rgba(0, 109, 53, 0.4)", // Primary Emerald
        borderColor: "rgba(0, 109, 53, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const complianceData = {
    labels: ["First Bank", "UBA", "GTBank", "Zenith", "Access", "Sterling"],
    datasets: [
      {
        label: "Compliance %",
        data: [96, 88, 92, 98, 85, 94],
        backgroundColor: "rgba(0, 109, 53, 0.4)",
        borderColor: "rgba(0, 109, 53, 1)",
        borderWidth: 2,
        borderRadius: 8,
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
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.4)", font: { family: "Inter", weight: "bold", size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255, 255, 255, 0.4)", font: { family: "Inter", weight: "bold", size: 10 } }
      }
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Sample data for the reports table
  const recentReports = [
    {
      id: "RPT001",
      name: "Q1 2023 Tax Summary",
      type: "Quarterly Summary",
      createdAt: "2023-04-15",
      banks: 12,
      totalAmount: 85750000,
    },
    {
      id: "RPT002",
      name: "First Bank Nigeria Compliance Report",
      type: "Bank Compliance",
      createdAt: "2023-04-12",
      banks: 1,
      totalAmount: 27500000,
    },
    {
      id: "RPT003",
      name: "Card Transactions Analysis Q1",
      type: "Transaction Type",
      createdAt: "2023-04-10",
      banks: 6,
      totalAmount: 42300000,
    },
    {
      id: "RPT004",
      name: "Monthly Revenue March 2023",
      type: "Monthly Summary",
      createdAt: "2023-04-05",
      banks: 12,
      totalAmount: 32100000,
    },
    {
      id: "RPT005",
      name: "Discrepancy Investigation Report",
      type: "Audit",
      createdAt: "2023-04-01",
      banks: 3,
      totalAmount: 8750000,
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1 uppercase">
            COMPLIANCE <span className="text-primary-light">REPORTS</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Performance Analysis & Client Reporting System
            </p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2 glass-card bg-white/2 border-white/5 p-1 rounded-2xl">
            <Select
              className="w-48 text-white"
              popupClassName="ant-select-dropdown"
              value={period}
              bordered={false}
              onChange={(value) => setPeriod(value)}
              options={[
                { value: "monthly", label: "Monthly Cycle" },
                { value: "quarterly", label: "Quarterly Cycle" },
                { value: "annual", label: "Annual Cycle" },
              ]}
            />
          </div>

          <button className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Total Revenue", val: "₦86.2M", gain: "+8.4% vs last month", color: "primary" },
          { label: "Reports Generated", val: "47", gain: "Up to date", color: "white/20" },
          { label: "Compliance Rate", val: "92.8%", gain: "Stable", color: "primary" },
          { label: "Active Connections", val: "100%", gain: "All Active", color: "primary" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-8 border-white/5 bg-white/2 hover:border-white/10 transition-all group rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/2 blur-2xl rounded-full group-hover:bg-white/5 transition-all"></div>
            <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-4">{m.label}</div>
            <div className="text-3xl font-black text-white tracking-tighter tabular-nums mb-6">{m.val}</div>
            <div className={`text-[9px] font-black flex items-center tracking-widest uppercase ${m.color === 'primary' ? 'text-primary' : 'text-white/80'}`}>
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {m.gain}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-10 overflow-hidden">
        <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-8">
          Report Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label htmlFor="reportType" className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-3 ml-1">
              Dataset Profile
            </label>
            <Select
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              value={reportType}
              onChange={(value) => setReportType(value)}
              options={[
                { value: "summary", label: "Market Summary" },
                { value: "detailed", label: "Detailed Breakdown" },
                { value: "compliance", label: "Compliance Audit" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="period" className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-3 ml-1">
              Temporal Scope
            </label>
            <Select
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              value={period}
              onChange={(value) => setPeriod(value)}
              options={[
                { value: "monthly", label: "Monthly Cycle" },
                { value: "quarterly", label: "Quarterly Cycle" },
                { value: "annual", label: "Annual Cycle" },
              ]}
            />
          </div>

          <div className="flex items-end">
            <button className="btn-primary w-full py-3 text-[10px] tracking-widest uppercase font-black h-[46px]">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { title: "Revenue Growth (Q1)", subtitle: "Monthly Collection Trends", data: summaryData },
          { title: "Bank Compliance", subtitle: "Compliance Rate Analysis", data: complianceData },
        ].map((chart, i) => (
          <div key={i} className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-10">
            <div className="mb-8">
              <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
                {chart.title}
              </h2>
              <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">{chart.subtitle}</p>
            </div>
            <div className="h-72 bg-white/2 rounded-3xl border border-white/5 p-6 relative overflow-hidden group/chart">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,109,53,0.05),transparent)] pointer-events-none transition-all duration-700 group-hover/chart:opacity-50"></div>
              <Bar 
                data={chart.data} 
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
                  }
                } as any} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="p-10 border-b border-white/5">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em]">
            Archived Reports
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/2">
                {["Report ID", "Report Name", "Banks", "Total Amount", "Status"].map((h) => (
                  <th key={h} className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-primary-light tracking-widest">
                    {report.id}
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest mb-1">{report.name}</div>
                    <div className="text-[9px] font-black text-white/80 uppercase tracking-widest">{report.type} • {formatDate(report.createdAt)}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                    {report.banks} <span className="text-[10px] opacity-40">Active</span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white tracking-tighter tabular-nums">
                    {formatCurrency(report.totalAmount)}
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex space-x-6">
                      <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-colors">Inspect</button>
                      <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-colors">Export</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/10"></div>
        <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10">
          Export Options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { label: "Excel XLSX", color: "primary", icon: "table_chart" },
            { label: "Digital PDF", color: "accent-red", icon: "picture_as_pdf" },
            { label: "Data CSV", color: "accent-blue", icon: "code" },
          ].map((option) => (
            <button key={option.label} className="flex items-center justify-between p-8 bg-white/2 border border-white/5 rounded-3xl hover:bg-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                  <div className={`w-2 h-2 rounded-full ${option.color === 'primary' ? 'bg-primary' : (option.color === 'accent-red' ? 'bg-accent-red' : 'bg-accent-blue')}`}></div>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{option.label}</span>
              </div>
              <svg className="w-4 h-4 text-white/10 group-hover:text-white/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantReports;
