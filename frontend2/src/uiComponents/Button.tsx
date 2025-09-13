import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-[#0091ff] text-white py-3 px-6 rounded-full font-semibold`}
    >
      {text}
    </button>
  );
};

export default Button;
