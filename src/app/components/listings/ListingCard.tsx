'use client';

import useContries from '@/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/types';

import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';

import Button from '@/app/components/Button';
import Slider from '@/app/components/Carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useLoginModal from '@/hooks/useLoginModal';
import useEditRentModal from '@/hooks/useEditRentModal';
import useWilayas from '@/hooks/useWilayas';

type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;
  currentUser?: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  editLabel?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  actionId = '',
  currentUser,
  disabled,
  onAction,
  actionLabel,
  editLabel,
}) => {
  const loginModal = useLoginModal();
  const editRentModal = useEditRentModal();

  const imagesArray = data.images.map((i) => i.src);

  const { getByValue } = useContries();
  const { getWilayaByValue } = useWilayas();

  const location = getByValue(data.locationValue);
  const wilayaLocation = getWilayaByValue(data.wilayaLocationValue);

  const title = data.title;

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const onEditRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    editRentModal.setListing(data);
    editRentModal.onOpen();
  }, [loginModal, editRentModal, currentUser, data]);

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
        <div className="font-extrabold text-black overflow-ellipsis whitespace-nowrap overflow-hidden text-lg">
          {title}
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label},
          <span className="font-semibold text-neutral-500"> {wilayaLocation?.label}</span>
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>{price} DZD</div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        {onAction && actionLabel && (
          <Button
            className="transform-gpu hover:scale-95"
            disabled={disabled}
            small
            primary
            label={actionLabel}
            onClick={handleCancel}
          />
        )}

        {editLabel && (
          <Button
            className="transform-gpu hover:scale-95"
            edit
            disabled={disabled}
            small
            label={editLabel}
            onClick={onEditRent}
          />
        )}
      </div>
    </div>
  );
};
export default ListingCard;
