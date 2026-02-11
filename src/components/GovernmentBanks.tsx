import { useState } from "react";
import { Select } from "antd";

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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1 uppercase">
            BANK <span className="text-primary-light">REGISTRY</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Institutional Compliance & Node Management
            </p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
          <div className="relative group/search">
            <input
              type="text"
              placeholder="Filter nodes..."
              className="bg-white/2 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-80 transition-all group-hover/search:bg-white/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80 group-hover/search:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 glass-card bg-white/2 border-white/5 p-1 rounded-2xl">
            <Select
              className="w-48 text-white min-h-[48px]"
              popupClassName="ant-select-dropdown"
              value={filterStatus}
              bordered={false}
              onChange={(value) => setFilterStatus(value)}
              options={[
                { value: "all", label: "All Protocols" },
                { value: "active", label: "Active Status" },
                { value: "pending", label: "Pending Audit" },
                { value: "suspended", label: "Protocol Halt" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBanks.map((bank) => (
          <div key={bank.id} className="glass-card border-white/5 bg-white/2 hover:border-white/10 transition-all group rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between p-8">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/2 blur-[80px] rounded-full group-hover:bg-white/5 transition-all"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black text-2xl shadow-[0_0_20px_rgba(0,109,53,0.2)]">
                  {bank.logo}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-black text-white tracking-tighter mb-2 group-hover:text-primary-light transition-colors">{bank.name}</h3>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-[8px] font-black tracking-widest uppercase rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.1)] 
                      ${bank.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' : 
                        bank.status === 'pending' ? 'bg-accent-gold/10 text-accent-gold border-accent-gold/20' : 
                        'bg-accent-red/10 text-accent-red border-accent-red/20'}`}
                    >
                      {bank.status}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${getComplianceColorClass(bank.compliance)}`}>
                      {bank.compliance} RECON
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center group/item p-4 rounded-[1.5rem] bg-white/1 overflow-hidden transition-all hover:bg-white/2">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Active Nodes</span>
                  <span className="text-xs font-black text-white tabular-nums tracking-tighter">{bank.posAgents.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center group/item p-4 rounded-[1.5rem] bg-white/1 overflow-hidden transition-all hover:bg-white/2">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Last Manifest</span>
                  <span className="text-xs font-black text-white opacity-60 italic">{bank.lastDeclaration}</span>
                </div>
                <div className="flex justify-between items-center group/item p-4 rounded-[1.5rem] bg-white/1 overflow-hidden transition-all hover:bg-white/2">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Settlement Hub</span>
                  <span className="text-xs font-black text-white opacity-60 italic">{bank.lastPayment}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/5 flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => handleViewDetails(bank.id)}
                  className="text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-all"
                >
                  {selectedBank === bank.id ? "Minimize Sequence" : "Analyze Node"}
                </button>
                <div className="flex space-x-4">
                    <button className="text-[10px] font-black text-primary hover:text-white uppercase tracking-widest transition-all">Relay</button>
                    <button className="text-[10px] font-black text-accent-red/40 hover:text-accent-red uppercase tracking-widest transition-all">Halt</button>
                </div>
              </div>
            </div>

            {/* Expandable Details Section */}
            {selectedBank === bank.id && (
              <div className="mt-8 p-6 bg-white/2 border border-white/5 rounded-[2rem] animate-in slide-in-from-top-4 duration-500">
                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Node Identity Protocol</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Commissioned</span>
                    <span className="text-[10px] font-black text-white/80 tracking-widest">{bank.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Controller</span>
                    <span className="text-[10px] font-black text-white/80 tracking-widest">{bank.contactPerson}</span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-[8px] font-black text-white/10 uppercase tracking-widest mb-1">Communication Channel</span>
                    <span className="text-[10px] font-black text-primary-light/60 truncate tracking-tighter">{bank.email}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBanks.length === 0 && (
        <div className="glass-card rounded-[2.5rem] p-20 text-center border-white/5 bg-white/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-white/10 mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-black text-white tracking-tighter mb-4 uppercase">NO NODES DETECTED</h3>
          <p className="text-[10px] text-white/80 font-black uppercase tracking-widest max-w-xs mx-auto">
            The current search parameters have returned zero matches in the secure registry.
          </p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="glass-card border-white/5 bg-white/2 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-700"></div>
        <h3 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10 relative z-10">INSTITUTIONAL METRICS</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {[
            { label: "Total Institutional Nodes", val: banks.length, color: "white" },
            { label: "Active Connections", val: banks.filter(b => b.status === "active").length, color: "primary" },
            { label: "Pending Validation", val: banks.filter(b => b.status === "pending").length, color: "accent-gold" },
            { label: "Protocol Halts", val: banks.filter(b => b.status === "suspended").length, color: "accent-red" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/2 border border-white/5 p-8 rounded-[2rem] hover:bg-white/5 transition-all">
              <div className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-4 leading-relaxed">{stat.label}</div>
              <div className={`text-4xl font-black text-${stat.color === 'primary' ? 'primary' : stat.color === 'accent-gold' ? 'accent-gold' : stat.color === 'accent-red' ? 'accent-red' : 'white'} tracking-tighter tabular-nums`}>
                {stat.val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernmentBanks;
 