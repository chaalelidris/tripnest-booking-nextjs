'use client';

import Image from "next/image";
import { PulseLoader } from "react-spinners";


const LogoLoader = () => {

  return (
    <>
      <Image
        className=""
        src="/images/logo.png"
        width={180}
        height={180}
        alt="Logo"
      />
      <div className="text-xl">
        loading

        <span>
          <PulseLoader
            size={10}
            color="#3fd8ff"
          />
        </span>
      </div>
    </>
  );
}

export default LogoLoader;
