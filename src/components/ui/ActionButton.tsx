import Link from "next/link";
import { ActionButtonProps } from "@/types";

const ActionButton: React.FC<ActionButtonProps> = ({
  href,
  children,
  icon,
  className = "",
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles = `
    flex justify-center items-center
    rounded-xl h-10 md:h-16
     transition-all duration-300
    font-medium text-white shadow-lg
    transform hover:scale-105 hover:shadow-xl
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 disabled:hover:shadow-none
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E7B63]
  `;

  const variantStyles = {
    primary: "bg-[#5E7B63] hover:bg-[#4a6350]",
    secondary: "bg-gray-600 hover:bg-gray-700",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (disabled) {
    return (
      <button 
        className={buttonClasses} 
        disabled 
        onClick={onClick}
        style={{ 
          fontFamily: '"Somar Sans", sans-serif',
          width: 'clamp(200px, 30vw, 314px)',
            padding: 'clamp(10px, 2vw, 17px) clamp(10px, 2.5vw, 10px)',
          fontSize: 'clamp(16px, 2.5vw, 24px)',
          gap: 'clamp(6px, 1vw, 10px)'
        }}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={buttonClasses}
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : 'Action button'}
      style={{ 
        fontFamily: '"Somar Sans", sans-serif',
        width: 'clamp(140px, 30vw, 314px)',
        padding: 'clamp(5px, 2vw, 17px) clamp(5px, 2.5vw, 20px)',
        fontSize: 'clamp(14px, 2.5vw, 24px)',
        gap: 'clamp(px, 1vw, 10px)'
      }}
    >
        {children}
      {icon && <span>{icon}</span>}
      
    </Link>
  );
};

export default ActionButton; 