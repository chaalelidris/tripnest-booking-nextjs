'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  edit?: boolean;
  primary?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  loading,
  outline,
  edit,
  small,
  primary,
  width,
  icon: Icon,
  className,
}) => {

  const _renderLoading = () => {
    return (
      <svg
        className=" absolute 
                    animate-spin 
                    right-4
                    top-3 
                    h-5 
                    w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )
  }
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        border-0
        ${outline && 'bg-white border-2 border-black text-black'}
        ${edit && 'bg-green-600 border-black text-white'}
        ${primary && 'bg-primary border-primary text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1 px-2' : 'py-3 px-6'}
        ${small ? 'font-light' : 'font-semibold'}
        ${className ?? className}
        ${width ? width : "w-full"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
      {loading && _renderLoading()}
    </button>
  );
}

export default Button;