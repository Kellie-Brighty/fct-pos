import { useState } from "react";
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
        backgroundColor: "rgba(29, 126, 80, 0.7)",
        borderColor: "rgba(29, 126, 80, 1)",
        borderWidth: 1,
      },
    ],
  };

  const complianceData = {
    labels: ["First Bank", "UBA", "GTBank", "Zenith", "Access", "Sterling"],
    datasets: [
      {
        label: "Compliance Rate (%)",
        data: [96, 88, 92, 98, 85, 94],
        backgroundColor: [
          "rgba(29, 126, 80, 0.7)",
          "rgba(111, 30, 81, 0.7)",
          "rgba(246, 156, 12, 0.7)",
          "rgba(13, 71, 161, 0.7)",
          "rgba(191, 54, 12, 0.7)",
          "rgba(46, 125, 50, 0.7)",
        ],
        borderColor: [
          "rgba(29, 126, 80, 1)",
          "rgba(111, 30, 81, 1)",
          "rgba(246, 156, 12, 1)",
          "rgba(13, 71, 161, 1)",
          "rgba(191, 54, 12, 1)",
          "rgba(46, 125, 50, 1)",
        ],
        borderWidth: 1,
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
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Generate and analyze tax collection reports
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-primary">
          <p className="text-gray-500 text-sm mb-1">Total Revenue (Q1)</p>
          <p className="text-2xl font-bold text-gray-800">₦86.2M</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>+8.4% from Q4 2022</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-accent-gold">
          <p className="text-gray-500 text-sm mb-1">Reports Generated</p>
          <p className="text-2xl font-bold text-gray-800">47</p>
          <div className="flex items-center text-xs text-gray-600 mt-2">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Last report: 2 days ago</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-secondary-light">
          <p className="text-gray-500 text-sm mb-1">Average Compliance</p>
          <p className="text-2xl font-bold text-gray-800">92.8%</p>
          <div className="flex items-center text-xs text-green-600 mt-2">
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>+1.2% from previous period</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-purple-500">
          <p className="text-gray-500 text-sm mb-1">Active Banks</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <div className="flex items-center text-xs text-gray-600 mt-2">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span>100% submission rate</span>
          </div>
        </div>
      </div>

      {/* Report Generator Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-medium text-primary mb-4">
          Generate New Report
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="reportType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) =>
                setReportType(
                  e.target.value as "summary" | "detailed" | "compliance"
                )
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Breakdown</option>
              <option value="compliance">Compliance Report</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Period
            </label>
            <select
              id="period"
              value={period}
              onChange={(e) =>
                setPeriod(e.target.value as "monthly" | "quarterly" | "annual")
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition flex items-center justify-center">
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-primary mb-4">
            Revenue Trend (Q1 2023)
          </h2>
          <div className="h-64">
            <Bar data={summaryData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-primary mb-4">
            Bank Compliance Rates
          </h2>
          <div className="h-64">
            <Bar data={complianceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-primary">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                    {report.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(report.createdAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {report.banks}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(report.totalAmount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-primary-dark font-medium mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium text-primary mb-4">
          Export Options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
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
              <span className="text-sm font-medium">Excel</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
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
          </button>

          <button className="flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">PDF</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
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
          </button>

          <button className="flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
              <span className="text-sm font-medium">CSV</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantReports;
