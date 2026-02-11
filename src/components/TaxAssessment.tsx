import { useState } from "react";
import { Select } from "antd";
import BoldModal from "./BoldModal";

const TaxAssessment = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  const showAlert = (title: string, message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  // Sample data
  const banks = [
    { id: "fb", name: "First Bank Nigeria" },
    { id: "zenith", name: "Zenith Bank" },
    { id: "gtb", name: "GTBank" },
    { id: "uba", name: "UBA" },
  ];

  const periods = [
    { id: "q1-2023", name: "Q1 2023 (Jan-Mar)" },
    { id: "q4-2022", name: "Q4 2022 (Oct-Dec)" },
    { id: "q3-2022", name: "Q3 2022 (Jul-Sep)" },
    { id: "q2-2022", name: "Q2 2022 (Apr-Jun)" },
  ];

  // Sample assessment results
  const assessmentResults = {
    summary: {
      totalTransactions: 15720,
      totalAmount: 4250000,
      declaredTaxAmount: 127500,
      calculatedTaxAmount: 132250,
      discrepancy: 4750,
      discrepancyPercentage: 3.72,
    },
    categories: [
      {
        name: "Card Transactions",
        count: 8750,
        amount: 2850000,
        declaredTax: 85500,
        calculatedTax: 88350,
        discrepancy: 2850,
        discrepancyPercentage: 3.33,
      },
      {
        name: "Wire Transfers",
        count: 4230,
        amount: 980000,
        declaredTax: 29400,
        calculatedTax: 30380,
        discrepancy: 980,
        discrepancyPercentage: 3.33,
      },
      {
        name: "Mobile Payments",
        count: 2300,
        amount: 420000,
        declaredTax: 12600,
        calculatedTax: 13520,
        discrepancy: 920,
        discrepancyPercentage: 7.3,
      },
    ],
  };

  const handleStartAssessment = () => {
    if (!selectedBank || !selectedPeriod) {
      showAlert("Incomplete Parameters", "Please select both an institution and an assessment period before initializing the process.", "warning");
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1 uppercase">
            TAX <span className="text-primary-light">EVALUATION</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Financial Integrity & Declaration Validation
            </p>
          </div>
        </div>
      </div>

      {/* Assessment Form */}
      <div className="glass-card p-10 border-white/5 bg-white/2 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/10"></div>
        <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-10">
          Assessment Initialization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="space-y-4">
            <label htmlFor="bank" className="text-[10px] font-black text-white/80 uppercase tracking-widest block pl-1">
              Selecting Institution
            </label>
            <Select
              id="bank"
              placeholder="-- Select Institution --"
              value={selectedBank || undefined}
              onChange={(value) => setSelectedBank(value)}
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              options={banks.map((bank) => ({ value: bank.id, label: bank.name }))}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="period" className="text-[10px] font-black text-white/80 uppercase tracking-widest block pl-1">
              Assessment Period
            </label>
            <Select
              id="period"
              placeholder="-- Select Period --"
              value={selectedPeriod || undefined}
              onChange={(value) => setSelectedPeriod(value)}
              className="w-full text-white"
              popupClassName="ant-select-dropdown"
              options={periods.map((period) => ({ value: period.id, label: period.name }))}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10 relative z-10">
          <button
            onClick={handleStartAssessment}
            disabled={isAnalyzing}
            className={`btn-primary px-12 py-4 text-[10px] font-black uppercase tracking-[0.2em] relative overflow-hidden group/btn ${
              isAnalyzing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Execute Evaluation
              </div>
            ) : (
              "Execute Evaluation"
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {!isAnalyzing && selectedBank && selectedPeriod && (
        <div className="space-y-8 md:space-y-12 animate-in slide-in-from-bottom duration-1000">
          {/* Summary Cards */}
          <div>
            <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">
              Analysis Results Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { label: "Total Volume", val: assessmentResults.summary.totalTransactions.toLocaleString(), sub: "Transactions" },
                { label: "Gross Amount", val: formatCurrency(assessmentResults.summary.totalAmount), sub: "Institutional Total" },
                { label: "Declared Tax", val: formatCurrency(assessmentResults.summary.declaredTaxAmount), sub: "Bank Reporting" },
                { label: "Calculated Tax", val: formatCurrency(assessmentResults.summary.calculatedTaxAmount), sub: "System Verification", highlight: true },
                { label: "Discrepancy", val: formatCurrency(assessmentResults.summary.discrepancy), sub: "Delta Detection", alert: assessmentResults.summary.discrepancy > 0 },
                { label: "Error Rate", val: `${assessmentResults.summary.discrepancyPercentage.toFixed(2)}%`, sub: "Percentage Variance", alert: assessmentResults.summary.discrepancyPercentage > 5 },
              ].map((card, i) => (
                <div key={i} className="glass-card p-10 border-white/5 bg-white/2 rounded-[2.5rem] relative overflow-hidden group">
                  <div className={`absolute -right-8 -top-8 w-24 h-24 blur-3xl transition-all ${card.alert ? 'bg-accent-red/10' : 'bg-primary/5'}`}></div>
                  <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-4">{card.label}</div>
                  <div className={`text-3xl font-black tracking-tighter tabular-nums mb-2 ${card.highlight ? 'text-primary-light' : (card.alert ? 'text-accent-red' : 'text-white')}`}>
                    {card.val}
                  </div>
                  <div className="text-[9px] font-black text-white/10 uppercase tracking-widest">{card.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] overflow-hidden">
            <div className="p-10 border-b border-white/5">
              <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
                Category Logic Variance
              </h2>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-white/5">
                <thead>
                  <tr className="bg-white/2">
                    {["Category", "Trans.", "Amount", "Declared", "Calculated", "Delta", "Error %"].map((h) => (
                      <th key={h} className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assessmentResults.categories.map((category, index) => (
                    <tr key={index} className={`hover:bg-white/5 transition-all group ${category.discrepancyPercentage > 5 ? "bg-accent-red/5" : ""}`}>
                      <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">
                        {category.name}
                      </td>
                      <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 tabular-nums uppercase tracking-widest">
                        {category.count.toLocaleString()}
                      </td>
                      <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 tabular-nums">
                        {formatCurrency(category.amount)}
                      </td>
                      <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 tabular-nums">
                        {formatCurrency(category.declaredTax)}
                      </td>
                      <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-primary-light tabular-nums">
                        {formatCurrency(category.calculatedTax)}
                      </td>
                      <td className={`px-10 py-6 whitespace-nowrap text-xs font-black tabular-nums ${category.discrepancy > 0 ? "text-accent-red" : "text-white/80"}`}>
                        {formatCurrency(category.discrepancy)}
                      </td>
                      <td className={`px-10 py-6 whitespace-nowrap`}>
                        <span className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${category.discrepancyPercentage > 5 ? "bg-accent-red/10 text-accent-red border-accent-red/20 shadow-[0_0_15px_rgba(255,90,90,0.1)]" : "bg-white/5 text-white/80 border-white/5"}`}>
                          {category.discrepancyPercentage.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-6 pt-10 border-t border-white/5">
            <button className="px-10 py-4 glass-card border border-white/10 text-[10px] font-black text-white hover:bg-white/5 uppercase tracking-widest transition-all rounded-2xl">
              Export Analysis
            </button>

            <button className="btn-primary px-10 py-4 text-[10px] font-black text-white uppercase tracking-widest rounded-2xl">
              Request Bank Correction
            </button>
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-white/2 border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Assessment Protocols
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {[
            "Prioritize discrepancies exceeding 5% threshold",
            "Cross-verify with real-time tax code updates",
            "Direct escalation for variance above ₦5,000",
            "Target completion: 5 working days from submission"
          ].map((tip, i) => (
            <li key={i} className="text-[10px] font-black text-white/80 uppercase tracking-[0.1em] flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-4"></span>
              {tip}
            </li>
          ))}
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

export default TaxAssessment;
