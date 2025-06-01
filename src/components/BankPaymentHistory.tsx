import { useState } from "react";

interface Payment {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  method: "Bank Transfer" | "Card Payment" | "Direct Debit";
  reference: string;
  period: string;
  status: "Successful" | "Pending" | "Failed";
  receiptUrl?: string;
}

const BankPaymentHistory = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Sample data for demonstration
  const payments: Payment[] = [
    {
      id: "PMT001",
      invoiceNumber: "INV20230001",
      date: "2023-02-10",
      amount: 24500,
      method: "Bank Transfer",
      reference: "FCTPOS/FB/JAN23/001",
      period: "January 2023",
      status: "Successful",
      receiptUrl: "#",
    },
    {
      id: "PMT002",
      invoiceNumber: "INV20230025",
      date: "2023-04-12",
      amount: 31200,
      method: "Direct Debit",
      reference: "FCTPOS/FB/MAR23/003",
      period: "March 2023",
      status: "Successful",
      receiptUrl: "#",
    },
    {
      id: "PMT003",
      invoiceNumber: "INV20230042",
      date: "2023-05-15",
      amount: 29800,
      method: "Card Payment",
      reference: "FCTPOS/FB/APR23/002",
      period: "April 2023",
      status: "Pending",
    },
    {
      id: "PMT004",
      invoiceNumber: "INV20230034",
      date: "2023-03-08",
      amount: 28900,
      method: "Bank Transfer",
      reference: "FCTPOS/FB/FEB23/001",
      period: "February 2023",
      status: "Failed",
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Filter payments based on status
  const filteredPayments =
    filterStatus === "all"
      ? payments
      : payments.filter(
          (payment) => payment.status.toLowerCase() === filterStatus
        );

  // Status badge component
  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "Successful":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Successful
          </span>
        );
      case "Pending":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Pending
          </span>
        );
      case "Failed":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  // Mobile card for responsive design
  const MobilePaymentCard = ({ payment }: { payment: Payment }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-primary">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-primary">
            #{payment.invoiceNumber}
          </span>
          <div>{getStatusBadge(payment.status)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <p className="text-gray-500">Payment ID</p>
            <p className="font-medium">{payment.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{payment.date}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium">{formatCurrency(payment.amount)}</p>
          </div>
          <div>
            <p className="text-gray-500">Method</p>
            <p className="font-medium">{payment.method}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Reference</p>
            <p className="font-medium">{payment.reference}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Period</p>
            <p className="font-medium">{payment.period}</p>
          </div>
        </div>
        {payment.status === "Successful" && payment.receiptUrl && (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Receipt
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
          Payment History
        </h1>
        <p className="text-gray-600">
          View and manage your tax payment records
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filter by status:</span>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 text-sm rounded-l-md ${
                filterStatus === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("successful")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "successful"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Successful
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "pending"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("failed")}
              className={`px-3 py-1 text-sm rounded-r-md ${
                filterStatus === "failed"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Failed
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID or Reference..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
            Search
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
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
            <p className="text-sm text-gray-500">Successful Payments</p>
            <p className="text-xl font-bold text-gray-800">
              {payments.filter((p) => p.status === "Successful").length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
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
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="text-xl font-bold text-gray-800">
              {payments.filter((p) => p.status === "Pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Failed Payments</p>
            <p className="text-xl font-bold text-gray-800">
              {payments.filter((p) => p.status === "Failed").length}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        {filteredPayments.map((payment) => (
          <MobilePaymentCard key={payment.id} payment={payment} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
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
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                    {payment.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {payment.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {payment.method}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {payment.period}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {payment.status === "Successful" && payment.receiptUrl && (
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Receipt
                      </button>
                    )}
                    {payment.status === "Failed" && (
                      <button className="text-accent-red hover:text-red-700 font-medium flex items-center">
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
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mt-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-primary mb-4">
          Payment Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Payment Methods</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Bank Transfer to FCT-POS Collection Account</li>
              <li>Card Payment via Quickteller</li>
              <li>Direct Debit (requires pre-authorization)</li>
              <li>USSD Payment using bank USSD codes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Payment Timeline</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Payments are due within 14 days of invoice generation</li>
              <li>Late payments may attract a 5% penalty fee</li>
              <li>
                Receipts are generated immediately for successful payments
              </li>
              <li>
                Payment status updates may take up to 24 hours for bank
                transfers
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankPaymentHistory;
