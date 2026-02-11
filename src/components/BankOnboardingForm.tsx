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
    <div className="bg-transparent text-white">
      <h2 className="text-2xl font-black text-white mb-2 font-heading tracking-tighter text-glow">
        Bank Onboarding
      </h2>
      <p className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-10">
        Register your institution for the POS Taxation System.
      </p>

      {/* Progress Indicator */}
      <div className="mb-12 relative">
        <div className="flex items-center justify-between relative z-10">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center flex-1 last:flex-initial">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-500 ${
                  step > index + 1
                    ? "bg-primary text-white shadow-[0_0_20px_rgba(0,109,53,0.4)]"
                    : step === index + 1
                    ? "bg-prime-gradient text-white shadow-[0_0_25px_rgba(0,109,53,0.5)] scale-110"
                    : "bg-white/5 border border-white/10 text-white/80"
                }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div className="flex-1 mx-4">
                  <div className={`h-px transition-all duration-700 ${
                    step > index + 1 ? "bg-primary" : "bg-white/10"
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${step === 1 ? "text-primary-light" : "text-white/80"}`}>Bank Details</span>
          <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${step === 2 ? "text-primary-light" : "text-white/80"}`}>Contact Info</span>
          <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${step === 3 ? "text-primary-light" : "text-white/80"}`}>Account Setup</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Bank Details */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div>
              <label
                htmlFor="bankName"
                className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.bankName ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                }`}
                placeholder="Institution Name"
              />
              {errors.bankName && (
                <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                  {errors.bankName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="branchAddresses"
                className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
              >
                FCT Branch Matrix
              </label>
              <textarea
                id="branchAddresses"
                name="branchAddresses"
                value={formData.branchAddresses}
                onChange={handleChange}
                rows={3}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                  errors.branchAddresses
                    ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                    : "border-white/10 focus:border-primary"
                }`}
                placeholder="List official FCT branch locations..."
              ></textarea>
              {errors.branchAddresses && (
                <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                  {errors.branchAddresses}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="taxIdNumber"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Tax ID
                </label>
                <input
                  type="text"
                  id="taxIdNumber"
                  name="taxIdNumber"
                  value={formData.taxIdNumber}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.taxIdNumber ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="TIN-00000000"
                />
                {errors.taxIdNumber && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.taxIdNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cacRegNumber"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  CAC Registration
                </label>
                <input
                  type="text"
                  id="cacRegNumber"
                  name="cacRegNumber"
                  value={formData.cacRegNumber}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.cacRegNumber ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="RC-000000"
                />
                {errors.cacRegNumber && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.cacRegNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary px-10 py-4 text-xs font-black uppercase tracking-widest flex items-center"
              >
                Proceed Connection
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div>
              <label
                htmlFor="mdName"
                className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
              >
                Executive Principal
              </label>
              <input
                type="text"
                id="mdName"
                name="mdName"
                value={formData.mdName}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.mdName ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                }`}
                placeholder="MD / CEO Full Name"
              />
              {errors.mdName && (
                <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                  {errors.mdName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="mdPhoneNumber"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Priority Contact
                </label>
                <input
                  type="text"
                  id="mdPhoneNumber"
                  name="mdPhoneNumber"
                  value={formData.mdPhoneNumber}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.mdPhoneNumber ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="+234..."
                />
                {errors.mdPhoneNumber && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.mdPhoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="officialEmail"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Official Gateway
                </label>
                <input
                  type="email"
                  id="officialEmail"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.officialEmail ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="admin@institution.com"
                />
                {errors.officialEmail && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.officialEmail}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="hqAddress"
                className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
              >
                Headquarters Address
              </label>
              <textarea
                id="hqAddress"
                name="hqAddress"
                value={formData.hqAddress}
                onChange={handleChange}
                rows={2}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                    errors.hqAddress ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                }`}
                placeholder="Full operational address..."
              ></textarea>
              {errors.hqAddress && (
                <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                  {errors.hqAddress}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-all flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Reverse
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary px-10 py-4 text-xs font-black uppercase tracking-widest"
              >
                Verify & Proceed
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Account Setup */}
        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Secure Access Code
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.password ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Confirm Code
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.confirmPassword
                      ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                      : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
              <div>
                <label
                  htmlFor="posAgentsCount"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Active POS Fleet
                </label>
                <input
                  type="number"
                  id="posAgentsCount"
                  name="posAgentsCount"
                  value={formData.posAgentsCount || ""}
                  onChange={handleChange}
                  min="1"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.posAgentsCount
                      ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                      : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="Unit Count"
                />
                {errors.posAgentsCount && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.posAgentsCount}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="yearsOfOperation"
                  className="block text-[10px] font-black text-white/80 uppercase tracking-widest mb-2 ml-1"
                >
                  Sector Longevity
                </label>
                <input
                  type="number"
                  id="yearsOfOperation"
                  name="yearsOfOperation"
                  value={formData.yearsOfOperation || ""}
                  onChange={handleChange}
                  min="1"
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.yearsOfOperation
                      ? "border-accent-red/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                      : "border-white/10 focus:border-primary"
                  }`}
                  placeholder="Years Active"
                />
                {errors.yearsOfOperation && (
                  <p className="text-accent-red text-[10px] font-bold uppercase mt-2 ml-1 tracking-wide">
                    {errors.yearsOfOperation}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white transition-all flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Previous
              </button>
              <button
                type="submit"
                className="btn-primary px-10 py-4 text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,109,53,0.3)]"
              >
                Transmit Registration
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BankOnboardingForm;
