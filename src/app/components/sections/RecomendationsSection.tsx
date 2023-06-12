"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

import { SafeListing, SafeUser } from "@/types";
import { it } from "node:test";

interface RecommendationsSectionProps {
    className?: string;
    itemClassName?: string;
    itemPerRow?: number;
    currentUser?: SafeUser | null;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
    className = "",
    itemClassName = "",
    itemPerRow = 5,
    currentUser,
}) => {
    const [recommendations, setRecommendations] = useState<SafeListing[]>([]);
    const glideRef = useRef<HTMLDivElement>(null);




    useEffect(() => {
        console.log(glideRef.current);

        const glideConfig = {
            perView: 5,
            gap: 32,
            breakpoints: {
                1280: {
                    perView: 4.5,
                },
                1024: {
                    gap: 20,
                    perView: 3.5,
                },
                768: {
                    gap: 20,
                    perView: 2.5,
                },
                640: {
                    gap: 20,
                    perView: 1.5,
                },
                500: {
                    gap: 20,
                    perView: 1.3,
                },
            },
        };
        if (glideRef.current) {
            const glide = new Glide(glideRef.current, glideConfig);
            glide.mount();

            return () => {
                glide.destroy();
            };
        }
    });

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                if (currentUser?.id) {
                    const response = await fetch(`/api/recommendations`, {
                        method: "POST",
                        body: JSON.stringify({ userId: currentUser.id }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const { recommendations } = await response.json();
                        setRecommendations(recommendations);
                    } else {
                        throw new Error("Failed to fetch recommendations.");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchRecommendations();
    }, [currentUser?.id]);

    if (recommendations.length === 0) {
        return null; // Return null when there are no recommendations
    }

    return (
        <div className={`recommendations-section my-6 ${className}`}>
            <Heading title="Recommended" subtitle="The best places for you" />
            <div className="glide" ref={glideRef}>
                <div className="glide__arrows" data-glide-el="controls">
                    <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <div className="text-gray-800">
                            <BiChevronLeft />
                        </div>
                    </button>
                </div>

                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        {recommendations.map((listing) => (
                            <li className="glide__slide" key={listing.id}>
                                <ListingCard currentUser={currentUser} data={listing} />
                            </li>
                        ))}
                    </ul>
                </div>

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
