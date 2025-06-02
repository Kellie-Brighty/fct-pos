import React from "react";
import coaLogo from "../assets/COA.svg";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <img
      src={coaLogo}
      alt="FCT Agency POS Taxation"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export default Logo;
