"use client"

import React, { FC, useRef } from "react";
import ButtonPrimary from "@/app/components/shared/Button/ButtonPrimary";
import imagePng from "/public/images/travelhero2.png";
import Image from "next/image";
import NcPlayIcon from "../shared/NcPlayIcon/NcPlayIcon";
import NcPlayIcon2 from "../shared/NcPlayIcon2/NcPlayIcon2";

export interface SectionMainProps {
    className?: string;
    onWatchVideoClick: () => void;
}

const SectionMain: FC<SectionMainProps> = ({
    className = "",
    onWatchVideoClick,
}) => {

    return (
        <div
            className={`nc-SectionMain relative ${className}`}
            data-nc-id="SectionMain"
        >
            <div className="absolute z-10 inset-x-0 top-[15%] sm:top-[20%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-5 lg:space-y-6 xl:space-y-8">
                <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
                    Book your trip house from <strong className="text-primary">Tripnest</strong> platform
                </span>
                <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
                    Welcome
                    <Image src="/images/hey.png" alt="hey" width={40} height={40} className="inline mx-1" />
                    to
                    <span className="text-primary">Tripnest</span>
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <ButtonPrimary
                        href="/listings"
                        className="overflow-ellipsis whitespace-nowrap overflow-hidden rounded-xl"
                        sizeClass="px-8 py-4 "
                        fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    >
                        Discover <span className="hidden sm:block mx-1"> Tripnest </span> Listings
                    </ButtonPrimary>
                    <ButtonPrimary
                        className="overflow-ellipsis whitespace-nowrap overflow-hidden rounded-xl"
                        onClick={onWatchVideoClick}
                        sizeClass="px-8 py-4 "
                        fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    >
                        <NcPlayIcon2 className="w-6 h-6 mr-4" />
                        Watch video
                    </ButtonPrimary>
                </div>
            </div>
            <div className="relative aspect-w-6 aspect-h-7 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
                <Image
                    className="absolute inset-0 object-cover rounded-xl"
                    src={imagePng}
                    alt="hero"
                />
            </div>
        </div>
    );
};


export default SectionMain;