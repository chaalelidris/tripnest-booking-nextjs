'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt='Logo'
      src='/images/logo.png'
      className='hidden md:block cursor-pointer'
      height={100}
      width={100}
    />
  );
};

export default Logo;
