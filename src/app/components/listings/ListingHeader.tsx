'use client';
import { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { Image as ImageType } from '@prisma/client';
import Image from 'next/image';

import useContries from '@/hooks/useCountries';
import { SafeUser } from '@/app/types';

/* components */
import Heading from '@/app/components/Heading';
import HeartButton from '@/app/components/HeartButton';
import { components } from 'react-select';

type ListingHeaderProps = {
  title: string;
  images: ImageType[];
  id: string;
  currentUser?: SafeUser | null;
  locationValue: string;
};

const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  id,
  images,
  currentUser,
  locationValue,
}) => {
  const { getByValue } = useContries();

  const location = getByValue(locationValue);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='flex justify-end items-center'>
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images.map((i) => i.src)}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        // backgroundStyle={}
        />
      )}
      <div
        onClick={() => openImageViewer(0)}
        className={`w-full h-[60vh] overflow-hidden  hidden md:block  rounded-xl relative cursor-pointer ${images.length === 1 || images.length >= 5
            ? 'grid-cols-1'
            : 'grid-cols-2'
          } grid  gap-2`}
      >
        {images.length <= 4 && (
          <div
            className={`grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
              }  gap-2 h-full`}
          >
            {images.length <= 4 &&
              images.map((image, index) => (
                <div key={index} className='relative'>
                  <Image
                    src={image.src}
                    alt={`Image ${index + 1}`}
                    fill
                    className='object-cover w-full h-full'
                    onClick={() => openImageViewer(index)}
                  />
                </div>
              ))}
          </div>
        )}
        {images.length >= 5 && (
          <div className='grid grid-cols-2 h-full gap-2'>
            <div className=' relative'>
              <Image
                src={images[0].src}
                alt='image 1'
                fill
                className='object-cover w-full'
              />
            </div>
            <div className=''>
              <div className='grid grid-cols-2 h-full gap-2'>
                <div className=' relative'>
                  <Image
                    src={images[1].src}
                    alt='image 1'
                    fill
                    className='object-cover w-full'
                  />
                </div>
                <div className=' relative'>
                  <Image
                    src={images[2].src}
                    alt='image 1'
                    fill
                    className='object-cover w-full'
                  />
                </div>
                <div className=' relative'>
                  <Image
                    src={images[3].src}
                    alt='image 1'
                    fill
                    className='object-cover w-full'
                  />
                </div>
                <div className='relative'>
                  <Image
                    src={images[4].src}
                    alt='image 1'
                    fill
                    className='object-cover w-full'
                  />
                  <button className='absolute mb-2 mr-3 bottom-0 right-0 bg-white text-gray-800 px-2 py-1 rounded-md shadow-md hover:shadow-lg transition duration-300'>
                    Show all photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => openImageViewer(0)}
        className={`w-full h-[60vh]  md:hidden  overflow-hidden rounded-xl relative cursor-pointer `}
      >
        <Image
          src={images[0].src}
          alt={`Image `}
          fill
          className='object-cover w-full'
          onClick={() => openImageViewer(0)}
        />
      </div>
    </>
  );
};
export default ListingHeader;
