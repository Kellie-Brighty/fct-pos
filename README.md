# FCT POS Taxation & Visibility System

A centralized platform for managing and enforcing the 0.2% tax deduction at source for all POS transactions in the Federal Capital Territory (FCT), Abuja, Nigeria.

## Project Overview

This system provides a transparent and efficient means of:

- Monitoring POS transactions in real-time
- Automating tax collection and remittance
- Ensuring precise 0.2% tax calculation
- Enforcing compliance from banks
- Integrating with relevant stakeholders (banks, FCT IRS, payment platforms)

## Technology Stack

- React (Frontend framework)
- TypeScript (Type-safe JavaScript)
- Tailwind CSS (Utility-first CSS framework)
- Vite (Build tool)

## Key Features

- **Bank Portal**: Allows banks to declare monthly tax remittances
- **FCT IRS Dashboard**: Provides read-only access to tax statistics and compliance reports
- **Consultant Dashboard**: For system health monitoring and discrepancy identification
- **Tax Reconciliation**: Automated matching of declared vs. calculated taxes
- **Secure API Integration**: OAuth 2.0 for bank data exchange
- **Invoice Generation**: Automated invoice creation after reconciliation
- **Payment Tracking**: Integration with Quickteller and PayDirect

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-organization/fct-pos-taxation.git
   cd fct-pos-taxation
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## Project Structure

```
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore            # Git ignore configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## License

This project is proprietary and confidential.

## Contact

For more information, please contact:

- Email: info@fctpostaxation.gov.ng
- Phone: +234 803 123 4567
