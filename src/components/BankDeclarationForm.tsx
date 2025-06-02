import { useState, useEffect } from "react";
import InvoiceGenerator from "./InvoiceGenerator";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "totalTaxAmount" ? parseFloat(value) || 0 : value,
    });

    // Clear discrepancy alert when the user changes the amount
    if (name === "totalTaxAmount") {
      setShowDiscrepancyAlert(false);
    }
  };

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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Monthly Tax Declaration Form
        </h2>

        {showDiscrepancyAlert && (
          <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-700 p-4 rounded-md">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">
                  Reconciliation Required
                </h3>
                <div className="mt-2 text-sm text-orange-700">
                  <p>
                    Your declared tax amount does not match the system
                    calculated amount. There is a discrepancy of {discrepancy}%.
                  </p>
                  <p className="mt-1">
                    Please review your amount and make sure it matches the
                    system calculation before proceeding.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        totalTaxAmount: systemCalculatedTax,
                      }));
                      setShowDiscrepancyAlert(false);
                    }}
                    className="mt-3 bg-primary text-white px-3 py-1 rounded-md text-xs hover:bg-primary-dark transition"
                  >
                    Use System Value
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bankName" className="block text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
              placeholder="Enter your bank name"
            />
            {errors.bankName && (
              <p className="text-accent-red text-sm mt-1">{errors.bankName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="period" className="block text-gray-700 mb-2">
              Remittance Period
            </label>
            <input
              type="month"
              id="period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md ${
                errors.period ? "border-accent-red" : "border-gray-300"
              }`}
            />
            {errors.period && (
              <p className="text-accent-red text-sm mt-1">{errors.period}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalTaxAmount"
              className="block text-gray-700 mb-2"
            >
              Total Tax Amount Declared (₦)
            </label>
            <input
              type="number"
              id="totalTaxAmount"
              name="totalTaxAmount"
              value={formData.totalTaxAmount}
              onChange={handleChange}
              step="0.01"
              className={`w-full p-3 border rounded-md ${
                errors.totalTaxAmount ? "border-accent-red" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.totalTaxAmount && (
              <p className="text-accent-red text-sm mt-1">
                {errors.totalTaxAmount}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="referenceId" className="block text-gray-700 mb-2">
              Reference ID
            </label>
            <input
              type="text"
              id="referenceId"
              name="referenceId"
              value={formData.referenceId}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
            />
            <p className="text-sm text-gray-500 mt-1">
              System generated reference ID
            </p>
          </div>

          {/* System calculation comparison */}
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-semibold text-primary mb-3">
              System Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">System Calculated Tax:</p>
                <p className="font-bold">₦{systemCalculatedTax.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Your Declaration:</p>
                <p className="font-bold">
                  ₦{formData.totalTaxAmount.toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Discrepancy:</p>
                <p className={`font-bold ${discrepancyClass}`}>
                  {discrepancy}%
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Status:</p>
                <p
                  className={`font-bold ${
                    parseFloat(discrepancy) === 0
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {parseFloat(discrepancy) === 0
                    ? "Matched"
                    : "Requires Review"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-2 mr-3 border border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              Submit Declaration
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
