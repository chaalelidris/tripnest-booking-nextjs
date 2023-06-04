import { memo } from 'react';
import Image from 'next/image';
import twemoji from 'twemoji';

const U200D = String.fromCharCode(0x200d);
const UFE0Fg = /\uFE0F/g;

interface TwemojiProps {
  emoji: string;
  ext: 'svg' | 'png';
  width: number;
  height: number;
}

const Twemoji: React.FC<TwemojiProps> = ({ emoji, ext, width, height }) => {
  const HEXCodePoint = twemoji.convert.toCodePoint(
    emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji
  );
  return (
    <Image
      src={`https://twemoji.maxcdn.com/v/latest/${
        ext === 'png' ? '72x72' : 'svg'
      }/${HEXCodePoint}.${ext}`}
      width={width}
      height={height}
      alt={emoji}
      draggable={false}
    />
  );
};

export default memo(Twemoji);
