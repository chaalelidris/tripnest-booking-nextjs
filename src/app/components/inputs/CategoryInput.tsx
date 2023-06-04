'use client';
import { type IconType } from 'react-icons';

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  onClick,
  label,
  selected,
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
    `}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};
export default CategoryInput;
