'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import HeartButton from '@/app/components/HeartButton';
import { SafeUser } from '@/types';

import { useState } from 'react';

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
              className="absolute top-10 left-10 z-10 rounded-full bg-black text-white p-2 w-8 h-8"
            >
              @
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute rounded-full bg-black text-white p-2 w-8 h-8"
            >
              Next
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
            className='aspect-square w-full relative overflow-hidden rounded-xl'
          >
            <Image
              fill
              alt='Listing'
              src={img}
              className='object-cover h-full w-full group-hover:scale-110 transition'
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
