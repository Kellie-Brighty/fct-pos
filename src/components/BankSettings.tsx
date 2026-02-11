import { useState } from "react";

interface BankProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  rcNumber: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  taxId: string;
  accountNumber: string;
  bankName: string;
}

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

const BankSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security"
  >("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Sample profile data
  const [profile, setProfile] = useState<BankProfile>({
    name: "First Bank Nigeria PLC",
    email: "pos-support@firstbanknigeria.com",
    phone: "+234 801 234 5678",
    address: "35 Marina Street, Lagos Island, Lagos",
    rcNumber: "RC123456",
    contactPerson: "John Adeyemi",
    contactEmail: "j.adeyemi@firstbanknigeria.com",
    contactPhone: "+234 802 345 6789",
    taxId: "TIN12345678",
    accountNumber: "3011234567",
    bankName: "First Bank Nigeria",
  });

  // Sample notification settings
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "notify1",
      type: "Tax Declarations",
      description: "Notifications about pending and processed tax declarations",
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "notify2",
      type: "Payment Reminders",
      description: "Reminders for upcoming and overdue payments",
      email: true,
      sms: true,
      push: false,
    },
    {
      id: "notify3",
      type: "System Updates",
      description: "Updates about the FCT POS Taxation system",
      email: true,
      sms: false,
      push: false,
    },
    {
      id: "notify4",
      type: "Transaction Alerts",
      description: "High volume transaction alerts and reports",
      email: true,
      sms: false,
      push: true,
    },
  ]);

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, you would send the profile data to the server here
    alert("Profile information updated successfully!");
  };

  // Handle notification toggle
  const handleNotificationToggle = (
    id: string,
    channel: "email" | "sms" | "push"
  ) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, [channel]: !notification[channel] }
          : notification
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2 font-heading tracking-tighter text-glow">
          Institutional Control
        </h1>
        <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
          Corporate Identity • Network Protocols • Security Parameters
        </p>
      </div>

      <div className="mb-10 border-b border-white/5">
        <div className="flex space-x-8">
          {["profile", "notifications", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative ${
                activeTab === tab ? "text-primary-light" : "text-white/80 hover:text-white/80"
              }`}
            >
              {tab === "profile" ? "Bank Profile" : tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(0,109,53,0.5)]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em]">
              Corporate Manifest
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-[10px] font-black text-primary-light hover:text-white uppercase tracking-widest flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modify Specification
              </button>
            )}
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Institution Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">RC Registry ID</label>
                <input
                  type="text"
                  value={profile.rcNumber}
                  onChange={(e) => setProfile({ ...profile, rcNumber: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Support Endpoint</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Comms Protocol</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Geospatial Coordinate (Address)</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Taxation Index (TIN)</label>
                <input
                  type="text"
                  value={profile.taxId}
                  onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Settlement Node</label>
                <input
                  type="text"
                  value={profile.accountNumber}
                  onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
            </div>

            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-8 border-b border-white/5 pb-4">
              Liaison Protocol Officer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Identity</label>
                <input
                  type="text"
                  value={profile.contactPerson}
                  onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Liaison Endpoint</label>
                <input
                  type="email"
                  value={profile.contactEmail}
                  onChange={(e) => setProfile({ ...profile, contactEmail: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Direct Comms</label>
                <input
                  type="text"
                  value={profile.contactPhone}
                  onChange={(e) => setProfile({ ...profile, contactPhone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-10 py-4 text-[10px] font-black text-white/80 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black"
                >
                  Commit Changes
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10">
            Comm Protocol Preferences
          </h2>
          <p className="text-xs font-medium text-white/80 leading-relaxed max-w-lg mb-10">
            Configure how you would like to receive notifications and alerts
            from the FCT POS Taxation system.
          </p>

          <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-white/5">
              <thead>
                <tr>
                  <th className="px-4 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">Type</th>
                  <th className="px-4 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">Email</th>
                  <th className="px-4 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">SMS</th>
                  <th className="px-4 py-6 text-left text-[10px] font-black text-white/80 uppercase tracking-widest">Push</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {notifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-4 py-6">
                      <div className="text-xs font-bold text-white uppercase group-hover:text-primary-light transition-colors">
                        {notification.type}
                      </div>
                      <div className="text-[10px] text-white/80 mt-1 uppercase tracking-wider font-medium">
                        {notification.description}
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notification.email}
                          onChange={() => handleNotificationToggle(notification.id, "email")}
                        />
                        <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white"></div>
                      </label>
                    </td>
                    <td className="px-4 py-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notification.sms}
                          onChange={() => handleNotificationToggle(notification.id, "sms")}
                        />
                        <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white"></div>
                      </label>
                    </td>
                    <td className="px-4 py-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notification.push}
                          onChange={() => handleNotificationToggle(notification.id, "push")}
                        />
                        <div className="w-10 h-5 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:bg-white"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 bg-white/5 border border-white/10 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
              />
              <span className="text-[10px] font-black text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                Receive daily institutional digest synthesis
              </span>
            </label>
            <button className="btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black w-full md:w-auto">
              Update Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2rem] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-10">
            Security Protocol
          </h2>

          <div className="mb-12">
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-8">Access Cipher Shift</h3>
            <form className="space-y-6 max-w-md">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Current Cipher</label>
                <input
                  type="password"
                  placeholder="Enter current token"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">New Cipher</label>
                <input
                  type="password"
                  placeholder="Enter new token"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                />
                <p className="text-[9px] font-black text-white/80 uppercase tracking-widest pl-1">
                  Complexity Requirements: 8+ Chars • Numeric • Symbolic
                </p>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-white/80 uppercase tracking-widest pl-1">Confirm Cipher</label>
                <input
                  type="password"
                  placeholder="Re-enter new token"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                />
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  className="btn-primary w-full py-4 text-[10px] tracking-widest uppercase font-black"
                >
                  Update Cipher Protocol
                </button>
              </div>
            </form>
          </div>

          <div className="mb-12 pt-10 border-t border-white/5">
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-6">Multi-Factor Authentication</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 px-8 bg-primary/5 border border-primary/10 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#006D3511,transparent)] pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Cryptographic Identity Layer</p>
                <p className="text-xs font-medium text-white/80 leading-relaxed max-w-sm uppercase tracking-wider">
                  Enhance institutional security by enabling secondary verification.
                </p>
              </div>
              <button
                type="button"
                className="relative z-10 btn-primary px-10 py-4 text-[10px] tracking-widest uppercase font-black"
              >
                Activate MFA
              </button>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5">
            <h3 className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-6">Active Node Synthesis</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 px-8 bg-white/2 border border-white/5 rounded-3xl">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Endpoint Connectivity</p>
                <p className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  You are currently active on <span className="text-white font-bold">2 endpoints</span>.
                </p>
              </div>
              <button
                type="button"
                className="text-[10px] font-black text-accent-red hover:text-white uppercase tracking-widest transition-colors"
              >
                Terminate Other Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSettings;
