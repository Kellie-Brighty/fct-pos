import { useState } from "react";

const GovernmentBanks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "pending" | "suspended">("all");

  // Mock data for banks
  const banks = [
    { 
      id: 1, 
      name: "First Bank Nigeria", 
      logo: "FB", 
      registrationDate: "2022-01-15", 
      status: "active", 
      compliance: "98%",
      posAgents: 15428,
      lastDeclaration: "2023-05-05",
      lastPayment: "2023-05-15",
      contactPerson: "John Okafor",
      email: "john.okafor@firstbanknigeria.com",
      phone: "+234 803 123 4567"
    },
    { 
      id: 2, 
      name: "GTBank", 
      logo: "GT", 
      registrationDate: "2022-01-20", 
      status: "active", 
      compliance: "95%",
      posAgents: 12756,
      lastDeclaration: "2023-05-04",
      lastPayment: "2023-05-14",
      contactPerson: "Sarah Adeyemi",
      email: "sarah.adeyemi@gtbank.com",
      phone: "+234 805 678 9012"
    },
    { 
      id: 3, 
      name: "UBA", 
      logo: "UBA", 
      registrationDate: "2022-02-05", 
      status: "active", 
      compliance: "92%",
      posAgents: 11254,
      lastDeclaration: "2023-05-03",
      lastPayment: "2023-05-13",
      contactPerson: "Michael Adebayo",
      email: "michael.adebayo@uba.com",
      phone: "+234 802 345 6789"
    },
    { 
      id: 4, 
      name: "Access Bank", 
      logo: "AB", 
      registrationDate: "2022-02-12", 
      status: "active", 
      compliance: "89%",
      posAgents: 10876,
      lastDeclaration: "2023-05-02",
      lastPayment: "2023-05-12",
      contactPerson: "Elizabeth Ojo",
      email: "elizabeth.ojo@accessbank.com",
      phone: "+234 804 567 8901"
    },
    { 
      id: 5, 
      name: "Zenith Bank", 
      logo: "ZB", 
      registrationDate: "2022-03-01", 
      status: "active", 
      compliance: "87%",
      posAgents: 9754,
      lastDeclaration: "2023-05-01",
      lastPayment: "2023-05-11",
      contactPerson: "David Okonkwo",
      email: "david.okonkwo@zenithbank.com",
      phone: "+234 806 789 0123"
    },
    { 
      id: 6, 
      name: "Sterling Bank", 
      logo: "SB", 
      registrationDate: "2022-03-15", 
      status: "active", 
      compliance: "81%",
      posAgents: 5628,
      lastDeclaration: "2023-04-30",
      lastPayment: "2023-05-10",
      contactPerson: "Florence Nnamdi",
      email: "florence.nnamdi@sterlingbank.com",
      phone: "+234 801 234 5678"
    },
    { 
      id: 7, 
      name: "Unity Bank", 
      logo: "UB", 
      registrationDate: "2022-04-02", 
      status: "pending", 
      compliance: "73%",
      posAgents: 3215,
      lastDeclaration: "2023-04-28",
      lastPayment: "2023-05-08",
      contactPerson: "Gabriel Okafor",
      email: "gabriel.okafor@unitybank.com",
      phone: "+234 803 456 7890"
    },
    { 
      id: 8, 
      name: "Fidelity Bank", 
      logo: "FD", 
      registrationDate: "2022-04-10", 
      status: "suspended", 
      compliance: "68%",
      posAgents: 2854,
      lastDeclaration: "2023-04-25",
      lastPayment: "2023-05-05",
      contactPerson: "Victoria Adebisi",
      email: "victoria.adebisi@fidelitybank.com",
      phone: "+234 805 678 9012"
    },
  ];

  // Filter banks based on search term and status
  const filteredBanks = banks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bank.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || bank.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Function to get status color class
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get compliance color class
  const getComplianceColorClass = (compliance: string) => {
    const value = parseInt(compliance.replace("%", ""));
    if (value >= 90) return "text-green-600";
    if (value >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const [selectedBank, setSelectedBank] = useState<number | null>(null);

  const handleViewDetails = (bankId: number) => {
    setSelectedBank(bankId === selectedBank ? null : bankId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-primary">Bank Management</h1>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search banks..."
              className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Bank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanks.map((bank) => (
          <div key={bank.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 flex-shrink-0 rounded-md bg-primary text-white flex items-center justify-center font-bold text-xl`}>
                  {bank.logo}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{bank.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColorClass(bank.status)}`}>
                      {bank.status.charAt(0).toUpperCase() + bank.status.slice(1)}
                    </span>
                    <span className={`ml-2 text-sm ${getComplianceColorClass(bank.compliance)}`}>
                      {bank.compliance} compliance
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>POS Agents:</span>
                  <span className="font-medium text-gray-900">{bank.posAgents.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Declaration:</span>
                  <span className="font-medium text-gray-900">{bank.lastDeclaration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Payment:</span>
                  <span className="font-medium text-gray-900">{bank.lastPayment}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => handleViewDetails(bank.id)}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  {selectedBank === bank.id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>

            {/* Expandable Details Section */}
            {selectedBank === bank.id && (
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Bank Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Date:</span>
                    <span className="text-gray-900">{bank.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact Person:</span>
                    <span className="text-gray-900">{bank.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{bank.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{bank.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="bg-primary text-white px-3 py-1.5 rounded text-sm hover:bg-primary-dark transition">
                    Message
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-300 transition">
                    View Transactions
                  </button>
                  {bank.status === "suspended" ? (
                    <button className="bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition">
                      Reinstate
                    </button>
                  ) : (
                    <button className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition">
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No banks found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Bank Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Total Banks</div>
            <div className="text-2xl font-bold text-primary">{banks.length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Active Banks</div>
            <div className="text-2xl font-bold text-green-600">{banks.filter(b => b.status === "active").length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Pending Banks</div>
            <div className="text-2xl font-bold text-yellow-600">{banks.filter(b => b.status === "pending").length}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-500">Suspended Banks</div>
            <div className="text-2xl font-bold text-red-600">{banks.filter(b => b.status === "suspended").length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentBanks; 