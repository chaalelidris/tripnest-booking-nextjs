'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { addDays, differenceInCalendarDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { Range } from 'react-date-range';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Container from '@/app/components/Container';
import ListingHeader from '@/app/components/listings/ListingHeader';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';

import { SafeListing, SafeUser, SafeReservation } from '@/types';

import useLoginModal from '@/hooks/useLoginModal';
import useBookModal from '@/hooks/useBookModal';

const initialDateRange = {
  startDate: new Date(),
  endDate: addDays(new Date(), 2),
  key: 'selection',
};

type ListingClientProps = {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
};

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const bookingModal = useBookModal();
  const router = useRouter();

  const stripePromise = loadStripe(
    'pk_test_51N34RGGyKqr6VuiPkMPTW8siqXFPzl70d0PdUaw4mtINjzuw040KXXdpLZMZwzOEh71L8Tvc8GCev1X2vblEMKff00pXT14gtR',
  );

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);


  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const findNextAvailableDate = (date: Date, disabledDates: Date[]) => {
    let nextDate = new Date(date);
    while (disabledDates.some(disabledDate => isSameDay(disabledDate, nextDate))) {
      nextDate = addDays(nextDate, 1);
    }
    return nextDate;
  };


  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  useEffect(() => {
    const isStartDateDisabled = disabledDates.some(disabledDate =>
      isSameDay(disabledDate, initialDateRange.startDate)
    );
    const isEndDateDisabled = disabledDates.some(disabledDate =>
      isSameDay(disabledDate, initialDateRange.endDate)
    );

    if (isStartDateDisabled || isEndDateDisabled) {
      const nextStartDate = findNextAvailableDate(initialDateRange.startDate, disabledDates);
      const nextEndDate = findNextAvailableDate(addDays(nextStartDate, 2), disabledDates);

      setDateRange({
        ...initialDateRange,
        startDate: nextStartDate,
        endDate: nextEndDate,
      });
    }
  }, [disabledDates]);


  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHeader
            title={listing.title}
            images={listing.images}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <Elements stripe={stripePromise}>
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                  initialDateRange={initialDateRange}
                  // disabled={isLoading}
                  disabledDates={disabledDates}
                  listingId={listing.id}
                  listingPrice={listing.price}
                  currentUser={currentUser}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
