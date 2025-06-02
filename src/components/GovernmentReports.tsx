import { useState } from "react";

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
    alert(
      `Exporting ${activeTab} report in ${exportFormat.toUpperCase()} format`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-primary">Reports</h1>
        <div className="mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
            >
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="last90Days">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>

            <div className="flex space-x-2">
              <select
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as any)}
              >
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
              </select>

              <button
                onClick={handleExportReport}
                className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition flex items-center"
              >
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
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "transactions"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Transaction Reports
            </button>
            <button
              onClick={() => setActiveTab("declarations")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "declarations"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Declaration Reports
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "payments"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Payment Reports
            </button>
            <button
              onClick={() => setActiveTab("summaries")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "summaries"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Summary Reports
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Transaction Reports */}
          {activeTab === "transactions" && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Transaction Reports
                </h3>
                <p className="text-sm text-gray-500">
                  Detailed POS transaction data for tax collection tracking
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Report ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Transactions
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tax Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactionReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.bank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.totalTxn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.taxAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Declaration Reports */}
          {activeTab === "declarations" && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Declaration Reports
                </h3>
                <p className="text-sm text-gray-500">
                  Monthly bank tax declarations and reconciliation status
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Declaration ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Period
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Submission Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {declarationReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.bank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.submissionDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              report.status === "Reconciled"
                                ? "bg-green-100 text-green-800"
                                : report.status === "Discrepancy"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payment Reports */}
          {activeTab === "payments" && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Payment Reports
                </h3>
                <p className="text-sm text-gray-500">
                  Tax payment records and receipts from banks
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Payment ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Period
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Payment Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Method
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.bank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.paymentDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.method}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-2">
                            View
                          </button>
                          <button className="text-primary hover:text-primary-dark">
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary Reports */}
          {activeTab === "summaries" && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Summary Reports
                </h3>
                <p className="text-sm text-gray-500">
                  Consolidated tax collection summaries by period
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Report ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Period
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Generated Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        File Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summaryReports.map((report) => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                          {report.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.period}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.generatedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.fileSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-primary hover:text-primary-dark mr-2">
                            View
                          </button>
                          <button className="text-primary hover:text-primary-dark">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentReports;
