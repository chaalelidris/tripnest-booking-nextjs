'use client';
import { type IconType } from 'react-icons';

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                    relative
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    w-full
                    ${
                      outline
                        ? 'bg-white border-black text-black'
                        : 'bg-rose-500 border-rose-500 text-white'
                    }        
                    ${
                      small
                        ? 'text-sm font-light border-[1px] p-1'
                        : 'text-md font-semibold border-2 p-3'
                    }
  `}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};
export default Button;
