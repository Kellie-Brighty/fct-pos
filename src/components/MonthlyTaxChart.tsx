import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// We'll keep the variant prop for compatibility, but it will be ignored
interface MonthlyTaxChartProps {
  variant?: "line" | "bar";
}

const MonthlyTaxChart = ({}: MonthlyTaxChartProps) => {
  const [_animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Animation state management
    setAnimationComplete(false);
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Mock data for monthly tax deductions (in thousands of NGN)
  const taxDeductionData = [
    24.5, 28.9, 31.2, 29.8, 35.2, 38.7, 42.1, 39.6, 44.3, 43.8, 46.2, 48.5,
  ];

  // Monthly transaction volume data (in millions of NGN) - removed since we focus only on tax data for bar chart

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            family: "'Open Sans', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "rect",
        },
      },
      title: {
        display: true,
        text: "Monthly Tax Deduction Trend",
        font: {
          size: 18,
          family: "Livvic, sans-serif",
          weight: "bold",
        },
        color: "#00A651", // primary color
        padding: {
          bottom: 25,
          top: 10,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        titleFont: {
          family: "Livvic, sans-serif",
          weight: "bold",
          size: 14,
        },
        bodyFont: {
          family: "'Open Sans', sans-serif",
          size: 13,
        },
        borderColor: "rgba(0, 166, 81, 0.3)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format((context.raw as number) * 1000);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          dash: [4, 4],
          display: false,
        },
        ticks: {
          padding: 10,
          color: "#666",
          font: {
            family: "'Open Sans', sans-serif",
          },
          callback: function (value) {
            return "₦" + value + "k";
          },
        },
        title: {
          display: true,
          text: "Amount (Thousands NGN)",
          font: {
            family: "Livvic, sans-serif",
            weight: "bold",
            size: 13,
          },
          color: "#555",
          padding: {
            bottom: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: "#666",
          font: {
            family: "'Open Sans', sans-serif",
          },
        },
        title: {
          display: true,
          text: "Month",
          font: {
            family: "Livvic, sans-serif",
            weight: "bold",
            size: 13,
          },
          color: "#555",
          padding: {
            top: 10,
          },
        },
      },
    },
  };

  // Enhanced bar colors
  const barColors = [
    "rgba(0, 166, 81, 0.8)", // primary
    "rgba(0, 166, 81, 0.7)",
    "rgba(0, 166, 81, 0.8)",
    "rgba(0, 166, 81, 0.7)",
    "rgba(0, 166, 81, 0.8)",
    "rgba(0, 166, 81, 0.7)",
    "rgba(0, 166, 81, 0.8)",
    "rgba(0, 166, 81, 0.7)",
    "rgba(0, 166, 81, 0.8)",
    "rgba(0, 166, 81, 0.7)",
    "rgba(0, 166, 81, 0.8)",
    "rgba(0, 166, 81, 0.7)",
  ];

  const barBorderColors = Array(12).fill("#00A651");

  const data = {
    labels: months,
    datasets: [
      {
        label: "Tax Deductions",
        data: taxDeductionData,
        backgroundColor: barColors,
        borderColor: barBorderColors,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 166, 81, 0.9)",
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md h-96">
      <div className="h-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default MonthlyTaxChart;
