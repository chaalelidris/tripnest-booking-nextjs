"use client";

import { useState } from 'react';
import { Image as ImageType } from '@prisma/client';

import useContries from '@/hooks/useCountries';
import { SafeUser } from '@/types';



/* components */
import Heading from '@/app/components/Heading';
import HeartButton from '@/app/components/HeartButton';
import useWilayas from '@/hooks/useWilayas';
import NcImage from '../shared/NcImage/NcImage';
import ModalPhotos from '../modals/ModalPhotos';


const PHOTOS: string[] = [
  "https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

type ListingHeaderProps = {
  title: string;
  images: ImageType[];
  id: string;
  currentUser?: SafeUser | null;
  locationValue: string;
  wilayaLocationValue: string;
};

const ListingHeader2: React.FC<ListingHeaderProps> = ({
  title,
  id,
  images,
  currentUser,
  locationValue,
  wilayaLocationValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const { getByValue } = useContries();
  const { getWilayaByValue } = useWilayas();

  const location = getByValue(locationValue);
  const wilayaLocation = getWilayaByValue(wilayaLocationValue);

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };
  const handleCloseModal = () => setIsOpen(false);



  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}, ${wilayaLocation?.label}`}
      />
      <div className='flex justify-end items-center'>
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={() => handleOpenModal(0)}
          >
            <NcImage
              containerClassName="absolute inset-0"
              className="object-cover w-full h-full rounded-md sm:rounded-xl"
              src={images[0].src}
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {images.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
                }`}
            >
              <NcImage
                containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                className="object-cover w-full h-full rounded-md sm:rounded-xl "
                src={item.src || ""}
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => handleOpenModal(index + 1)}
              />
            </div>
          ))}

          <div
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
            onClick={() => handleOpenModal(0)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </div>
        </div>
      </header>
      {/* MODAL images */}
      <ModalPhotos
        imgs={images}
        isOpen={isOpen}
        onClose={handleCloseModal}
        initFocus={openFocusIndex}
        uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
      />
    </>
  );
};
export default ListingHeader2;
