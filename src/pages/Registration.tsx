import { useState } from "react";
import { Link } from "react-router-dom";
import BankOnboardingForm from "../components/BankOnboardingForm";
import { BankOnboardingData } from "../types";
import Logo from "../components/Logo";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<BankOnboardingData | null>(
    null
  );

  const handleSubmit = (data: BankOnboardingData) => {
    console.log("Registration data:", data);
    // In a real application, you would send this data to your backend
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <h1 className="text-3xl font-bold text-primary font-heading">
            FCT Agency POS Taxation
          </h1>
          <p className="mt-2 text-xl text-gray-600">Bank Registration Portal</p>
        </div>

        {!isSubmitted ? (
          <BankOnboardingForm onSubmit={handleSubmit} />
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2 font-heading">
                Registration Successful!
              </h2>
              <p className="text-gray-600">
                Thank you for registering {submittedData?.bankName} with the FCT
                Agency POS Taxation.
              </p>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 rounded-md border border-gray-200 mb-6">
              <h3 className="text-lg font-medium text-primary mb-4 font-heading">
                Registration Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-medium">{submittedData?.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tax ID Number</p>
                  <p className="font-medium">{submittedData?.taxIdNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Official Email</p>
                  <p className="font-medium">{submittedData?.officialEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">POS Agents</p>
                  <p className="font-medium">{submittedData?.posAgentsCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary bg-opacity-5 p-4 md:p-6 rounded-md border border-primary border-opacity-20 mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="text-primary mr-4 mb-3 md:mb-0 flex justify-center md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-primary mb-2 font-heading text-center md:text-left">
                    Next Steps
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Your registration is currently under review. Please check
                    your email at{" "}
                    <span className="font-medium">
                      {submittedData?.officialEmail}
                    </span>{" "}
                    for verification instructions.
                  </p>
                  <p className="text-gray-600">
                    Once verified, you will receive your login credentials to
                    access the bank portal.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:text-primary-dark"
            >
              Login here
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            For assistance, please contact{" "}
            <a
              href="mailto:support@fctpostaxation.gov.ng"
              className="text-primary"
            >
              support@fctpostaxation.gov.ng
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
