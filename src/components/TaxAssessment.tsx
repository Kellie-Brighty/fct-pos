import { useState } from "react";

const TaxAssessment = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
      alert("Please select both bank and period to continue");
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
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Tax Assessment
        </h1>
        <p className="text-gray-600">
          Analyze and validate tax declarations from banks
        </p>
      </div>

      {/* Assessment Form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium text-primary mb-4">
          Start New Assessment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Bank
            </label>
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">-- Select Bank --</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Period
            </label>
            <select
              id="period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">-- Select Period --</option>
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStartAssessment}
            disabled={isAnalyzing}
            className={`bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition flex items-center ${
              isAnalyzing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isAnalyzing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Start Assessment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {!isAnalyzing && selectedBank && selectedPeriod && (
        <>
          {/* Summary Cards */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-primary mb-4">
              Assessment Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-primary">
                <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
                <p className="text-xl font-bold text-gray-800">
                  {assessmentResults.summary.totalTransactions.toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(assessmentResults.summary.totalAmount)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                <p className="text-sm text-gray-500 mb-1">Declared Tax</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(assessmentResults.summary.declaredTaxAmount)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-sm text-gray-500 mb-1">Calculated Tax</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(
                    assessmentResults.summary.calculatedTaxAmount
                  )}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <p className="text-sm text-gray-500 mb-1">Discrepancy</p>
                <p className="text-xl font-bold text-gray-800">
                  {formatCurrency(assessmentResults.summary.discrepancy)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <p className="text-sm text-gray-500 mb-1">Discrepancy %</p>
                <p className="text-xl font-bold text-gray-800">
                  {assessmentResults.summary.discrepancyPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-medium text-primary mb-4">
              Category Breakdown
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transactions
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Declared Tax
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calculated Tax
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discrepancy
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discrepancy %
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assessmentResults.categories.map((category, index) => (
                    <tr
                      key={index}
                      className={
                        category.discrepancyPercentage > 5 ? "bg-red-50" : ""
                      }
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {category.count.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(category.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(category.declaredTax)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(category.calculatedTax)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(category.discrepancy)}
                      </td>
                      <td
                        className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                          category.discrepancyPercentage > 5
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {category.discrepancyPercentage.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button className="border border-primary text-primary px-4 py-2 rounded-md text-sm hover:bg-primary-light transition flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Report
            </button>

            <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Send to Bank for Correction
            </button>
          </div>
        </>
      )}

      {/* Tips and Guidelines */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <h3 className="font-medium mb-2 flex items-center">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Assessment Guidelines
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Review transactions with discrepancies greater than 5% as a priority
          </li>
          <li>
            Cross-check calculations with the latest tax rates for each category
          </li>
          <li>
            For discrepancies above ₦5,000, direct communication with the bank
            is recommended
          </li>
          <li>
            Assessments should be completed within 5 working days of declaration
            submission
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaxAssessment;
