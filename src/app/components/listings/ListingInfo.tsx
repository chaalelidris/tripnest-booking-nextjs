'use client';

import { type IconType } from 'react-icons';

import dynamic from 'next/dynamic';

import useContries from '@/hooks/useCountries';
import { SafeListing, SafeUser } from '@/types';

import Avatar from '@/app/components/Avatar';
import ListingCategory from '@/app/components/listings/ListingCategory';
import useWilayas from '@/hooks/useWilayas';

const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
});

type ListingInfoProps = {
  user: SafeUser;
  category:
  | {
    icon: IconType;
    label: string;
    description: string;
  }
  | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  wilayaLocationValue: string;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  wilayaLocationValue,
}) => {
  const { getByValue } = useContries();
  const { getWilayaByValue } = useWilayas();

  const coordinates = getByValue(locationValue)?.latlng;
  const wilayaCoordinates = getWilayaByValue(wilayaLocationValue)?.latlng
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={wilayaCoordinates} zoom={10} />
    </div>
  );
};
export default ListingInfo;
