'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
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
  outline,
  edit,
  small,
  primary,
  width,
  icon: Icon,
  className,
}) => {
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
        
        ${outline && 'bg-white border-black text-black'}
        ${edit && 'bg-green-600 border-black text-white'}
        ${primary && 'bg-primary border-primary text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1 px-2' : 'py-3 px-6'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
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
    </button>
  );
}

export default Button;