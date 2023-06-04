'use-client';
import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
  size?: 'lg' | 'sm';
}
const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image
      className='rounded-full'
      height={`${size === 'lg' ? '80' : '30'}`}
      width={`${size === 'lg' ? '80' : '30'}`}
      src={src || '/images/placeholder.jpg'}
      alt='Avatar'
    />
  );
};

export default Avatar;
