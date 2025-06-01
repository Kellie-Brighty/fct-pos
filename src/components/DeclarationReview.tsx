import { useState } from "react";

interface Declaration {
  id: string;
  bankName: string;
  period: string;
  submissionDate: string;
  totalAmount: number;
  taxAmount: number;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
}

interface DeclarationDetail {
  id: string;
  bankName: string;
  period: string;
  submissionDate: string;
  dueDate: string;
  totalAmount: number;
  taxAmount: number;
  transactionCount: number;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  categories: {
    category: string;
    count: number;
    amount: number;
    taxRate: number;
    taxAmount: number;
  }[];
  notes?: string;
}

const DeclarationReview = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "reviewed">("pending");
  const [selectedDeclaration, setSelectedDeclaration] = useState<string | null>(
    null
  );
  const [reviewNote, setReviewNote] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for demonstration
  const declarations: Declaration[] = [
    {
      id: "DCL001",
      bankName: "First Bank Nigeria",
      period: "Q1 2023",
      submissionDate: "2023-04-12",
      totalAmount: 4250000,
      taxAmount: 127500,
      status: "Pending",
    },
    {
      id: "DCL002",
      bankName: "UBA",
      period: "Q1 2023",
      submissionDate: "2023-04-10",
      totalAmount: 3680000,
      taxAmount: 110400,
      status: "Under Review",
    },
    {
      id: "DCL003",
      bankName: "Zenith Bank",
      period: "Q1 2023",
      submissionDate: "2023-04-08",
      totalAmount: 5125000,
      taxAmount: 153750,
      status: "Pending",
    },
    {
      id: "DCL004",
      bankName: "GTBank",
      period: "Q1 2023",
      submissionDate: "2023-04-05",
      totalAmount: 3950000,
      taxAmount: 118500,
      status: "Approved",
    },
    {
      id: "DCL005",
      bankName: "Access Bank",
      period: "Q1 2023",
      submissionDate: "2023-04-03",
      totalAmount: 4720000,
      taxAmount: 141600,
      status: "Rejected",
    },
  ];

  // Sample detailed declaration
  const declarationDetails: Record<string, DeclarationDetail> = {
    DCL001: {
      id: "DCL001",
      bankName: "First Bank Nigeria",
      period: "Q1 2023",
      submissionDate: "2023-04-12",
      dueDate: "2023-04-30",
      totalAmount: 4250000,
      taxAmount: 127500,
      transactionCount: 15280,
      status: "Pending",
      categories: [
        {
          category: "Card Transactions",
          count: 8750,
          amount: 2850000,
          taxRate: 3,
          taxAmount: 85500,
        },
        {
          category: "Wire Transfers",
          count: 4230,
          amount: 980000,
          taxRate: 3,
          taxAmount: 29400,
        },
        {
          category: "Mobile Payments",
          count: 2300,
          amount: 420000,
          taxRate: 3,
          taxAmount: 12600,
        },
      ],
    },
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Filter declarations based on status and search
  const filteredDeclarations = declarations.filter((declaration) => {
    const statusMatch =
      filterStatus === "all" ||
      declaration.status.toLowerCase() === filterStatus.toLowerCase();

    const searchMatch =
      searchQuery === "" ||
      declaration.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      declaration.bankName.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  // Handle declaration review submission
  const handleReviewSubmit = (action: "approve" | "reject") => {
    if (!selectedDeclaration) return;

    alert(
      `Declaration ${selectedDeclaration} has been ${
        action === "approve" ? "approved" : "rejected"
      }`
    );
    setSelectedDeclaration(null);
    setReviewNote("");
  };

  // Status badge component
  const getStatusBadge = (status: Declaration["status"]) => {
    switch (status) {
      case "Approved":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            Rejected
          </span>
        );
      case "Under Review":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
            Under Review
          </span>
        );
      case "Pending":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Declaration Review
        </h1>
        <p className="text-gray-600">
          Review and process tax declarations submitted by banks
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-4 px-1 ${
              activeTab === "pending"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending Review
          </button>
          <button
            onClick={() => setActiveTab("reviewed")}
            className={`pb-4 px-1 ${
              activeTab === "reviewed"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviewed Declarations
          </button>
        </div>
      </div>

      {/* Filters and Search */}
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
              onClick={() => setFilterStatus("under review")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "under review"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Under Review
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "approved"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-3 py-1 text-sm rounded-r-md ${
                filterStatus === "rejected"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Rejected
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID or Bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
            Search
          </button>
        </div>
      </div>

      {/* Declaration List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Declaration ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submission Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeclarations.map((declaration) => (
                <tr key={declaration.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-primary">
                    {declaration.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {declaration.bankName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {declaration.period}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(declaration.submissionDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(declaration.totalAmount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatCurrency(declaration.taxAmount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(declaration.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedDeclaration(declaration.id)}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Declaration Detail View (appears when reviewing a declaration) */}
      {selectedDeclaration && declarationDetails[selectedDeclaration] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-bold text-primary">
                Declaration Review: {selectedDeclaration}
              </h2>
              <button
                onClick={() => setSelectedDeclaration(null)}
                className="text-gray-400 hover:text-gray-600"
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
            </div>

            <div className="p-4">
              {/* Declaration Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Bank</p>
                  <p className="font-medium">
                    {declarationDetails[selectedDeclaration].bankName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Period</p>
                  <p className="font-medium">
                    {declarationDetails[selectedDeclaration].period}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Submission Date</p>
                  <p className="font-medium">
                    {formatDate(
                      declarationDetails[selectedDeclaration].submissionDate
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Due Date</p>
                  <p className="font-medium">
                    {formatDate(
                      declarationDetails[selectedDeclaration].dueDate
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Transactions</p>
                  <p className="font-medium">
                    {declarationDetails[
                      selectedDeclaration
                    ].transactionCount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium">
                    {getStatusBadge(
                      declarationDetails[selectedDeclaration].status
                    )}
                  </p>
                </div>
              </div>

              {/* Transaction Categories */}
              <h3 className="text-md font-medium text-gray-700 mb-3">
                Transaction Categories
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transactions
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tax Rate
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tax Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {declarationDetails[selectedDeclaration].categories.map(
                      (category, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {category.category}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {category.count.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {formatCurrency(category.amount)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {category.taxRate}%
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                            {formatCurrency(category.taxAmount)}
                          </td>
                        </tr>
                      )
                    )}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                        Total
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                        {declarationDetails[
                          selectedDeclaration
                        ].transactionCount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                        {formatCurrency(
                          declarationDetails[selectedDeclaration].totalAmount
                        )}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                        -
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-bold">
                        {formatCurrency(
                          declarationDetails[selectedDeclaration].taxAmount
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Review Form */}
              <h3 className="text-md font-medium text-gray-700 mb-3">
                Review Notes
              </h3>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Add your review notes here..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary mb-4 min-h-[120px]"
              ></textarea>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedDeclaration(null)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReviewSubmit("reject")}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-50 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleReviewSubmit("approve")}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclarationReview;
