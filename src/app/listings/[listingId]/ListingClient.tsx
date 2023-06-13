'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const stripePromise = loadStripe(
    String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
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
        setTotalPrice((dayCount) * listing.price);
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

  const renderListingHeader = () => {
    return (
      <ListingHeader
        title={listing.title}
        images={listing.images}
        locationValue={listing.locationValue}
        wilayaLocationValue={listing.wilayaLocationValue}
        id={listing.id}
        currentUser={currentUser}
      />
    )
  }

  const renderListingInfo = () => {
    return (
      <ListingInfo
        id={listing.id}
        user={listing.user}
        category={category}
        description={listing.description}
        roomCount={listing.roomCount}
        guestCount={listing.guestCount}
        bathroomCount={listing.bathroomCount}
        locationValue={listing.locationValue}
        wilayaLocationValue={listing.wilayaLocationValue}
      />
    )
  }

  const renderReservationCalendar = () => {
    return (
      <Elements stripe={stripePromise}>
        <ListingReservation
          price={listing.price}
          totalPrice={totalPrice}
          onChangeDate={(value) => setDateRange(value)}
          dateRange={dateRange}
          setDateRange={setDateRange}
          initialDateRange={initialDateRange}
          disabledDates={disabledDates}
          listingId={listing.id}
          listingPrice={listing.price}
          currentUser={currentUser}
        />
      </Elements>
    )
  }

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6 mt-6'>

          {/* Render Header */}
          {renderListingHeader()}

          {/* Render Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-7 md:gap-10 mt-6 '>
            <div className='lg:col-span-4 flex flex-col gap-8'>
              {renderListingInfo()}
            </div>
            <div className='lg:col-span-3 order-first lg:order-last mb-10  '>
              <div className='sticky top-28'>
                {renderReservationCalendar()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
