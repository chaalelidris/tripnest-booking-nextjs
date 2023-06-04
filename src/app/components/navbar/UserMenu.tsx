'use client';

import { Fragment, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Menu, Transition } from '@headlessui/react';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';

import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const router = useRouter();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    if(!currentUser.hasWallet) {
      toast.success("You need to connect stripe before hosting a listing")
     return router.push('/dashboard')
    }

    //open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal, router]);
  return (
    <div
      className='
    relative
  '
    >
      <div className='flex flex-row items-center gap-3'>
        <div
          className='
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer
        '
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <Menu as='div' className='relative'>
          <Menu.Button>
            <div
              className='
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-100
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        '
            >
              <AiOutlineMenu />
              <div className='hidden md:block'>
                <Avatar src={currentUser?.image} />
              </div>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-40 md:w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                {currentUser ? (
                  <>
                    <MenuItem
                      onClick={() => router.push('/dashboard')}
                      label='My Dashboard'
                    />
                    <MenuItem
                      onClick={() => router.push('/trips')}
                      label='My trips'
                    />
                    <MenuItem
                      onClick={() => router.push('/favorites')}
                      label='My favorites'
                    />
                    <MenuItem
                      onClick={() => router.push('/reservations')}
                      label='My reservations'
                    />
                    <MenuItem
                      onClick={() => router.push('/properties')}
                      label='My properties'
                    />
                    <MenuItem
                      onClick={onRent}
                      label='Airbnb my home'
                    />
                    <hr />
                    <MenuItem onClick={() => signOut()} label='Logout' />
                  </>
                ) : (
                  <>
                    <MenuItem onClick={loginModal.onOpen} label='Login' />
                    <MenuItem onClick={registerModal.onOpen} label='Signup' />
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu.Button>
        </Menu>
      </div>
    </div>
  );
};

export default UserMenu;
