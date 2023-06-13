'use client';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { SafeUser } from '@/types';
import useFavorite from '@/hooks/useFavorite';
import { useCallback, useEffect, useState } from 'react';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className='relative hover:opacity-80 cursor-pointer transition-all transform-gpu hover:scale-110 ease-in-out'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};
export default HeartButton;
