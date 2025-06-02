import { useState } from "react";
import MonthlyTaxChart from "./MonthlyTaxChart";

const GovernmentDashboard = () => {
  // This would normally be fetched from an API
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "monthly"
  );

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalTaxCollected: "₦126,584,305.00",
    monthlyTarget: "₦150,000,000.00",
    complianceRate: "87%",
    activeBanks: 23,
    totalTransactions: "6,458,921",
    avgTaxPerTransaction: "₦19.60",
    yearToDateGrowth: "+16.3%",
    pendingInvoices: 4,
    paidInvoices: 19,
    // New transaction volume data
    transactionVolume: "₦63,291,850,500.00",
    volumeGrowth: "+12.7%",
    peakHour: "12:00 - 13:00",
    avgTransactionSize: "₦9,800.00",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-primary">
          Government Dashboard
        </h1>
        <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-sm inline-flex p-1">
          <button
            className={`px-4 py-2 text-sm rounded-md ${
              period === "daily"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setPeriod("daily")}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md ${
              period === "weekly"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setPeriod("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md ${
              period === "monthly"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-medium text-gray-700 truncate pr-2">
              Total Tax Collected
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
              {dashboardMetrics.yearToDateGrowth}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-2 truncate">
            {dashboardMetrics.totalTaxCollected}
          </div>
          <div className="text-sm text-gray-500">
            <span className="block mb-1 truncate">
              Target: {dashboardMetrics.monthlyTarget}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 md:mt-2">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: dashboardMetrics.complianceRate }}
              ></div>
            </div>
          </div>
        </div>

        {/* New Transaction Volume Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-medium text-gray-700 truncate pr-2">
              Transaction Volume
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
              {dashboardMetrics.volumeGrowth}
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-2 truncate">
            {dashboardMetrics.transactionVolume}
          </div>
          <div className="text-sm text-gray-500 mb-2">
            <span className="block truncate">
              Total value of all POS transactions
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 truncate pr-2">
                Average Transaction Size
              </span>
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {dashboardMetrics.avgTransactionSize}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 truncate pr-2">
                Peak Transaction Hour
              </span>
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {dashboardMetrics.peakHour}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4 truncate">
            Bank Compliance
          </h3>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
            {dashboardMetrics.complianceRate}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 truncate pr-2">Active Banks</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {dashboardMetrics.activeBanks}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 truncate pr-2">Invoices Paid</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {dashboardMetrics.paidInvoices}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 truncate pr-2">
                Invoices Pending
              </span>
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {dashboardMetrics.pendingInvoices}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h3 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4 truncate">
            Transaction Overview
          </h3>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-2 truncate">
            {dashboardMetrics.totalTransactions}
          </div>
          <div className="text-sm text-gray-500 mb-3 md:mb-4">
            <span className="block truncate">Total POS transactions</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 truncate pr-2">
              Average Tax Per Transaction
            </span>
            <span className="text-gray-900 font-medium whitespace-nowrap">
              {dashboardMetrics.avgTaxPerTransaction}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Monthly Tax Collection Trend
        </h3>
        <MonthlyTaxChart />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            Recent Tax Payments
          </h3>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Amount
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    First Bank Nigeria
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₦12,564,320.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">May 15, 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    GTBank
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₦9,845,150.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">May 14, 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Union Bank
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₦7,125,680.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">May 13, 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Access Bank
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₦8,437,925.00</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">May 12, 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
