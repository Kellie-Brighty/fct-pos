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
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600">
          Manage your profile and application preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          <button
            className={`mr-2 inline-block py-2 px-4 text-sm font-medium ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Information
          </button>
          <button
            className={`mr-2 inline-block py-2 px-4 text-sm font-medium ${
              activeTab === "notifications"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`mr-2 inline-block py-2 px-4 text-sm font-medium ${
              activeTab === "security"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-4">
            Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileForm.fullName}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={profileForm.position}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={profileForm.department}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Professional Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={profileForm.bio}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-4">
            Notification Preferences
          </h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">
              Notification Methods
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Email Notifications
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.email}
                    onChange={() => handleNotificationToggle("email")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    SMS Notifications
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.sms}
                    onChange={() => handleNotificationToggle("sms")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Browser Notifications
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.browser}
                    onChange={() => handleNotificationToggle("browser")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">
              Notification Events
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    New Declarations
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.declarations}
                    onChange={() => handleNotificationToggle("declarations")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Report Generation
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.reports}
                    onChange={() => handleNotificationToggle("reports")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">
                    Due Date Reminders
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled.reminders}
                    onChange={() => handleNotificationToggle("reminders")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-primary mb-4">
            Security Settings
          </h2>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition">
                  Update Password
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enhance your account security by enabling two-factor
              authentication. This will require an additional verification step
              when you log in.
            </p>

            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Enable Two-Factor Authentication
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Session Management
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You are currently logged in on this device. You can log out of all
              other devices if you suspect unauthorized access.
            </p>

            <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-50 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Log Out All Other Devices
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantSettings;
