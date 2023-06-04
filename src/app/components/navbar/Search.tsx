'use client';

import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/app/hooks/useSearchModal';
import useContries from '@/app/hooks/useCountries';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useContries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diffTime = differenceInDays(end, start);

      if (diffTime === 0) {
        diffTime = 1;
      }
      return `${diffTime} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='
    border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    '
    >
      <div
        className='
        flex
        flex-row
        items-center
        justify-between
      '
      >
        <div
          className='
        text-sm
        font-semibold
        px-6
        '
        >
          {locationLabel}
        </div>
        <div
          className='
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x-[1px]
        flex-1
        text-center
        '
        >
          {durationLabel}
        </div>
        <div
          className='
        text-sm
        pl-6
        pr-2
        text-gray-600
        flex 
        flex-row
        items-center
        gap-3
        '
        >
          <div className='hidden sm:block'>{guestLabel}</div>
          <div
            className='
            p-2
            bg-rose-500
            rounded-full
            text-white

          '
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
