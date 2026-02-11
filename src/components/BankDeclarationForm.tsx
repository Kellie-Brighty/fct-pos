import { useState, useEffect } from "react";
import { ConfigProvider, theme, DatePicker, InputNumber, Input } from "antd";
import InvoiceGenerator from "./InvoiceGenerator";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

interface BankDeclarationFormProps {
  onSubmit: (data: BankDeclarationData) => void;
  systemCalculatedTax: number;
}

export interface BankDeclarationData {
  bankName: string;
  period: string;
  totalTaxAmount: number;
  referenceId: string;
  invoiceProcessed?: boolean;
}

const BankDeclarationForm = ({
  onSubmit,
  systemCalculatedTax,
}: BankDeclarationFormProps) => {
  const [formData, setFormData] = useState<BankDeclarationData>({
    bankName: "",
    period: "",
    totalTaxAmount: 0,
    referenceId: `TAX-${Date.now().toString().substring(0, 10)}`,
  });

  // Get bank name from session storage on component mount
  useEffect(() => {
    const bankName = sessionStorage.getItem("userName") || "";
    setFormData((prevData) => ({
      ...prevData,
      bankName,
    }));
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showInvoice, setShowInvoice] = useState(false);
  const [showDiscrepancyAlert, setShowDiscrepancyAlert] = useState(false);

  // Clear discrepancy alert when the user changes the amount
  useEffect(() => {
    setShowDiscrepancyAlert(false);
  }, [formData.totalTaxAmount]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.period.trim()) {
      newErrors.period = "Period is required";
    }

    if (formData.totalTaxAmount <= 0) {
      newErrors.totalTaxAmount = "Total tax amount must be greater than zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate discrepancy percentage
  const discrepancy =
    formData.totalTaxAmount > 0
      ? (
          ((formData.totalTaxAmount - systemCalculatedTax) /
            systemCalculatedTax) *
          100
        ).toFixed(2)
      : "0.00";

  const hasDiscrepancy = parseFloat(discrepancy) !== 0;

  const discrepancyClass =
    parseFloat(discrepancy) === 0
      ? "text-green-600"
      : parseFloat(discrepancy) < 0
      ? "text-accent-red"
      : "text-orange-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Always show the invoice/loading modal
      setShowInvoice(true);

      // Call the onSubmit callback to notify parent component
      onSubmit(formData);
    }
  };

  return (
    <>
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-black text-white mb-2 font-heading tracking-tighter text-glow">
          Tax Declaration <span className="text-primary-light">Protocol</span>
        </h2>
        <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.25em] mb-10">
          Monthly Asset Remittance • Computational Alignment • Institutional Submission
        </p>

        {showDiscrepancyAlert && (
          <div className="mb-10 bg-accent-red/5 border border-accent-red/20 text-accent-red p-8 rounded-3xl relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FF5A5A11,transparent)] pointer-events-none"></div>
            <div className="flex items-start relative z-10">
              <div className="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-black uppercase tracking-widest mb-3">
                  Reconciliation Discrepancy Detected
                </h3>
                <div className="text-xs font-medium text-white/80 leading-relaxed space-y-3">
                  <p>
                    Declared remittance does not align with core system estimations. 
                    Calculated variance: <span className="text-accent-red font-black">{discrepancy}%</span>.
                  </p>
                  <p>
                    Please verify the declared value against transaction logs. 
                    Computational alignment is required for protocol submission.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          totalTaxAmount: systemCalculatedTax,
                        }));
                        setShowDiscrepancyAlert(false);
                      }}
                      className="px-6 py-3 bg-accent-red/10 border border-accent-red/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent-red/20 transition-all"
                    >
                      Sync with System Calculation (₦{systemCalculatedTax.toLocaleString()})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Institutional Node</label>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#006D35',
                    borderRadius: 16,
                    colorBgContainer: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <Input
                  className="w-full h-[54px] antd-bold-input cursor-not-allowed opacity-50"
                  value={formData.bankName}
                  readOnly
                />
              </ConfigProvider>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Remittance Period</label>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#006D35',
                    borderRadius: 16,
                    colorBgContainer: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <DatePicker
                  picker="month"
                  className="w-full h-[54px] antd-bold-select"
                  value={formData.period ? dayjs(formData.period, "MMMM YYYY") : null}
                  onChange={(date: Dayjs | null) => setFormData({ ...formData, period: date ? date.format("MMMM YYYY") : "" })}
                  popupClassName="antd-bold-dropdown"
                  format="MMMM YYYY"
                  placeholder="Select period"
                />
              </ConfigProvider>
              {errors.period && (
                <p className="text-[10px] font-black text-accent-red uppercase tracking-widest pl-1">{errors.period}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Asset Remittance (₦)</label>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#006D35',
                    borderRadius: 16,
                    colorBgContainer: 'rgba(255, 255, 255, 0.05)',
                    colorTextPlaceholder: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <InputNumber
                  className={`w-full h-[54px] antd-bold-number ${errors.totalTaxAmount ? 'border-accent-red ring-accent-red/20' : ''}`}
                  placeholder="0.00"
                  formatter={(value) => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/₦\s?|(,*)/g, "") as any}
                  value={formData.totalTaxAmount}
                  onChange={(val) => setFormData({ ...formData, totalTaxAmount: val || 0 })}
                  controls={false}
                />
              </ConfigProvider>
              {errors.totalTaxAmount && (
                <p className="text-[10px] font-black text-accent-red uppercase tracking-widest pl-1">{errors.totalTaxAmount}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Registry Manifest (Reference)</label>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimary: '#006D35',
                    borderRadius: 16,
                    colorBgContainer: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <Input
                  className="w-full h-[54px] antd-bold-input cursor-not-allowed opacity-50"
                  value={formData.referenceId}
                  readOnly
                />
              </ConfigProvider>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest pl-1">System Generated Sequential ID</p>
            </div>
          </div>

          {/* System calculation comparison */}
          <div className="mb-10 bg-white/2 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3508,transparent)] pointer-events-none"></div>
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.25em] mb-8 flex items-center">
              <span className="w-2 h-2 bg-primary animate-pulse rounded-full mr-3"></span>
              Live Computational Synthesis
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Protocol Estimate</p>
                <p className="text-sm font-black text-white uppercase tracking-tight">₦{systemCalculatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Declared Value</p>
                <p className="text-sm font-black text-white uppercase tracking-tight">₦{formData.totalTaxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Computational Variance</p>
                <p className={`text-sm font-black uppercase tracking-tight ${discrepancyClass}`}>
                  {discrepancy}%
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Alignment Status</p>
                <p className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block ${
                  parseFloat(discrepancy) === 0 ? "bg-primary/10 text-primary-light" : "bg-accent-red/10 text-accent-red"
                }`}>
                  {parseFloat(discrepancy) === 0 ? "Synchronized" : "Variance Detected"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-6">
            <button
              type="button"
              className="px-10 py-4 text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-colors"
            >
              Abort Declaration
            </button>
            <button
              type="submit"
              className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black"
            >
              Initialize Submission Protocol
            </button>
          </div>
        </form>
      </div>

      {/* Invoice Generator Modal */}
      {showInvoice && (
        <InvoiceGenerator
          declarationData={formData}
          systemCalculatedTax={systemCalculatedTax}
          discrepancyPercentage={parseFloat(discrepancy)}
          onClose={() => {
            setShowInvoice(false);
            // Only call onSubmit with invoiceProcessed flag if there's no discrepancy
            if (!hasDiscrepancy) {
              onSubmit({ ...formData, invoiceProcessed: true });
            }
          }}
        />
      )}
    </>
  );
};

export default BankDeclarationForm;
