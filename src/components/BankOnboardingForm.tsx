import { useState } from "react";
import { BankOnboardingData } from "../types";

interface BankOnboardingFormProps {
  onSubmit: (data: BankOnboardingData) => void;
}

const BankOnboardingForm = ({ onSubmit }: BankOnboardingFormProps) => {
  const [formData, setFormData] = useState<BankOnboardingData>({
    bankName: "",
    branchAddresses: "",
    taxIdNumber: "",
    cacRegNumber: "",
    mdName: "",
    mdPhoneNumber: "",
    hqAddress: "",
    officialEmail: "",
    password: "",
    confirmPassword: "",
    posAgentsCount: 0,
    yearsOfOperation: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["posAgentsCount", "yearsOfOperation"].includes(name)
        ? parseInt(value) || 0
        : value,
    });
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.bankName.trim()) {
        newErrors.bankName = "Bank name is required";
      }

      if (!formData.branchAddresses.trim()) {
        newErrors.branchAddresses = "Branch addresses are required";
      }

      if (!formData.taxIdNumber.trim()) {
        newErrors.taxIdNumber = "Tax ID number is required";
      }

      if (!formData.cacRegNumber.trim()) {
        newErrors.cacRegNumber = "CAC registration number is required";
      }
    } else if (stepNumber === 2) {
      if (!formData.mdName.trim()) {
        newErrors.mdName = "Managing Director name is required";
      }

      if (!formData.mdPhoneNumber.trim()) {
        newErrors.mdPhoneNumber = "Phone number is required";
      } else if (!/^\+?\d{10,15}$/.test(formData.mdPhoneNumber)) {
        newErrors.mdPhoneNumber = "Please enter a valid phone number";
      }

      if (!formData.hqAddress.trim()) {
        newErrors.hqAddress = "Headquarters address is required";
      }

      if (!formData.officialEmail.trim()) {
        newErrors.officialEmail = "Official email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail)) {
        newErrors.officialEmail = "Please enter a valid email address";
      }
    } else if (stepNumber === 3) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (formData.posAgentsCount <= 0) {
        newErrors.posAgentsCount =
          "Number of POS agents must be greater than zero";
      }

      if (formData.yearsOfOperation <= 0) {
        newErrors.yearsOfOperation =
          "Years of operation must be greater than zero";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 font-heading">
        Bank Onboarding
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your bank's information to register for the FCT POS
        Taxation System.
      </p>

      {/* Progress Indicator */}
      <div className="mb-8 overflow-x-hidden">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  step > index + 1
                    ? "bg-primary text-white"
                    : step === index + 1
                    ? "bg-primary-light text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 w-12 sm:w-16 md:w-28 lg:w-40 ${
                    step > index + 1 ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs md:text-sm">
          <span className="font-medium">Bank Details</span>
          <span className="font-medium">Contact Info</span>
          <span className="font-medium">Account Setup</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Bank Details */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="bankName"
                className="block text-gray-700 mb-2 font-medium"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.bankName ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter your bank's official name"
              />
              {errors.bankName && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.bankName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="branchAddresses"
                className="block text-gray-700 mb-2 font-medium"
              >
                Branch Addresses within FCT
              </label>
              <textarea
                id="branchAddresses"
                name="branchAddresses"
                value={formData.branchAddresses}
                onChange={handleChange}
                rows={3}
                className={`w-full p-3 border rounded-md ${
                  errors.branchAddresses
                    ? "border-accent-red"
                    : "border-gray-300"
                }`}
                placeholder="List all branch addresses in FCT (one per line)"
              ></textarea>
              {errors.branchAddresses && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.branchAddresses}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="taxIdNumber"
                className="block text-gray-700 mb-2 font-medium"
              >
                Tax ID Number
              </label>
              <input
                type="text"
                id="taxIdNumber"
                name="taxIdNumber"
                value={formData.taxIdNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.taxIdNumber ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter your bank's tax ID number"
              />
              {errors.taxIdNumber && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.taxIdNumber}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="cacRegNumber"
                className="block text-gray-700 mb-2 font-medium"
              >
                CAC Registration Number
              </label>
              <input
                type="text"
                id="cacRegNumber"
                name="cacRegNumber"
                value={formData.cacRegNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.cacRegNumber ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter your CAC registration number"
              />
              {errors.cacRegNumber && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.cacRegNumber}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="mdName"
                className="block text-gray-700 mb-2 font-medium"
              >
                Managing Director's Name
              </label>
              <input
                type="text"
                id="mdName"
                name="mdName"
                value={formData.mdName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.mdName ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter MD's full name"
              />
              {errors.mdName && (
                <p className="text-accent-red text-sm mt-1">{errors.mdName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="mdPhoneNumber"
                className="block text-gray-700 mb-2 font-medium"
              >
                MD's Phone Number
              </label>
              <input
                type="text"
                id="mdPhoneNumber"
                name="mdPhoneNumber"
                value={formData.mdPhoneNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.mdPhoneNumber ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter MD's phone number"
              />
              {errors.mdPhoneNumber && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.mdPhoneNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="hqAddress"
                className="block text-gray-700 mb-2 font-medium"
              >
                Headquarters Address
              </label>
              <textarea
                id="hqAddress"
                name="hqAddress"
                value={formData.hqAddress}
                onChange={handleChange}
                rows={2}
                className={`w-full p-3 border rounded-md ${
                  errors.hqAddress ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter your headquarters address"
              ></textarea>
              {errors.hqAddress && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.hqAddress}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="officialEmail"
                className="block text-gray-700 mb-2 font-medium"
              >
                Official Email
              </label>
              <input
                type="email"
                id="officialEmail"
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.officialEmail ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter your bank's official email"
              />
              {errors.officialEmail && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.officialEmail}
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Account Setup */}
        {step === 3 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 mb-2 font-medium"
              >
                Create Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.password ? "border-accent-red" : "border-gray-300"
                }`}
                placeholder="Enter a secure password"
              />
              {errors.password && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-2 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.confirmPassword
                    ? "border-accent-red"
                    : "border-gray-300"
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-accent-red text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="posAgentsCount"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Number of POS Agents
                </label>
                <input
                  type="number"
                  id="posAgentsCount"
                  name="posAgentsCount"
                  value={formData.posAgentsCount || ""}
                  onChange={handleChange}
                  min="1"
                  className={`w-full p-3 border rounded-md ${
                    errors.posAgentsCount
                      ? "border-accent-red"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter number of agents"
                />
                {errors.posAgentsCount && (
                  <p className="text-accent-red text-sm mt-1">
                    {errors.posAgentsCount}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="yearsOfOperation"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Years of Operation
                </label>
                <input
                  type="number"
                  id="yearsOfOperation"
                  name="yearsOfOperation"
                  value={formData.yearsOfOperation || ""}
                  onChange={handleChange}
                  min="1"
                  className={`w-full p-3 border rounded-md ${
                    errors.yearsOfOperation
                      ? "border-accent-red"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter years in operation"
                />
                {errors.yearsOfOperation && (
                  <p className="text-accent-red text-sm mt-1">
                    {errors.yearsOfOperation}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
              >
                Submit Registration
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BankOnboardingForm;
