import { useState } from "react";

interface Client {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive" | "Pending";
  lastActivity: string;
}

const ClientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Sample data for demonstration
  const clients: Client[] = [
    {
      id: "CLT001",
      name: "First Bank Nigeria PLC",
      type: "Commercial Bank",
      contactPerson: "John Adeyemi",
      email: "j.adeyemi@firstbanknigeria.com",
      phone: "+234 801 234 5678",
      address: "35 Marina Street, Lagos Island, Lagos",
      status: "Active",
      lastActivity: "2023-04-12",
    },
    {
      id: "CLT002",
      name: "Zenith Bank",
      type: "Commercial Bank",
      contactPerson: "Amina Ibrahim",
      email: "a.ibrahim@zenithbank.com",
      phone: "+234 802 345 6789",
      address: "Plot 84, Ajose Adeogun Street, Victoria Island, Lagos",
      status: "Active",
      lastActivity: "2023-04-10",
    },
    {
      id: "CLT003",
      name: "GTBank",
      type: "Commercial Bank",
      contactPerson: "Emmanuel Okonkwo",
      email: "e.okonkwo@gtbank.com",
      phone: "+234 803 456 7890",
      address: "635 Akin Adesola Street, Victoria Island, Lagos",
      status: "Active",
      lastActivity: "2023-04-08",
    },
    {
      id: "CLT004",
      name: "Sterling Bank",
      type: "Commercial Bank",
      contactPerson: "Sarah Johnson",
      email: "s.johnson@sterling.com",
      phone: "+234 804 567 8901",
      address: "20 Marina Street, Lagos Island, Lagos",
      status: "Inactive",
      lastActivity: "2023-03-15",
    },
    {
      id: "CLT005",
      name: "Wema Bank",
      type: "Commercial Bank",
      contactPerson: "Michael Adekunle",
      email: "m.adekunle@wemabank.com",
      phone: "+234 805 678 9012",
      address: "54 Broad Street, Lagos Island, Lagos",
      status: "Pending",
      lastActivity: "2023-04-05",
    },
  ];

  // Filter clients based on status and search
  const filteredClients = clients.filter((client) => {
    const statusMatch =
      filterStatus === "all" ||
      client.status.toLowerCase() === filterStatus.toLowerCase();

    const searchMatch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Status badge component
  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
            Inactive
          </span>
        );
      case "Pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
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
          Client Management
        </h1>
        <p className="text-gray-600">
          Manage and monitor your assigned bank clients
        </p>
      </div>

      {/* Filter and Search */}
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
              onClick={() => setFilterStatus("active")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "active"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("inactive")}
              className={`px-3 py-1 text-sm ${
                filterStatus === "inactive"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Inactive
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1 text-sm rounded-r-md ${
                filterStatus === "pending"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Pending
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto"
          />
          <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
            Search
          </button>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                        {client.name.substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary">
                          {client.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {client.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {client.contactPerson}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {client.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {client.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(client.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(client.lastActivity)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-primary-dark font-medium mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-2">
            Client Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Clients</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">9</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-2">
            Compliance Rate
          </h2>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Average</span>
              <span className="text-sm font-medium text-gray-800">87%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: "87%" }}
              ></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Top Performer</span>
              <span className="text-sm font-medium text-gray-800">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "98%" }}
              ></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Lowest Performer</span>
              <span className="text-sm font-medium text-gray-800">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-2">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-primary-light text-primary rounded-md hover:bg-primary hover:text-white transition">
              <span>Add New Client</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition">
              <span>Generate Report</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition">
              <span>Schedule Meeting</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
