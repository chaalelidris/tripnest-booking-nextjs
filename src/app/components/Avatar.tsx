'use-client';

import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
  size?: number;
}
const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image
      className='rounded-full w-8 h-8'
      height={size ? size : 30}
      width={size ? size : 30}
      src={src || '/images/placeholder.jpg'}
      alt='Avatar'
    />
  );
};

export default Avatar;
