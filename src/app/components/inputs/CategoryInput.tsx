'use client';
import type {
  FieldErrors,
} from 'react-hook-form';

import { type IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
  categoryError?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  onClick,
  label,
  selected,
  categoryError,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
            ${categoryError && 'text-rose-500' }
    `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};
export default CategoryInput;
