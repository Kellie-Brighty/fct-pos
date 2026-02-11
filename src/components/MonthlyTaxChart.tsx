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
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Mock data for monthly tax deductions (in thousands of NGN)
  const taxDeductionData = [
    24.5, 28.9, 31.2, 29.8, 35.2, 38.7, 42.1, 39.6, 44.3, 43.8, 46.2, 48.5,
  ];

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    elements: {
      bar: {
        borderRadius: 8,
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(11, 17, 32, 0.95)",
        titleColor: "#00A651",
        bodyColor: "#fff",
        titleFont: {
          family: "Inter",
          weight: "bold",
          size: 12,
        },
        bodyFont: {
          family: "Inter",
          size: 11,
        },
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            if (context.parsed.y !== null) {
              return new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format((context.raw as number) * 1000);
            }
            return "";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        border: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: "rgba(255, 255, 255, 0.4)",
          font: {
            family: "Inter",
            size: 10,
            weight: "bold",
          },
          callback: function (value) {
            return "₦" + value + "k";
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: "rgba(255, 255, 255, 0.4)",
          font: {
            family: "Inter",
            size: 10,
            weight: "bold",
          },
        },
      },
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: "Tax Collections",
        data: taxDeductionData,
        backgroundColor: "rgba(0, 166, 81, 0.4)",
        hoverBackgroundColor: "rgba(0, 166, 81, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <Bar options={options} data={data} />
    </div>
  );
};

export default MonthlyTaxChart;
