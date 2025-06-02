import { useState, useEffect } from "react";
import { BankDeclarationData } from "./BankDeclarationForm";

interface InvoiceGeneratorProps {
  declarationData: BankDeclarationData;
  systemCalculatedTax: number;
  discrepancyPercentage: number;
  onClose: () => void;
}

const InvoiceGenerator = ({
  declarationData,
  systemCalculatedTax,
  discrepancyPercentage,
  onClose,
}: InvoiceGeneratorProps) => {
  const [stage, setStage] = useState<
    "reconciling" | "generating" | "complete" | "discrepancy"
  >("reconciling");
  const [progress, setProgress] = useState(0);
  const [invoiceData, _setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().substring(0, 10)}`,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    taxAmount: declarationData.totalTaxAmount,
    adminFee: declarationData.totalTaxAmount * 0.02, // 2% admin fee
  });

  const hasDiscrepancy = discrepancyPercentage !== 0;

  // Animation effect for the loading
  useEffect(() => {
    // First 3 seconds for reconciliation
    const reconcileInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 50) {
          clearInterval(reconcileInterval);

          // If there's a discrepancy, go to discrepancy stage
          if (hasDiscrepancy) {
            setStage("discrepancy");
          } else {
            setStage("generating");
          }
          return 50;
        }
        return prev + 1;
      });
    }, 60); // 50% in 3 seconds (3000ms / 50 = 60ms per 1%)

    // Last 3 seconds for generating (only if no discrepancy)
    setTimeout(() => {
      // Skip this if there's a discrepancy
      if (hasDiscrepancy) return;

      const generateInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(generateInterval);
            setStage("complete");
            return 100;
          }
          return prev + 1;
        });
      }, 60); // Next 50% in 3 seconds
    }, 3000);

    return () => {
      clearInterval(reconcileInterval);
    };
  }, [hasDiscrepancy]);

  // Animation elements for the reconciliation stage
  const ReconciliationAnimation = () => (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative w-32 h-32 mb-6">
        {/* Left Document */}
        <div className="absolute left-0 top-4 w-14 h-20 bg-gray-100 border border-gray-300 rounded-md shadow-md flex flex-col p-1 animate-pulse">
          <div className="w-full h-2 bg-primary mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-primary-light mb-1 rounded-sm"></div>
          <div className="w-3/4 h-2 bg-primary-light mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-gray-300 mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-gray-300 mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-accent-gold rounded-sm"></div>
        </div>

        {/* Right Document */}
        <div className="absolute right-0 top-4 w-14 h-20 bg-gray-100 border border-gray-300 rounded-md shadow-md flex flex-col p-1 animate-pulse">
          <div className="w-full h-2 bg-secondary mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-secondary-light mb-1 rounded-sm"></div>
          <div className="w-3/4 h-2 bg-secondary-light mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-gray-300 mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-gray-300 mb-1 rounded-sm"></div>
          <div className="w-full h-2 bg-accent-blue rounded-sm"></div>
        </div>

        {/* Connecting Animation */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-spin">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-primary mb-2">
        {stage === "reconciling" ? "Reconciling Data" : "Generating Invoice"}
      </h3>
      <p className="text-gray-600 text-center mb-4">
        {stage === "reconciling"
          ? "Matching your declaration with system records..."
          : "Creating your tax invoice..."}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500">{progress}% complete</p>
    </div>
  );

  // Discrepancy notification
  const DiscrepancyNotification = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-start mb-6">
        <div className="flex-shrink-0 mt-0.5">
          <div className="bg-orange-100 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-500"
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
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-orange-800">
            Reconciliation Required
          </h3>
          <div className="mt-2 text-sm text-gray-700">
            <p className="mb-2">
              We detected a discrepancy between your declared tax amount and the
              system calculated amount.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Your Declaration:</p>
                  <p className="font-bold">
                    ₦{declarationData.totalTaxAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">System Calculated:</p>
                  <p className="font-bold">₦{systemCalculatedTax.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Discrepancy:</p>
                  <p className="font-bold text-orange-500">
                    {discrepancyPercentage.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p className="font-bold text-orange-500">Requires Review</p>
                </div>
              </div>
            </div>
            <p className="mb-4">
              Please go back and adjust your declaration to match the system
              calculated amount. The invoice cannot be generated until the
              discrepancy is resolved.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          Go Back and Review
        </button>
      </div>
    </div>
  );

  // The completed invoice
  const Invoice = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 max-w-2xl mx-auto">
      {/* Invoice Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-primary relative rounded-sm overflow-hidden border-2 border-white mr-3">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent-gold"></div>
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-blue"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent-blue"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary">TAX INVOICE</h1>
          </div>
          <p className="text-gray-600">Federal Capital Territory, Abuja</p>
          <p className="text-gray-600">POS Taxation Authority</p>
        </div>

        <div className="mt-4 md:mt-0 bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-600">Invoice Number:</p>
          <p className="font-bold text-primary">{invoiceData.invoiceNumber}</p>
          <p className="text-sm text-gray-600 mt-2">Reference ID:</p>
          <p className="font-bold">{declarationData.referenceId}</p>
        </div>
      </div>

      {/* Bank Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Billed To:</h2>
        <p className="font-bold">{declarationData.bankName}</p>
        <p className="text-gray-600">POS Service Provider</p>
        <p className="text-gray-600">Abuja, Nigeria</p>
      </div>

      {/* Invoice Details */}
      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Issue Date:</p>
              <p className="font-medium">{invoiceData.issueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Due Date:</p>
              <p className="font-medium">{invoiceData.dueDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Period:</p>
              <p className="font-medium">{declarationData.period}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status:</p>
              <p className="font-medium text-orange-500">Pending Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 border-b">Description</th>
              <th className="text-right p-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b">
                <p className="font-medium">POS Transaction Tax</p>
                <p className="text-sm text-gray-600">
                  Period: {declarationData.period}
                </p>
              </td>
              <td className="text-right p-3 border-b font-medium">
                ₦
                {invoiceData.taxAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
            <tr>
              <td className="p-3 border-b">
                <p className="font-medium">Administration Fee (2%)</p>
                <p className="text-sm text-gray-600">Processing fee</p>
              </td>
              <td className="text-right p-3 border-b font-medium">
                ₦
                {invoiceData.adminFee.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-primary text-white">
              <td className="p-3 font-bold">Total Due</td>
              <td className="text-right p-3 font-bold">
                ₦
                {(invoiceData.taxAmount + invoiceData.adminFee).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Instructions */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Payment Instructions:</h3>
        <p className="text-gray-600 mb-2">
          Please remit payment to the FCT POS Taxation Authority account:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-sm text-gray-600">Bank:</p>
          <p className="text-sm font-medium">Central Bank of Nigeria</p>

          <p className="text-sm text-gray-600">Account Name:</p>
          <p className="text-sm font-medium">FCT POS Tax Collection</p>

          <p className="text-sm text-gray-600">Account Number:</p>
          <p className="text-sm font-medium">0123456789</p>

          <p className="text-sm text-gray-600">Payment Reference:</p>
          <p className="text-sm font-medium">{invoiceData.invoiceNumber}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors w-full sm:w-auto"
        >
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white border border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition-colors w-full sm:w-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Invoice
          </button>

          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors w-full sm:w-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {stage === "reconciling" && "Processing Declaration"}
            {stage === "generating" && "Processing Declaration"}
            {stage === "complete" && "Tax Invoice"}
            {stage === "discrepancy" && "Declaration Discrepancy"}
          </h2>
          {stage !== "reconciling" && stage !== "generating" && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div>
          {(stage === "reconciling" || stage === "generating") && (
            <ReconciliationAnimation />
          )}
          {stage === "complete" && <Invoice />}
          {stage === "discrepancy" && <DiscrepancyNotification />}
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
