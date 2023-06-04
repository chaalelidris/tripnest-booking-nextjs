'use client';

import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center'>
      <PuffLoader color='red' size={150} />
    </div>
  );
};

export default Loader;
