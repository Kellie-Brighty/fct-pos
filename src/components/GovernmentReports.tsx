import { useState } from "react";
import { Select } from "antd";
import BoldModal from "./BoldModal";

const GovernmentReports = () => {
  const [activeTab, setActiveTab] = useState<
    "transactions" | "declarations" | "payments" | "summaries"
  >("transactions");
  const [dateRange, setDateRange] = useState<
    "last7Days" | "last30Days" | "last90Days" | "custom"
  >("last30Days");
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">(
    "excel"
  );

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const showAlert = (title: string, message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  // Mock data for transaction reports
  const transactionReports = [
    {
      id: "TR-2023-1052",
      bank: "First Bank Nigeria",
      date: "2023-05-15",
      totalTxn: "157,284",
      taxAmount: "₦2,564,320.00",
    },
    {
      id: "TR-2023-1051",
      bank: "GTBank",
      date: "2023-05-14",
      totalTxn: "143,892",
      taxAmount: "₦1,945,150.00",
    },
    {
      id: "TR-2023-1050",
      bank: "UBA",
      date: "2023-05-13",
      totalTxn: "125,421",
      taxAmount: "₦1,725,680.00",
    },
    {
      id: "TR-2023-1049",
      bank: "Access Bank",
      date: "2023-05-12",
      totalTxn: "137,510",
      taxAmount: "₦1,837,925.00",
    },
    {
      id: "TR-2023-1048",
      bank: "Zenith Bank",
      date: "2023-05-11",
      totalTxn: "118,975",
      taxAmount: "₦1,654,610.00",
    },
    {
      id: "TR-2023-1047",
      bank: "Sterling Bank",
      date: "2023-05-10",
      totalTxn: "72,419",
      taxAmount: "₦832,425.00",
    },
    {
      id: "TR-2023-1046",
      bank: "First Bank Nigeria",
      date: "2023-04-15",
      totalTxn: "162,108",
      taxAmount: "₦2,621,470.00",
    },
    {
      id: "TR-2023-1045",
      bank: "GTBank",
      date: "2023-04-14",
      totalTxn: "149,735",
      taxAmount: "₦2,018,370.00",
    },
  ];

  // Mock data for declaration reports
  const declarationReports = [
    {
      id: "DCL-2023-0587",
      bank: "First Bank Nigeria",
      period: "Apr 2023",
      submissionDate: "2023-05-05",
      status: "Reconciled",
      amount: "₦10,564,320.00",
    },
    {
      id: "DCL-2023-0586",
      bank: "GTBank",
      period: "Apr 2023",
      submissionDate: "2023-05-04",
      status: "Reconciled",
      amount: "₦8,945,150.00",
    },
    {
      id: "DCL-2023-0585",
      bank: "UBA",
      period: "Apr 2023",
      submissionDate: "2023-05-03",
      status: "Reconciled",
      amount: "₦7,725,680.00",
    },
    {
      id: "DCL-2023-0584",
      bank: "Access Bank",
      period: "Apr 2023",
      submissionDate: "2023-05-02",
      status: "Discrepancy",
      amount: "₦8,437,925.00",
    },
    {
      id: "DCL-2023-0583",
      bank: "Zenith Bank",
      period: "Apr 2023",
      submissionDate: "2023-05-01",
      status: "Reconciled",
      amount: "₦6,954,610.00",
    },
    {
      id: "DCL-2023-0582",
      bank: "Sterling Bank",
      period: "Apr 2023",
      submissionDate: "2023-04-30",
      status: "Pending",
      amount: "₦3,832,425.00",
    },
  ];

  // Mock data for payment reports
  const paymentReports = [
    {
      id: "PAY-2023-0412",
      bank: "First Bank Nigeria",
      period: "Apr 2023",
      paymentDate: "2023-05-15",
      amount: "₦10,564,320.00",
      method: "Bank Transfer",
    },
    {
      id: "PAY-2023-0411",
      bank: "GTBank",
      period: "Apr 2023",
      paymentDate: "2023-05-14",
      amount: "₦8,945,150.00",
      method: "Quickteller",
    },
    {
      id: "PAY-2023-0410",
      bank: "UBA",
      period: "Apr 2023",
      paymentDate: "2023-05-13",
      amount: "₦7,725,680.00",
      method: "PayDirect",
    },
    {
      id: "PAY-2023-0409",
      bank: "Zenith Bank",
      period: "Apr 2023",
      paymentDate: "2023-05-11",
      amount: "₦6,954,610.00",
      method: "Bank Transfer",
    },
    {
      id: "PAY-2023-0408",
      bank: "Sterling Bank",
      period: "Apr 2023",
      paymentDate: "2023-05-10",
      amount: "₦3,832,425.00",
      method: "Quickteller",
    },
  ];

  // Mock data for summary reports
  const summaryReports = [
    {
      id: "SUM-2023-04",
      title: "Monthly Tax Collection Summary",
      period: "Apr 2023",
      generatedDate: "2023-05-05",
      fileSize: "1.2 MB",
    },
    {
      id: "SUM-2023-Q1",
      title: "Quarterly Tax Collection Report",
      period: "Q1 2023",
      generatedDate: "2023-04-15",
      fileSize: "3.4 MB",
    },
    {
      id: "SUM-2023-03",
      title: "Monthly Tax Collection Summary",
      period: "Mar 2023",
      generatedDate: "2023-04-05",
      fileSize: "1.1 MB",
    },
    {
      id: "SUM-2023-02",
      title: "Monthly Tax Collection Summary",
      period: "Feb 2023",
      generatedDate: "2023-03-05",
      fileSize: "1.0 MB",
    },
    {
      id: "SUM-2023-01",
      title: "Monthly Tax Collection Summary",
      period: "Jan 2023",
      generatedDate: "2023-02-05",
      fileSize: "0.9 MB",
    },
    {
      id: "SUM-2022-Q4",
      title: "Quarterly Tax Collection Report",
      period: "Q4 2022",
      generatedDate: "2023-01-15",
      fileSize: "3.2 MB",
    },
    {
      id: "SUM-2022-YE",
      title: "Annual Tax Collection Report",
      period: "2022",
      generatedDate: "2023-01-31",
      fileSize: "5.8 MB",
    },
  ];

  const handleExportReport = () => {
    // In a real application, this would trigger an API call to generate and download the report
    showAlert(
      "Extraction Initialized",
      `The ${activeTab.toUpperCase()} repository is being compiled in ${exportFormat.toUpperCase()} format. You will be notified upon completion.`,
      "success"
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 group gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1">
            INTELLIGENCE <span className="text-primary-light">ARCHIVE</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Historical Fiscal Manifest Repository
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 glass-card bg-white/2 border-white/5 p-1 rounded-2xl">
            <Select
              className="w-48 text-white min-h-[48px]"
              popupClassName="ant-select-dropdown"
              value={dateRange}
              bordered={false}
              onChange={(value) => setDateRange(value)}
              options={[
                { value: "last7Days", label: "Last 7 Cycles" },
                { value: "last30Days", label: "Last 30 Cycles" },
                { value: "last90Days", label: "Last 90 Cycles" },
                { value: "custom", label: "Custom Range" },
              ]}
            />

            <div className="w-px h-8 bg-white/10 mx-2"></div>

            <Select
              className="w-40 text-white min-h-[48px]"
              popupClassName="ant-select-dropdown"
              value={exportFormat}
              bordered={false}
              onChange={(value) => setExportFormat(value)}
              options={[
                { value: "excel", label: "Binary .XLSX" },
                { value: "pdf", label: "Document .PDF" },
                { value: "csv", label: "Data .CSV" },
              ]}
            />
          </div>

          <button
            onClick={handleExportReport}
            className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black rounded-2xl h-[52px] flex items-center justify-center"
          >
            Extract Archive
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card border-white/5 bg-white/2 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/5 bg-white/2">
          {[
            { id: "transactions", label: "Transaction Logs" },
            { id: "declarations", label: "Manifest Archive" },
            { id: "payments", label: "Settlement Relay" },
            { id: "summaries", label: "Fiscal Overviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-6 px-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5 shadow-[inset_0_-2px_0_0_rgba(0,109,53,1)]"
                  : "text-white/80 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8 md:p-12">
          {/* Transaction Reports */}
          {activeTab === "transactions" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
                    Transaction Audit logs
                  </h3>
                  <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                    Detailed POS Sequence Manifests
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                    <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Live Flow</span>
                  </div>
                </div>
              </div>

              <div className="glass-card border-white/5 bg-white/2 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="min-w-full divide-y divide-white/5">
                    <thead>
                      <tr className="bg-white/2">
                        {["Manifest ID", "Node Source", "Temporal", "Sequence Sum", "Revenue Asset", "Command"].map((h) => (
                          <th key={h} className="px-8 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactionReports.map((report) => (
                        <tr key={report.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                            {report.id}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest leading-none">
                            {report.bank}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.date}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tighter tabular-nums">
                            {report.totalTxn}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tighter opacity-80 tabular-nums">
                            {report.taxAmount}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all">
                              Inspect logs
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Declaration Reports */}
          {activeTab === "declarations" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-10">
                <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
                  Fiscal Manifest Archive
                </h3>
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  Validated Institutional Declarations
                </p>
              </div>

              <div className="glass-card border-white/5 bg-white/2 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="min-w-full divide-y divide-white/5">
                    <thead>
                      <tr className="bg-white/2">
                        {["Archive ID", "Node", "Cycle", "Submittal", "Status", "Volume Sum", "Command"].map((h) => (
                          <th key={h} className="px-8 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {declarationReports.map((report) => (
                        <tr key={report.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                            {report.id}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.bank}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.period}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.submissionDate}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 text-[8px] font-black tracking-widest uppercase rounded-full border shadow-[0_0_10px_rgba(0,0,0,0.2)] 
                              ${
                                report.status === "Reconciled"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : report.status === "Discrepancy"
                                  ? "bg-accent-red/10 text-accent-red border-accent-red/20"
                                  : "bg-accent-gold/10 text-accent-gold border-accent-gold/20"
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tighter tabular-nums">
                            {report.amount}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all">
                              Decrypt Manifest
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payment Reports */}
          {activeTab === "payments" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-10">
                <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
                  Settlement Relay Logs
                </h3>
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  Verified Inflow Transmission History
                </p>
              </div>

              <div className="glass-card border-white/5 bg-white/2 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="min-w-full divide-y divide-white/5">
                    <thead>
                      <tr className="bg-white/2">
                        {["Relay ID", "Node Source", "Cycle", "Settlement", "Revenue", "Protocol", "Command"].map((h) => (
                          <th key={h} className="px-8 py-5 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {paymentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-white/5 transition-all">
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-primary-light uppercase tracking-widest">
                            {report.id}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.bank}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.period}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest">
                            {report.paymentDate}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white uppercase tracking-tighter tabular-nums">
                            {report.amount}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest opacity-60">
                            {report.method}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all">
                                Inspect
                              </button>
                              <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-all">
                                Manifest
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Summary Reports */}
          {activeTab === "summaries" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-10">
                <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-2">
                  Fiscal Overviews
                </h3>
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  Consolidated Intelligence Summaries
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {summaryReports.map((report) => (
                  <div key={report.id} className="glass-card p-8 border-white/5 bg-white/2 hover:border-white/10 transition-all group flex flex-col justify-between rounded-[2rem] relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/2 blur-[80px] rounded-full group-hover:bg-white/5 transition-all"></div>
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[9px] font-black text-primary-light bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                          {report.id}
                        </span>
                        <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{report.fileSize}</span>
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 group-hover:text-primary-light transition-colors">{report.title}</h4>
                      <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">{report.period} Cycle</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-[9px] font-black text-white/80 uppercase tracking-widest italic">{report.generatedDate}</span>
                      <div className="flex space-x-4">
                        <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all">Analyze</button>
                        <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-all">Download</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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

export default GovernmentReports;
