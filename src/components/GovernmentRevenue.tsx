import { useState } from "react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GovernmentRevenue = () => {
  const [dateRange, setDateRange] = useState<"lastMonth" | "last3Months" | "last6Months" | "lastYear">("lastMonth");
  const [bankFilter, setBankFilter] = useState<string>("all");
  
  // Mock data for chart
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Tax Revenue (Millions NGN)",
        data: [35.8, 42.2, 38.9, 41.5, 47.3, 51.8, 56.2, 58.9, 62.1, 65.7, 68.2, 72.5],
        borderColor: "#00A651",
        backgroundColor: "rgba(0, 166, 81, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Target (Millions NGN)",
        data: [40, 40, 40, 45, 45, 45, 50, 50, 50, 55, 55, 55],
        borderColor: "#FFA500",
        backgroundColor: "rgba(255, 165, 0, 0.1)",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  // Distribution by bank data
  const bankDistributionData = {
    labels: ["First Bank", "GTBank", "UBA", "Access Bank", "Zenith Bank", "Others"],
    datasets: [
      {
        data: [25, 18, 15, 13, 10, 19],
        backgroundColor: [
          "#00A651", // Primary color
          "#028A42",
          "#046E34",
          "#065326",
          "#083D1D",
          "#0A2714",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  // Bank performance data
  const bankPerformanceData = [
    { bank: "First Bank Nigeria", amount: "₦31,564,320.00", compliance: "98%", status: "Compliant" },
    { bank: "GTBank", amount: "₦22,845,150.00", compliance: "95%", status: "Compliant" },
    { bank: "UBA", amount: "₦18,725,680.00", compliance: "92%", status: "Compliant" },
    { bank: "Access Bank", amount: "₦16,437,925.00", compliance: "89%", status: "Compliant" },
    { bank: "Zenith Bank", amount: "₦12,954,610.00", compliance: "87%", status: "Compliant" },
    { bank: "Sterling Bank", amount: "₦7,832,425.00", compliance: "81%", status: "Attention" },
    { bank: "Unity Bank", amount: "₦5,218,735.00", compliance: "73%", status: "Attention" },
    { bank: "Fidelity Bank", amount: "₦4,985,150.00", compliance: "68%", status: "Warning" },
  ];

  const handleDateRangeChange = (range: "lastMonth" | "last3Months" | "last6Months" | "lastYear") => {
    setDateRange(range);
    // In a real app, this would trigger an API call to get new data
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-primary">Revenue Analytics</h1>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
          >
            <option value="all">All Banks</option>
            <option value="firstBank">First Bank</option>
            <option value="gtbank">GTBank</option>
            <option value="uba">UBA</option>
            <option value="accessBank">Access Bank</option>
            <option value="zenithBank">Zenith Bank</option>
          </select>
          
          <div className="bg-white rounded-lg shadow-sm inline-flex p-1 border border-gray-200">
            <button
              className={`px-3 py-1.5 text-xs rounded-md ${
                dateRange === "lastMonth"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleDateRangeChange("lastMonth")}
            >
              1M
            </button>
            <button
              className={`px-3 py-1.5 text-xs rounded-md ${
                dateRange === "last3Months"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleDateRangeChange("last3Months")}
            >
              3M
            </button>
            <button
              className={`px-3 py-1.5 text-xs rounded-md ${
                dateRange === "last6Months"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleDateRangeChange("last6Months")}
            >
              6M
            </button>
            <button
              className={`px-3 py-1.5 text-xs rounded-md ${
                dateRange === "lastYear"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleDateRangeChange("lastYear")}
            >
              1Y
            </button>
          </div>
        </div>
      </div>

      {/* Revenue Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 mb-1">Total Revenue (YTD)</div>
          <div className="text-2xl font-bold text-primary">₦614.8M</div>
          <div className="text-xs text-green-600 mt-1">+12.3% vs last year</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 mb-1">Average Monthly</div>
          <div className="text-2xl font-bold text-primary">₦51.2M</div>
          <div className="text-xs text-green-600 mt-1">+8.7% vs target</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 mb-1">Forecasted Year-End</div>
          <div className="text-2xl font-bold text-primary">₦742.1M</div>
          <div className="text-xs text-green-600 mt-1">+15.6% vs last year</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 mb-1">Overall Compliance</div>
          <div className="text-2xl font-bold text-primary">87.4%</div>
          <div className="text-xs text-green-600 mt-1">+2.8% vs last quarter</div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Trend Analysis</h3>
        <div className="h-80">
          <Line
            data={revenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || "";
                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed.y !== null) {
                        label += "₦" + context.parsed.y + "M";
                      }
                      return label;
                    }
                  }
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Millions (NGN)",
                  },
                  ticks: {
                    callback: function(value) {
                      return "₦" + value + "M";
                    }
                  }
                },
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bank Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Distribution by Bank</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <Doughnut
                data={bankDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || "";
                          const value = context.raw as number;
                          const percentage = value + "%";
                          return `${label}: ${percentage}`;
                        }
                      }
                    }
                  },
                  cutout: "70%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Growth Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Year-over-Year Growth</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Q1 Growth</span>
                <span className="text-sm font-medium text-gray-900">+14.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "14.2%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Q2 Growth</span>
                <span className="text-sm font-medium text-gray-900">+16.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "16.8%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Q3 Growth</span>
                <span className="text-sm font-medium text-gray-900">+11.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "11.5%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Q4 Growth (Projected)</span>
                <span className="text-sm font-medium text-gray-900">+18.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "18.3%" }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Annual Growth</span>
                <span className="text-sm font-medium text-gray-900">+15.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "15.2%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Performance Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Bank Performance</h3>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Rate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bankPerformanceData.map((bank, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{bank.bank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bank.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bank.compliance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${bank.status === 'Compliant' ? 'bg-green-100 text-green-800' : 
                        bank.status === 'Attention' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {bank.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GovernmentRevenue; 