import { useState } from "react";
import BoldModal from "./BoldModal";

const GovernmentSettings = () => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security"
  >("profile");

  const [profileForm, setProfileForm] = useState({
    fullName: "Ibrahim Mohammed",
    email: "ibrahim.mohammed@fct-irs.gov.ng",
    phone: "+234 803 456 7890",
    position: "Senior Administrator",
    department: "Revenue Service",
    office: "FCT Internal Revenue Service, FCT",
    bio: "Government administrator overseeing POS taxation system for FCT.",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    sms: false,
    browser: true,
    bankDeclarations: true,
    bankPayments: true,
    systemAlerts: true,
    complianceIssues: true,
    monthlyReports: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (title: string, message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleNotificationToggle = (
    setting: keyof typeof notificationsEnabled
  ) => {
    setNotificationsEnabled({
      ...notificationsEnabled,
      [setting]: !notificationsEnabled[setting],
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    showAlert("Profile Updated", "Your administrative identity profile has been successfully synchronized with the core system.", "success");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    showAlert("Preferences Saved", "Your transmission channel and intelligence directive preferences have been updated.", "success");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation for password change
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showAlert("Verification Error", "The provided ciphers do not match. Please re-verify your new credential.", "error");
      return;
    }
    if (passwordForm.newPassword && passwordForm.newPassword.length < 8) {
      showAlert("Security Threshold", "Your new cipher must meet the minimum complexity requirement of 8 characters.", "warning");
      return;
    }
    // In a real app, this would send data to an API
    showAlert("Security Hardened", "Your access credentials have been successfully rotated and encrypted.", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 group">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pl-1">
            CORE <span className="text-primary-light">CONFIGURATION</span>
          </h1>
          <div className="flex items-center space-x-4">
            <span className="w-12 h-px bg-primary/40"></span>
            <p className="text-[10px] text-white/80 font-black uppercase tracking-[0.4em]">
              Security & Access Management Protocol
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card border-white/5 bg-white/2 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/5 bg-white/2">
          {[
            { id: "profile", label: "Identity Profile", icon: "👤" },
            { id: "notifications", label: "Latency Feed", icon: "🔔" },
            { id: "security", label: "Security Protocol", icon: "🛡️" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5 shadow-[inset_0_-2px_0_0_rgba(0,109,53,1)]"
                  : "text-white/80 hover:text-white/80 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="mr-3 opacity-40 group-hover:opacity-100 transition-opacity">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-10">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <form
              onSubmit={handleSaveProfile}
              className="animate-in slide-in-from-bottom-4 duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    id: "fullName",
                    label: "Full Name",
                    val: profileForm.fullName,
                  },
                  {
                    id: "email",
                    label: "Official Email",
                    val: profileForm.email,
                    type: "email",
                  },
                  {
                    id: "phone",
                    label: "Secure Contact",
                    val: profileForm.phone,
                  },
                  {
                    id: "position",
                    label: "Clearance Level",
                    val: profileForm.position,
                  },
                  {
                    id: "department",
                    label: "Agency Division",
                    val: profileForm.department,
                  },
                  {
                    id: "office",
                    label: "Physical Station",
                    val: profileForm.office,
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2 ml-1"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      id={field.id}
                      name={field.id}
                      value={field.val}
                      onChange={handleProfileChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2 ml-1"
                  >
                    Operational Brief
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button
                  type="submit"
                  className="btn-primary px-10 py-4 text-[10px] font-black uppercase tracking-widest shadow-2xl"
                >
                  Synchronize Profile
                </button>
              </div>
            </form>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <form
              onSubmit={handleSaveNotifications}
              className="animate-in slide-in-from-bottom-4 duration-500 space-y-10"
            >
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                  Transmission Channels
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      id: "email",
                      label: "Email Relay",
                      sub: "Priority alerts to inbox",
                    },
                    {
                      id: "sms",
                      label: "SMS Burst",
                      sub: "Critical status updates",
                    },
                    {
                      id: "browser",
                      label: "Direct Feed",
                      sub: "Live desktop notifications",
                    },
                  ].map((ch) => (
                    <div
                      key={ch.id}
                      className="glass-card p-6 border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {ch.label}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={(notificationsEnabled as any)[ch.id]}
                            onChange={() =>
                              handleNotificationToggle(ch.id as any)
                            }
                          />
                          <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white"></div>
                        </label>
                      </div>
                      <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">
                        {ch.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mr-3"></span>
                  Intelligent Directives
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "bankDeclarations",
                      label: "Agency Declarations",
                      desc: "Automated logs for all participating bank nodes",
                    },
                    {
                      id: "bankPayments",
                      label: "Settlement Confirmations",
                      desc: "Finalized revenue transfer acknowledgments",
                    },
                    {
                      id: "systemAlerts",
                      label: "Core System Pulse",
                      desc: "Critical platform health and latency reports",
                    },
                    {
                      id: "complianceIssues",
                      label: "Regulatory Deviations",
                      desc: "Real-time alerts for bank compliance breaches",
                    },
                    {
                      id: "monthlyReports",
                      label: "Intelligence Summaries",
                      desc: "Comprehensive fiscal period performance logs",
                    },
                  ].map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center justify-between p-5 bg-white/2 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white/80 uppercase group-hover:text-white transition-colors">
                          {type.label}
                        </h4>
                        <p className="text-[10px] font-bold text-white/80 uppercase mt-1">
                          {type.desc}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={(notificationsEnabled as any)[type.id]}
                          onChange={() =>
                            handleNotificationToggle(type.id as any)
                          }
                        />
                        <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-transparent after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-high peer-checked:after:bg-white"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button type="submit" className="btn-primary">
                  Confirm Directives
                </button>
              </div>
            </form>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <form
              onSubmit={handleSaveSecurity}
              className="animate-in slide-in-from-bottom-4 duration-500 space-y-8"
            >
              <div className="glass-card p-8 border-white/5 group">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-8 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mr-3 shadow-[0_0_8px_rgba(255,90,90,0.5)]"></span>
                  Access Credential Rotation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      id: "currentPassword",
                      label: "Active Cipher",
                      type: "password",
                      val: passwordForm.currentPassword,
                    },
                    {
                      id: "newPassword",
                      label: "New Cipher",
                      type: "password",
                      val: passwordForm.newPassword,
                    },
                    {
                      id: "confirmPassword",
                      label: "Re-verify Cipher",
                      type: "password",
                      val: passwordForm.confirmPassword,
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-[10px] font-bold text-white/80 uppercase tracking-widest mb-2"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={field.val}
                        onChange={handlePasswordChange}
                        className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
                        placeholder="••••••••"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8 border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-[10px] font-bold text-white/30 uppercase mt-1">
                        Multi-Stage Authorization Protocol
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer scale-110">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white/40 after:border-transparent after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary-high peer-checked:after:bg-white"></div>
                  </label>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-2xl animate-in zoom-in-95 duration-300">
                    <p className="text-[10px] font-bold text-primary-high uppercase tracking-widest flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Protocol Online: SMS Gateway Configured
                    </p>
                  </div>
                )}
              </div>

              <div className="glass-card p-8 border-white/5">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-8">
                  Active Sessions Relay
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      device: "Chrome / Windows 11",
                      loc: "FCT HQ",
                      status: "STATION 01",
                      current: true,
                    },
                    {
                      device: "Mobile App / iOS",
                      loc: "Maitama District",
                      status: "STATION 04",
                      current: false,
                    },
                  ].map((session, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white/2 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            session.current
                              ? "bg-primary shadow-[0_0_8px_rgba(0,109,53,1)]"
                              : "bg-white/10"
                          }`}
                        ></div>
                        <div>
                          <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
                            {session.device}
                          </p>
                          <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest mt-0.5">
                            {session.loc} • {session.status}
                          </p>
                        </div>
                      </div>
                      <button
                        className={`text-[10px] font-black tracking-widest uppercase ${
                          session.current
                            ? "text-primary/40 cursor-default"
                            : "text-accent-red hover:underline"
                        }`}
                      >
                        {session.current ? "CURRENT" : "TERMINATE"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" className="btn-primary">
                  Update Security Profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <BoldModal
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default GovernmentSettings;
