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
    <Carousel
      infiniteLoop
      autoPlay
      showArrows
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
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={id} currentUser={currentUser} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default Slider;
