import { useState } from "react";
import MonthlyTaxChart from "./MonthlyTaxChart";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  tax: number;
  agent: string;
  location: string;
}

interface Declaration {
  id: string;
  period: string;
  submittedDate: string;
  declaredAmount: number;
  calculatedAmount: number;
  status: "Matched" | "Discrepancy" | "Pending" | "Paid";
  paymentDate?: string;
  invoiceNumber?: string;
}

const BankDashboard = () => {
  // Sample data - in a real app this would come from API
  const [activeTab, setActiveTab] = useState<
    "overview" | "transactions" | "declarations"
  >("overview");

  const transactionData: Transaction[] = [
    {
      id: "TX001",
      date: "2023-05-01",
      amount: 50000,
      tax: 100,
      agent: "Agent 1",
      location: "Wuse, Abuja",
    },
    {
      id: "TX002",
      date: "2023-05-01",
      amount: 25000,
      tax: 50,
      agent: "Agent 2",
      location: "Garki, Abuja",
    },
    {
      id: "TX003",
      date: "2023-05-02",
      amount: 100000,
      tax: 200,
      agent: "Agent 3",
      location: "Maitama, Abuja",
    },
    {
      id: "TX004",
      date: "2023-05-02",
      amount: 75000,
      tax: 150,
      agent: "Agent 1",
      location: "Wuse, Abuja",
    },
    {
      id: "TX005",
      date: "2023-05-03",
      amount: 30000,
      tax: 60,
      agent: "Agent 4",
      location: "Asokoro, Abuja",
    },
    {
      id: "TX006",
      date: "2023-05-03",
      amount: 45000,
      tax: 90,
      agent: "Agent 2",
      location: "Garki, Abuja",
    },
    {
      id: "TX007",
      date: "2023-05-04",
      amount: 60000,
      tax: 120,
      agent: "Agent 5",
      location: "Central Area, Abuja",
    },
    {
      id: "TX008",
      date: "2023-05-04",
      amount: 80000,
      tax: 160,
      agent: "Agent 3",
      location: "Maitama, Abuja",
    },
  ];

  const declarationData: Declaration[] = [
    {
      id: "DCL001",
      period: "January 2023",
      submittedDate: "2023-02-05",
      declaredAmount: 24500,
      calculatedAmount: 24500,
      status: "Paid",
      paymentDate: "2023-02-10",
      invoiceNumber: "INV20230001",
    },
    {
      id: "DCL002",
      period: "February 2023",
      submittedDate: "2023-03-04",
      declaredAmount: 28750,
      calculatedAmount: 28900,
      status: "Discrepancy",
    },
    {
      id: "DCL003",
      period: "March 2023",
      submittedDate: "2023-04-05",
      declaredAmount: 31200,
      calculatedAmount: 31200,
      status: "Paid",
      paymentDate: "2023-04-12",
      invoiceNumber: "INV20230025",
    },
    {
      id: "DCL004",
      period: "April 2023",
      submittedDate: "2023-05-03",
      declaredAmount: 29800,
      calculatedAmount: 29800,
      status: "Matched",
    },
  ];

  // Calculate summary data
  const totalTransactions = transactionData.length;
  const totalVolume = transactionData.reduce((sum, tx) => sum + tx.amount, 0);
  const totalTax = transactionData.reduce((sum, tx) => sum + tx.tax, 0);
  const uniqueAgents = new Set(transactionData.map((tx) => tx.agent)).size;

  // Helper function for status badges
  const getStatusBadge = (status: Declaration["status"]) => {
    switch (status) {
      case "Matched":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Matched
          </span>
        );
      case "Discrepancy":
        return (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            Discrepancy
          </span>
        );
      case "Pending":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Pending
          </span>
        );
      case "Paid":
        return (
          <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs font-medium">
            Paid
          </span>
        );
      default:
        return null;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Responsive card for mobile transaction display
  const MobileTransactionCard = ({
    transaction,
  }: {
    transaction: Transaction;
  }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-primary">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-primary">{transaction.id}</span>
          <span className="text-sm text-gray-600">{transaction.date}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium">{formatCurrency(transaction.amount)}</p>
          </div>
          <div>
            <p className="text-gray-500">Tax</p>
            <p className="font-medium">{formatCurrency(transaction.tax)}</p>
          </div>
          <div>
            <p className="text-gray-500">Agent</p>
            <p className="font-medium">{transaction.agent}</p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium">{transaction.location}</p>
          </div>
        </div>
      </div>
    );
  };

  // Responsive card for mobile declaration display
  const MobileDeclarationCard = ({
    declaration,
  }: {
    declaration: Declaration;
  }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-secondary">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-primary">{declaration.period}</span>
          <div>{getStatusBadge(declaration.status)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div>
            <p className="text-gray-500">ID</p>
            <p className="font-medium">{declaration.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Submitted</p>
            <p className="font-medium">{declaration.submittedDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Declared</p>
            <p className="font-medium">
              {formatCurrency(declaration.declaredAmount)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Calculated</p>
            <p className="font-medium">
              {formatCurrency(declaration.calculatedAmount)}
            </p>
          </div>
        </div>
        <div className="mt-2">
          {declaration.status === "Matched" && (
            <button className="text-accent-teal hover:text-opacity-80 text-sm">
              Pay Now
            </button>
          )}
          {declaration.status === "Discrepancy" && (
            <button className="text-accent-red hover:text-opacity-80 text-sm">
              Resolve
            </button>
          )}
          {declaration.status === "Paid" && (
            <button className="text-primary hover:text-primary-dark text-sm">
              View Receipt
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Bank Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, First Bank Nigeria PLC</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-1 ${
              activeTab === "overview"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-4 px-1 ${
              activeTab === "transactions"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Recent Transactions
          </button>
          <button
            onClick={() => setActiveTab("declarations")}
            className={`pb-4 px-1 ${
              activeTab === "declarations"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Declaration History
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Summary Cards */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-primary">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Total Transactions
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {totalTransactions}
              </p>
              <p className="text-green-600 text-sm mt-2">
                +12% from last month
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-secondary">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Transaction Volume
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {formatCurrency(totalVolume)}
              </p>
              <p className="text-green-600 text-sm mt-2">+8% from last month</p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-accent-blue">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Tax Collected
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {formatCurrency(totalTax)}
              </p>
              <p className="text-green-600 text-sm mt-2">+5% from last month</p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-t-4 border-accent-gold">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Active Agents
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                {uniqueAgents}
              </p>
              <p className="text-green-600 text-sm mt-2">+2 from last month</p>
            </div>
          </div>

          {/* Tax Deduction Trend Chart - Always using bar chart */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-primary mb-4 font-heading">
              Tax Deduction Trends
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <MonthlyTaxChart variant="bar" />
            </div>
          </div>

          {/* Tax Declaration Status */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-primary mb-4 font-heading">
              Recent Tax Declarations
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Period
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Submitted
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Declared Amount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {declarationData.slice(0, 3).map((declaration) => (
                      <tr key={declaration.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {declaration.period}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {declaration.submittedDate}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(declaration.declaredAmount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {getStatusBadge(declaration.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2 className="text-lg md:text-xl font-medium text-primary">
              Recent POS Transactions
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                placeholder="Search transactions..."
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
                Export
              </button>
            </div>
          </div>

          {/* Mobile view for transactions */}
          <div className="block md:hidden">
            {transactionData.map((transaction) => (
              <MobileTransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                Showing 8 of 12 results
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white shadow rounded text-sm">
                  Prev
                </button>
                <button className="px-3 py-1 bg-primary text-white rounded text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Desktop view for transactions */}
          <div className="hidden md:block">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tax (0.2%)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactionData.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                          {transaction.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {transaction.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {formatCurrency(transaction.tax)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {transaction.agent}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {transaction.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">8</span> of{" "}
                      <span className="font-medium">12</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Declarations Tab */}
      {activeTab === "declarations" && (
        <div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2 className="text-lg md:text-xl font-medium text-primary">
              Tax Declaration History
            </h2>
            <button className="bg-accent-teal text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition">
              New Declaration
            </button>
          </div>

          {/* Mobile view for declarations */}
          <div className="block md:hidden">
            {declarationData.map((declaration) => (
              <MobileDeclarationCard
                key={declaration.id}
                declaration={declaration}
              />
            ))}
          </div>

          {/* Desktop view for declarations */}
          <div className="hidden md:block">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Declared Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        System Calculated
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
                    {declarationData.map((declaration) => (
                      <tr key={declaration.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                          {declaration.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {declaration.period}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {declaration.submittedDate}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {formatCurrency(declaration.declaredAmount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {formatCurrency(declaration.calculatedAmount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {getStatusBadge(declaration.status)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {declaration.status === "Matched" && (
                            <button className="text-accent-teal hover:text-opacity-80">
                              Pay Now
                            </button>
                          )}
                          {declaration.status === "Discrepancy" && (
                            <button className="text-accent-red hover:text-opacity-80">
                              Resolve
                            </button>
                          )}
                          {declaration.status === "Paid" && (
                            <button className="text-primary hover:text-primary-dark">
                              View Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-primary mb-4">
              Declaration Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Submission Guidelines
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li>
                    Declarations must be submitted by the 7th of each month
                  </li>
                  <li>
                    All POS transactions from the previous month must be
                    included
                  </li>
                  <li>Tax rate is fixed at 0.2% of the transaction amount</li>
                  <li>
                    Discrepancies greater than 1% will require manual
                    verification
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Payment Process
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li>
                    After declaration is matched, an invoice will be generated
                  </li>
                  <li>
                    Payment must be made within 14 days of invoice generation
                  </li>
                  <li>Payments can be made via Quickteller or PayDirect</li>
                  <li>
                    A payment receipt will be issued immediately upon
                    confirmation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDashboard;
