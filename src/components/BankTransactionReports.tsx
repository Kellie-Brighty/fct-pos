import { useState } from "react";
import { Select } from "antd";
import BoldModal from "./BoldModal";

interface TransactionReport {
  id: string;
  period: string;
  generatedDate: string;
  totalTransactions: number;
  totalAmount: number;
  status: "Generated" | "Pending" | "Processing";
  downloadUrl?: string;
}

const BankTransactionReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("last30");
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const showAlert = (title: string, message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  // Sample data for demonstration
  const reports: TransactionReport[] = [
    {
      id: "RPT001",
      period: "January 2023",
      generatedDate: "2023-02-01",
      totalTransactions: 1245,
      totalAmount: 4325000,
      status: "Generated",
      downloadUrl: "#",
    },
    {
      id: "RPT002",
      period: "February 2023",
      generatedDate: "2023-03-01",
      totalTransactions: 1342,
      totalAmount: 4728000,
      status: "Generated",
      downloadUrl: "#",
    },
    {
      id: "RPT003",
      period: "March 2023",
      generatedDate: "2023-04-01",
      totalTransactions: 1518,
      totalAmount: 5246000,
      status: "Generated",
      downloadUrl: "#",
    },
    {
      id: "RPT004",
      period: "April 2023",
      generatedDate: "2023-05-01",
      totalTransactions: 1603,
      totalAmount: 5582000,
      status: "Processing",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      showAlert(
        "Registry Initialized",
        "The requested analytical manifest is being synthesized. You will be notified once the secure download link is generated.",
        "success"
      );
    }, 1500);
  };


  return (
    <div className="p-4 md:p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 font-heading tracking-tighter text-glow">
          Institutional <span className="text-primary-light">Analytics Registry</span>
        </h1>
        <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.25em]">
          Computational Synthesis • Sequential Manifest Generation • Fiscal Analysis
        </p>
      </div>

      {/* Report Generation Form */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-8 md:p-12 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3508,transparent)] pointer-events-none"></div>
        <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10">
          Initialize Registry Generation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Target Period</label>
            <Select
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              value={selectedPeriod}
              onChange={(value) => setSelectedPeriod(value)}
              options={[
                { value: "last30", label: "Last 30 Days" },
                { value: "lastMonth", label: "Last Month" },
                { value: "custom", label: "Custom Range" },
                { value: "jan2023", label: "January 2023" },
                { value: "feb2023", label: "February 2023" },
                { value: "mar2023", label: "March 2023" },
                { value: "apr2023", label: "April 2023" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Registry Type</label>
            <Select
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              defaultValue="summary"
              options={[
                { value: "summary", label: "Summary Protocol" },
                { value: "detailed", label: "Detailed Analysis" },
                { value: "tax", label: "Taxation Ledger" },
                { value: "agent", label: "Agent Deployment" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Output Cipher</label>
            <Select
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              defaultValue="pdf"
              options={[
                { value: "pdf", label: "PDF Protocol" },
                { value: "excel", label: "XLS Manifest" },
                { value: "csv", label: "CSV Sequence" },
              ]}
            />
          </div>
        </div>

        {selectedPeriod === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-in slide-in-from-top-4 duration-500">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Temporal Start</label>
              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Temporal End</label>
              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className={`btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black transition-all flex items-center ${
              isGeneratingReport ? "opacity-70 cursor-not-allowed scale-95" : "hover:scale-105"
            }`}
          >
            {isGeneratingReport ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Protocol...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate Repository Manifest
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report History */}
      <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-6 flex items-center">
        <span className="w-8 h-px bg-white/10 mr-4"></span>
        Manifest Archive History
      </h2>

      {/* Desktop view */}
      <div className="hidden md:block glass-card border-white/5 bg-white/2 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/2">
                {["Report ID", "Period", "Generated", "Sequence Count", "Asset Sum", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                    {report.id}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {report.period}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-white uppercase opacity-60">
                    {report.generatedDate}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight">
                    {report.totalTransactions.toLocaleString()} TX
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tight">
                    {formatCurrency(report.totalAmount)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      report.status === 'Generated' ? 'bg-primary/10 text-primary-light border border-primary/20' :
                      'bg-blue/10 text-blue border border-blue/20'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs">
                    {report.status === "Generated" && report.downloadUrl && (
                      <button className="text-[10px] font-black text-white/80 hover:text-primary-light uppercase tracking-widest flex items-center transition-colors group/btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Archive Asset
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Tips */}
      <div className="mt-10 glass-card border-white/5 bg-white/1 p-8 rounded-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#006D3508,transparent)] pointer-events-none"></div>
        <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Generation Protocol Insights
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] font-black text-white/80 uppercase tracking-widest">
          <li className="flex items-start"><span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-1 mr-3 flex-shrink-0"></span>Registry synthesis latency: 5-10 Minutes (Density Dependent)</li>
          <li className="flex items-start"><span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-1 mr-3 flex-shrink-0"></span>High-volume temporal ranges suggest "Summary Protocol" usage</li>
          <li className="flex items-start"><span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-1 mr-3 flex-shrink-0"></span>Sequential Transaction IDs enforced for baseline reconciliation</li>
          <li className="flex items-start"><span className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-1 mr-3 flex-shrink-0"></span>Manifest persistence: 30-Day Archive (Automatic Purge)</li>
        </ul>
      </div>

      <BoldModal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default BankTransactionReports;
