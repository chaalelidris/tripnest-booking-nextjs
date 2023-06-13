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
      style={{ width: "auto", height: "auto" }}
      width={100}
      height={100}
    />
  );
};

export default Logo;
