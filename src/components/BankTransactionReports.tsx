import { useState } from "react";

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
      alert(
        "Report generation initiated. You will be notified when it's ready."
      );
    }, 1500);
  };

  // Mobile card for responsive design
  const MobileReportCard = ({ report }: { report: TransactionReport }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-primary">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-primary">{report.period}</span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              report.status === "Generated"
                ? "bg-green-100 text-green-800"
                : report.status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {report.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <p className="text-gray-500">Report ID</p>
            <p className="font-medium">{report.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Generated</p>
            <p className="font-medium">{report.generatedDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Transactions</p>
            <p className="font-medium">
              {report.totalTransactions.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-medium">{formatCurrency(report.totalAmount)}</p>
          </div>
        </div>
        {report.status === "Generated" && report.downloadUrl && (
          <div className="flex justify-end">
            <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              Download
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Transaction Reports
        </h1>
        <p className="text-gray-600">
          Generate and download transaction reports for tax reconciliation
        </p>
      </div>

      {/* Report Generation Form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-medium text-primary mb-4">
          Generate New Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="reportPeriod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Report Period
            </label>
            <select
              id="reportPeriod"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="last30">Last 30 Days</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
              <option value="jan2023">January 2023</option>
              <option value="feb2023">February 2023</option>
              <option value="mar2023">March 2023</option>
              <option value="apr2023">April 2023</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="reportType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Report Type
            </label>
            <select
              id="reportType"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="tax">Tax Report</option>
              <option value="agent">Agent Performance</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="reportFormat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Format
            </label>
            <select
              id="reportFormat"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>

        {selectedPeriod === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className={`bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition flex items-center ${
              isGeneratingReport ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isGeneratingReport ? (
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
                Generating...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report History */}
      <h2 className="text-lg font-medium text-primary mb-4">Report History</h2>

      {/* Mobile view */}
      <div className="block md:hidden">
        {reports.map((report) => (
          <MobileReportCard key={report.id} report={report} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                    {report.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.period}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.generatedDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.totalTransactions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(report.totalAmount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === "Generated"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {report.status === "Generated" && report.downloadUrl && (
                      <button className="text-primary hover:text-primary-dark font-medium flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
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
                        Download
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
          Report Generation Tips
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            Reports are typically generated within 5-10 minutes depending on the
            size
          </li>
          <li>
            For large date ranges, consider using the "Summary Report" option
          </li>
          <li>
            All reports include transaction IDs that can be used for
            reconciliation
          </li>
          <li>Reports remain available for download for 30 days</li>
        </ul>
      </div>
    </div>
  );
};

export default BankTransactionReports;
