'use client';

import Container from '@/app/components/Container';
import Categories from './Categories';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/types';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed bg-white w-full shadow-sm z-10'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div
            className='
            flex
            flex-row
            items-center
            gap-3
            md:gap-0
            justify-between
          '
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
