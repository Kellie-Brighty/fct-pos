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
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8 whitespace-nowrap">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 px-1 ${
              activeTab === "profile"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Bank Profile
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`pb-4 px-1 ${
              activeTab === "notifications"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`pb-4 px-1 ${
              activeTab === "security"
                ? "border-b-2 border-primary text-primary font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Security
          </button>
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-primary">
              Bank Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary hover:text-primary-dark font-medium text-sm flex items-center"
              >
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="rcNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  RC Number
                </label>
                <input
                  type="text"
                  id="rcNumber"
                  value={profile.rcNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, rcNumber: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
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
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
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
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="taxId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tax ID
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={profile.taxId}
                  onChange={(e) =>
                    setProfile({ ...profile, taxId: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Settlement Account
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={profile.accountNumber}
                  onChange={(e) =>
                    setProfile({ ...profile, accountNumber: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
            </div>

            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
              Primary Contact Person
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="contactPerson"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  value={profile.contactPerson}
                  onChange={(e) =>
                    setProfile({ ...profile, contactPerson: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={profile.contactEmail}
                  onChange={(e) =>
                    setProfile({ ...profile, contactEmail: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  value={profile.contactPhone}
                  onChange={(e) =>
                    setProfile({ ...profile, contactPhone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary ${
                    !isEditing && "bg-gray-50"
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg font-medium text-primary mb-4">
            Notification Preferences
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Configure how you would like to receive notifications and alerts
            from the FCT POS Taxation system.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Notification Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SMS
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Push Notification
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {notification.type}
                      </div>
                      <div className="text-sm text-gray-500">
                        {notification.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                          checked={notification.email}
                          onChange={() =>
                            handleNotificationToggle(notification.id, "email")
                          }
                        />
                      </label>
                    </td>
                    <td className="px-4 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                          checked={notification.sms}
                          onChange={() =>
                            handleNotificationToggle(notification.id, "sms")
                          }
                        />
                      </label>
                    </td>
                    <td className="px-4 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                          checked={notification.push}
                          onChange={() =>
                            handleNotificationToggle(notification.id, "push")
                          }
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="emailDigest"
                  name="emailDigest"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="emailDigest"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Receive daily email digest instead of individual emails
                </label>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg font-medium text-primary mb-4">
            Security Settings
          </h2>

          <div className="mb-8">
            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
              Change Password
            </h3>
            <form className="space-y-4">
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
                  placeholder="Enter your current password"
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
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters and include a number
                  and special character.
                </p>
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
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary-dark transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <div className="mb-8">
            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
              Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Enable Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <div className="ml-4">
                <button
                  type="button"
                  className="border border-gray-300 bg-white text-primary font-medium px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition"
                >
                  Setup 2FA
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
              Login Sessions
            </h3>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Active Sessions
                </p>
                <p className="text-sm text-gray-500">
                  You are currently logged in on 2 devices.
                </p>
              </div>
              <div className="ml-4">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Logout from all devices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSettings;
