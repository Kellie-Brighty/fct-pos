import { useState } from "react";

const ConsultantSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security"
  >("profile");
  const [profileForm, setProfileForm] = useState({
    fullName: "John Adeyemi",
    email: "consultant@example.com",
    phone: "+234 801 234 5678",
    position: "Senior Tax Consultant",
    department: "Corporate Tax Division",
    bio: "Experienced tax professional with over 10 years specializing in financial services taxation.",
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    sms: false,
    browser: true,
    declarations: true,
    reports: true,
    reminders: false,
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleNotificationToggle = (key: string) => {
    setNotificationsEnabled({
      ...notificationsEnabled,
      [key]: !notificationsEnabled[key as keyof typeof notificationsEnabled],
    });
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1 uppercase">
            ACCOUNT <span className="text-primary-light">SETTINGS</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Manage Profile & Security
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-8 border-b border-white/5 mb-10 pl-1">
        {["profile", "notifications", "security"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
              activeTab === tab 
                ? "text-primary-light" 
                : "text-white/10 hover:text-white/80"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_20px_rgba(0,109,53,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-10 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-12">
            Identity Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Legal Name</label>
              <input
                type="text"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Job Title</label>
              <input
                type="text"
                name="position"
                value={profileForm.position}
                onChange={handleProfileChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="mb-12 space-y-4">
            <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Professional Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={profileForm.bio}
              onChange={handleProfileChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button className="btn-primary px-12 py-4 text-[10px] tracking-widest uppercase font-black">
              Commit Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-10 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-12">
            Notification Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-8 ml-1">Transmission Channels</h3>
              <div className="space-y-6">
                {[
                  { label: "Email Notifications", key: "email" },
                  { label: "SMS Alerts", key: "sms" },
                  { label: "Browser Notifications", key: "browser" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                    <span className="text-[10px] font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationsEnabled[item.key as keyof typeof notificationsEnabled]}
                        onChange={() => handleNotificationToggle(item.key)}
                      />
                      <div className="w-12 h-6 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6 peer-checked:after:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-8 ml-1">Data Events</h3>
              <div className="space-y-6">
                {[
                  { label: "New Tax Filings", key: "declarations" },
                  { label: "Report Completions", key: "reports" },
                  { label: "System Deadlines", key: "reminders" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                    <span className="text-[10px] font-black text-white/80 group-hover:text-white transition-colors uppercase tracking-widest">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationsEnabled[item.key as keyof typeof notificationsEnabled]}
                        onChange={() => handleNotificationToggle(item.key)}
                      />
                      <div className="w-12 h-6 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-primary transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6 peer-checked:after:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-12">
            <button className="btn-primary px-12 py-4 text-[10px] tracking-widest uppercase font-black">
              Update Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="glass-card border-white/5 bg-white/2 shadow-2xl rounded-[2.5rem] p-10 md:p-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-sm font-black text-white/80 uppercase tracking-[0.3em] mb-12">
            Security Settings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-8 ml-1">Access Synthesis</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-white/80 uppercase tracking-[0.2em] pl-1">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black text-white tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>

                  <button className="btn-primary w-full py-5 text-[10px] tracking-widest uppercase font-black">
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="p-8 bg-white/2 border border-white/5 rounded-[2rem] group hover:bg-white/5 transition-all">
                <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-4">Multi-Factor Authentication</h3>
                <p className="text-[10px] font-black text-white/80 uppercase leading-relaxed tracking-widest mb-8">
                  Bolster institution security with cryptographic MFA.
                </p>
                <button className="flex items-center space-x-4 px-8 py-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary-light hover:bg-primary/20 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Enable MFA</span>
                </button>
              </div>

              <div className="p-8 bg-white/2 border border-white/5 rounded-[2rem] group hover:bg-white/5 transition-all">
                <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-4">Session Management</h3>
                <p className="text-[10px] font-black text-white/80 uppercase leading-relaxed tracking-widest mb-8">
                  Sign out from other devices and browsers.
                </p>
                <button className="flex items-center space-x-4 px-8 py-4 bg-accent-red/5 border border-accent-red/10 rounded-2xl text-accent-red hover:bg-accent-red/10 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-accent-red/10 flex items-center justify-center group-hover:bg-accent-red/20 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Sign Out All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantSettings;
