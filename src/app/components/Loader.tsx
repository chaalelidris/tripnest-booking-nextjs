'use client';

import { PuffLoader } from "react-spinners";
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
      {/* <PuffLoader
        size={100}
        color="red"
      /> */}
      <LogoLoader />
    </div>
  );
}

export default Loader;