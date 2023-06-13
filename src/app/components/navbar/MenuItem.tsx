'use-client';

import { Menu } from '@headlessui/react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          onClick={onClick}
          className={`${active ? 'bg-gray-100' : ''
            }  px-3 py-2 flex text-sm text-black hover:bg-neutral-100 `}
        >
          {label}
        </div>
      )}
    </Menu.Item>
  );
};

export default MenuItem;
