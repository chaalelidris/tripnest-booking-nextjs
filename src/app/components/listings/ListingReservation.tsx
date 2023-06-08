'use client';

import { Range } from 'react-date-range';
import Calendar from '@/app/components/inputs/Calendar';
import Button from '@/app/components/Button';
import BookingModal from '@/app/components/modals/BookingModal';
import useBookModal from '@/hooks/useBookModal';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { SafeUser } from '@/types';
import useLoginModal from '@/hooks/useLoginModal';

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  setDateRange: Dispatch<SetStateAction<Range>>;
  initialDateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
  onChangeDate: (value: Range) => void;
  currentUser?: SafeUser | null;
  disabledDates: Date[];
  listingId?: string;
  listingPrice?: number
};

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  setDateRange,
  initialDateRange,
  onChangeDate,
  currentUser,
  listingPrice,
  disabledDates,
  listingId,
}) => {
  const bookingModal = useBookModal();
  const loginModal = useLoginModal();

  const onClickReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    bookingModal.onOpen();
  }, [loginModal, bookingModal, currentUser]);

  const isDisabled = disabledDates.some((date) => {
    return dateRange.startDate && date.getTime() === dateRange.startDate.getTime();
  });



  /* Render */
  const renderListingReservationHeader = () => {
    return (
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>{price} <small>DZD</small></div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
    )
  }

  const renderBookingModal = () => {
    return (
      <div className='p-4'>
        <Button
          primary
          label='Reserve'
          disabled={isDisabled}
          onClick={onClickReservation}
        />
        <BookingModal
          listingId={listingId!}
          listingPrice={listingPrice!}
          dateRange={dateRange}
          totalPrice={totalPrice}
          setDateRange={setDateRange}
          initialDateRange={initialDateRange}
        />
      </div>
    )
  }


  
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>

      {/* Listing Reservation Header */}
      {renderListingReservationHeader()}

      <hr />

      {/* Calendar */}
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      {/* Total Price display */}
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>

      {/* Button Shows Booking Modal */}
      {renderBookingModal()}

    </div>
  );
};
export default ListingReservation;
