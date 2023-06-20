'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import HeartButton from '@/app/components/HeartButton';
import { SafeUser } from '@/types';

import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

type SliderProps = {
  images: string[];
  id: string;
  currentUser?: SafeUser | null;
};

const MAX_INDICATORS = 5;

const Slider: React.FC<SliderProps> = ({ id, images, currentUser }) => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleImages = images.slice(currentIndex, currentIndex + 6);
  return (
    <div className='relative'>
      <Carousel
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-2 transition-all transform-gpu ease-in-out -translate-y-1/2 z-10 bg-gray-50 rounded-full w-7 h-7 hover:scale-110 flex justify-center items-center text-gray-700 focus:outline-none opacity-80 hover:opacity-95 "
            >
              <BiChevronLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 right-2 transition-all transform-gpu ease-in-out -translate-y-1/2 z-10 bg-gray-50 rounded-full w-7 h-7 hover:scale-110 flex justify-center items-center text-gray-700 focus:outline-none opacity-80 hover:opacity-95 "
            >
              <BiChevronRight />
            </button>
          )
        }
        infiniteLoop
        autoPlay
        showArrows
        useKeyboardArrows
        // renderIndicator={customRenderIndicator}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        stopOnHover
        swipeable
      >
        {visibleImages.map((img, i) => (
          <div
            key={i}
            onClick={() => router.push(`/listings/${id}`)}
            className='aspect-w-16 aspect-h-16 w-full relative overflow-hidden rounded-xl'
          >
            <Image
              fill
              priority
              alt='Listing'
              src={img}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              sizes="(max-width: 640px) 100vw, 200px"
            />
          </div>
        ))}
      </Carousel>
      <div className='absolute top-3 right-3'>
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
    </div>
  );
};
export default Slider;
