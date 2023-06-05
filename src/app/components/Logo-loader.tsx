'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const LogoLoader = () => {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.push('/')}
        className="hidden md:block cursor-pointer"
        src="/images/logo.png"
        width="180"
        height="180"
        alt="Logo"
      />
      <div className="text-xl"> loading ...</div>

    </>
  );
}

export default LogoLoader;
