'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { IoMdClose } from 'react-icons/io';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'airbnb';

interface ImageUploadProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, setImages }) => {
  const [isFileNearBy, setIsFileNearBy] = useState<boolean>(false);
  const [isFileOver, setIsFileOver] = useState(false);
  // const [close, setClose] = useState(false);
  let extraClasses = '';

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images!, ...Array.from(event.target.files!)];
    setImages(newImages);
  };

  if (isFileNearBy && !isFileOver) extraClasses += ' opacity-70';
  if (isFileOver) extraClasses += ' opacity-70';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);


  const deleteImage = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  return (
    <div>
      <FileDrop
        onFrameDragEnter={() => setIsFileNearBy(true)}
        onFrameDragLeave={() => setIsFileNearBy(false)}
        onDragOver={() => setIsFileOver(true)}
        onDragLeave={() => setIsFileOver(false)}
        onDrop={(files) =>
          // setInput((prev) => ({ ...prev, file: files?.[0] }))
          setImages([...images, ...Array.from(files!)])
        }
        // frame={}
      >
        <div
          onClick={handleClick}
          className={
            `
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            ` + extraClasses
          }
        >
          <TbPhotoPlus size={50} />
          <div className='font-semibold text-sm'>
            Click or Drag and drop to upload
          </div>
        </div>
      </FileDrop>
      <input
        className='hidden'
        type='file'
        ref={fileInputRef}
        multiple
        onChange={onChange}
      />
      <div className='flex flex-wrap gap-2 mt-2'>
        {images.map((image, index) => (
          <div key={index} className='overflow-hidden relative'>
            <IoMdClose
              onClick={() => deleteImage(index)}
              className='absolute right-1 hover:text-white cursor-pointer'
            />
            <Image
              className='h-20 rounded-md w-20'
              key={index}
              height={12}
              width={12}
              src={URL.createObjectURL(image)}
              alt={`Image \${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
