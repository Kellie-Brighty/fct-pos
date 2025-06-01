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

const ConsultantDashboard = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "quarterly">(
    "monthly"
  );

  // Sample data for demonstration
  const pendingDeclarations = [
    {
      id: "DCL001",
      bank: "First Bank Nigeria",
      period: "Q1 2023",
      amount: 1250000,
      status: "Pending Review",
    },
    {
      id: "DCL002",
      bank: "UBA",
      period: "Q1 2023",
      amount: 980000,
      status: "Pending Review",
    },
    {
      id: "DCL003",
      bank: "Zenith Bank",
      period: "Q1 2023",
      amount: 1430000,
      status: "Under Assessment",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Approved Declaration",
      bank: "Access Bank",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Requested Additional Info",
      bank: "Wema Bank",
      time: "Yesterday",
    },
    {
      id: 3,
      action: "Updated Client Profile",
      bank: "GTBank",
      time: "Yesterday",
    },
    {
      id: 4,
      action: "Completed Assessment",
      bank: "First Bank Nigeria",
      time: "3 days ago",
    },
    {
      id: 5,
      action: "Generated Report",
      bank: "Standard Chartered",
      time: "1 week ago",
    },
  ];

  // Chart data
  const complianceData = {
    labels: ["First Bank", "UBA", "GTBank", "Zenith", "Access", "Sterling"],
    datasets: [
      {
        label: "Compliance Rate (%)",
        data: [96, 88, 92, 98, 85, 94],
        backgroundColor: [
          "rgba(29, 126, 80, 0.7)",
          "rgba(29, 126, 80, 0.7)",
          "rgba(29, 126, 80, 0.7)",
          "rgba(29, 126, 80, 0.7)",
          "rgba(29, 126, 80, 0.7)",
          "rgba(29, 126, 80, 0.7)",
        ],
        borderColor: [
          "rgba(29, 126, 80, 1)",
          "rgba(29, 126, 80, 1)",
          "rgba(29, 126, 80, 1)",
          "rgba(29, 126, 80, 1)",
          "rgba(29, 126, 80, 1)",
          "rgba(29, 126, 80, 1)",
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
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value: any) {
            return value + "%";
          },
        },
      },
    },
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
          Consultant Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of your clients, declarations, and performance metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-primary">
          <p className="text-gray-500 text-sm mb-1">Assigned Banks</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
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
            <span>+2 new this month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-purple-500">
          <p className="text-gray-500 text-sm mb-1">Pending Reviews</p>
          <p className="text-2xl font-bold text-gray-800">8</p>
          <div className="flex items-center text-xs text-purple-600 mt-2">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>3 need urgent attention</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-accent-gold">
          <p className="text-gray-500 text-sm mb-1">Total Tax Revenue</p>
          <p className="text-2xl font-bold text-gray-800">₦158.3M</p>
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
            <span>+12.4% from last month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-secondary-light">
          <p className="text-gray-500 text-sm mb-1">Compliance Rate</p>
          <p className="text-2xl font-bold text-gray-800">92%</p>
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
            <span>+3% from last quarter</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pending Declarations */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-primary">
              Pending Declarations
            </h2>
            <a
              href="#"
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingDeclarations.map((declaration) => (
                  <tr key={declaration.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                      {declaration.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {declaration.bank}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {declaration.period}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {formatCurrency(declaration.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          declaration.status === "Pending Review"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {declaration.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-medium text-primary mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="bg-primary-light p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-gray-600 text-xs">{activity.bank}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-lg font-medium text-primary mb-2 md:mb-0">
            Client Compliance Rate
          </h2>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setPeriod("weekly")}
              className={`px-3 py-1 text-sm rounded-l-md ${
                period === "weekly"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 text-sm ${
                period === "monthly"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod("quarterly")}
              className={`px-3 py-1 text-sm rounded-r-md ${
                period === "quarterly"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Quarterly
            </button>
          </div>
        </div>
        <div className="h-64">
          <Bar data={complianceData} options={chartOptions} />
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-medium text-primary mb-4">
          Upcoming Tasks
        </h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-md">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
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
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">
                Review First Bank Declaration
              </p>
              <p className="text-xs text-gray-600">Due in 2 days</p>
            </div>
            <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
              High Priority
            </span>
          </div>

          <div className="flex items-center p-3 bg-purple-50 rounded-md">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">
                Audit Zenith Bank Transactions
              </p>
              <p className="text-xs text-gray-600">Due in 5 days</p>
            </div>
            <span className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded-full">
              Medium
            </span>
          </div>

          <div className="flex items-center p-3 bg-green-50 rounded-md">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
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
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Prepare Monthly Report</p>
              <p className="text-xs text-gray-600">Due in 1 week</p>
            </div>
            <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">
              Low
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
