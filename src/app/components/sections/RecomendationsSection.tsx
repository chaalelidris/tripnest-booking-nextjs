"use client"

import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";

import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Heading from "../Heading";
export interface RecommendationsSectionProps {
    className?: string;
    itemClassName?: string;
    itemPerRow?: 4 | 5;
}
const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
    className = "",
    itemClassName = "",
    itemPerRow = 4,
}) => {
    const glideRef = useRef<HTMLDivElement>(null);

    useEffect((): (() => void) | undefined => {
        if (glideRef.current) {
            const glide = new Glide(glideRef.current, {
                gap: 32,
                bound: true,
                perView: itemPerRow,
                autoplay: 3000,
                breakpoints: {
                    1280: {
                        perView: itemPerRow - 1,
                    },
                    1024: {
                        gap: 20,
                        perView: itemPerRow - 1,
                    },
                    768: {
                        gap: 20,
                        perView: itemPerRow - 2,
                    },
                    640: {
                        gap: 20,
                        perView: itemPerRow - 3,
                    },
                    500: {
                        gap: 20,
                        perView: 1.3,
                    },
                },
            });

            glide.mount();

            return () => glide.destroy();
        }
    }, [itemPerRow]);

    return (
        <div className="recommendations-section my-6">
            <Heading
                title="Recomendations"
                subtitle="The best places for you"
            />
            <div className="glide" ref={glideRef}>
                {/* Prev Button */}
                <div className="glide__arrows" data-glide-el="controls">

                    <button className="glide__arrow glide__arrow--left " data-glide-dir="<">
                        <div className="text-gray-800 ">
                            <BiChevronLeft />
                        </div>
                    </button>
                </div>


                {/* Slider */}
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        <li className="glide__slide">
                            <div className="overflow-hidden">
                                <div className="aspect-square w-full relative overflow-hidden rounded-xl  ">
                                    <Image
                                        className="object-cover h-full w-full group-hover:scale-110 transition"
                                        src={"https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                                        alt="Recommendation 1"
                                        fill
                                    />
                                </div>
                                <div className="recommendation-content">
                                    <h3 className="text-xl font-bold">Recommendation 1</h3>
                                    <p>Some description for recommendation 1</p>
                                </div>
                            </div>
                        </li>
                        <li className="glide__slide">
                            <div className="overflow-hidden ">
                                <div className="aspect-square w-full relative overflow-hidden rounded-xl  ">
                                    <Image
                                        className="object-cover h-full w-full group-hover:scale-110 transition"
                                        src={"https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                                        alt="Recommendation 2"
                                        fill
                                    />
                                </div>
                                <div className="recommendation-content">
                                    <h3 className="text-xl font-bold">Recommendation 2</h3>
                                    <p>Some description for recommendation 2</p>
                                </div>
                            </div>
                        </li>
                        <li className="glide__slide">
                            <div className="overflow-hidden ">
                                <div className="aspect-square w-full relative overflow-hidden rounded-xl  ">
                                    <Image
                                        className="object-cover h-full w-full group-hover:scale-110 transition"
                                        src={"https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}
                                        alt="Recommendation 3"
                                        fill
                                    />
                                </div>
                                <div className="recommendation-content">
                                    <h3 className="text-xl font-bold">Recommendation 3</h3>
                                    <p>Some description for recommendation 3</p>
                                </div>
                            </div>
                        </li>
                        <li className="glide__slide">
                            <div className="overflow-hidden ">
                                <div className="aspect-square w-full relative overflow-hidden rounded-xl  ">
                                    <Image 
                                    className="object-cover h-full w-full group-hover:scale-110 transition"
                                    src={"https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} 
                                    alt="Recommendation 3" 
                                    fill 
                                    />
                                </div>
                                <div className="recommendation-content">
                                    <h3 className="text-xl font-bold">Recommendation 3</h3>
                                    <p>Some description for recommendation 3</p>
                                </div>
                            </div>
                        </li>
                        {/* Add more recommendation slides as needed */}
                    </ul>
                </div>

                {/* Next Button */}
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <BiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationsSection;
