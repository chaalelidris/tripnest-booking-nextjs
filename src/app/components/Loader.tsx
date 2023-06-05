'use client';

import { PulseLoader } from "react-spinners";
import LogoLoader from "@/app/components/Logo-loader";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      
      <LogoLoader />
    </div>
  );
}

export default Loader;