'use client';

import useContries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';

import Button from '../Button';
import Slider from '../Carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  actionId = '',
  currentUser,
  disabled,
  onAction,
  actionLabel,
}) => {
  const imagesArray = data.images.map((i) => i.src);

  const { getByValue } = useContries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div className='col-span-1 cursor-pointer group'>
      <div className='flex flex-col w-full gap-2'>
        <Slider id={data.id} images={imagesArray} currentUser={currentUser} />

        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>$ {price}</div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
export default ListingCard;
