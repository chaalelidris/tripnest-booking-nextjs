"use client"

import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: NextPage<CommonLayoutProps> = ({ children }) => {
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);
  
  const isActiveRoute = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <Link
              href="/profile"
              passHref
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 ${isActiveRoute("/profile")
                ? "border-transparent"
                : "border-primary-500"
                }`}
            >
              Account info
            </Link>
            <Link
              href=""
              passHref
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 ${isActiveRoute("/account-savelists")
                ? "border-transparent"
                : "border-primary-500"
                }`}>
              Save lists
            </Link>
            <Link
              href="/account-password"
              passHref
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 ${isActiveRoute("/account-password")
                ? "border-transparent"
                : "border-primary-500"
                }`}>
              Change password
            </Link>
            <Link
              href=""
              passHref
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 ${isActiveRoute("/account-billing")
                ? "border-transparent"
                : "border-primary-500"
                }`}>
              Change Billing
            </Link>
          </div>
        </div>
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
