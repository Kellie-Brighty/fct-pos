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



  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1 uppercase">
            INSTITUTION <span className="text-primary-light">PORTFOLIO</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Portfolio Intelligence & Governance
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-white/80 uppercase tracking-widest block pl-1">Status Filter</label>
          <div className="flex bg-white/2 p-1.5 rounded-2xl border border-white/5 overflow-hidden glass-card">
            {["all", "active", "inactive", "pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                  filterStatus === status ? "bg-primary text-white shadow-2xl shadow-primary/40" : "text-white/80 hover:text-white/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-end gap-4 w-full md:w-auto">
          <div className="w-full sm:w-80 group">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-3.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-black uppercase tracking-widest placeholder:text-white/10"
            />
          </div>
          <button className="btn-primary px-10 py-3.5 text-[10px] tracking-widest uppercase font-black">
            Search
          </button>
        </div>
      </div>

      {/* Client Table */}
      <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] overflow-hidden mb-8 w-full">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full divide-y divide-white/5 table-auto">
            <thead>
              <tr className="bg-white/2">
                <th className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Bank Info</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Contact Person</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Email & Comms</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Status</th>
                <th className="px-10 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                        <span className="text-xs font-black text-primary-light uppercase">{client.name.substring(0, 2)}</span>
                      </div>
                      <div>
                        <p className="text-xs font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest mb-1">{client.name}</p>
                        <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">{client.type} • {client.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap text-xs font-black text-white/80 uppercase tracking-widest group-hover:text-white transition-colors text-ellipsis overflow-hidden">
                    {client.contactPerson}
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <p className="text-xs font-black text-white/80 tracking-widest mb-1">{client.email}</p>
                    <p className="text-[9px] font-black text-white/80 tracking-widest uppercase">{client.phone}</p>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                        client.status === "Active"
                          ? "bg-primary/10 text-primary-light border-primary/20"
                          : client.status === "Inactive"
                          ? "bg-accent-red/10 text-accent-red border-accent-red/20"
                          : "bg-accent-gold/10 text-accent-gold border-accent-gold/20"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex space-x-6">
                      <button className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest transition-colors">Audit</button>
                      <button className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-colors">Contact</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div className="glass-card p-10 border-white/5 bg-white/2 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all"></div>
          <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">
            Portfolio Overview
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Total Banks</p>
              <p className="text-3xl font-black text-white tracking-tighter tabular-nums">12</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Active</p>
              <p className="text-3xl font-black text-primary-light tracking-tighter tabular-nums">9</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Inactive</p>
              <p className="text-3xl font-black text-accent-red tracking-tighter tabular-nums">2</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">Pending</p>
              <p className="text-3xl font-black text-accent-gold tracking-tighter tabular-nums">1</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-10 border-white/5 bg-white/2 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all"></div>
          <h2 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">
            Compliance Index
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Global Average</span>
                <span className="text-xs font-black text-white tracking-tighter tabular-nums">87%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(0,109,53,0.5)]" style={{ width: "87%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Top Performance</span>
                <span className="text-xs font-black text-white tracking-tighter tabular-nums">98%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div className="bg-primary-light h-full rounded-full shadow-[0_0_10px_rgba(0,134,255,0.5)]" style={{ width: "98%" }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientManagement;
