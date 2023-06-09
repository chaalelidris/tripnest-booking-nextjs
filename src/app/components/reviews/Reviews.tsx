import React, { useEffect, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/app/components/Button';
import ButtonCircle from '@/app/components/buttons/ButtonCircle';
import CommentListing from '@/app/components/CommentListing/CommentListing';
import FiveStartIconForRate from '@/app/components/FiveStartIconForRate/FiveStartIconForRate';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import TextArea from '@/app/components/inputs/TextArea';
import ButtonSecondary from '@/app/components/buttons/ButtonSecondary';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from "react"
import { SafeReview } from '@/types';

interface Ireviews {
    listingId: string;
}

const Reviews = ({ listingId }: Ireviews) => {
    const [reviews, setReviews] = useState<SafeReview[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            rating: 3,
            comment: "",
        }
    });
    const rating = watch("rating");

    const setRatingValue = useCallback(
        (id: string, value: any) => {
          setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        },
        [setValue]
      );
      





    useEffect(() => {
        /* Get All Reviews */
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/listings/${listingId}/reviews`);
                const fetchedReviews = response.data;
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error('Failed to fetch reviews');
            } finally {
            }
        };
        fetchReviews();
    }, [listingId]);




    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const res = axios.post(`/api/listings/${listingId}/reviews`,
            data).then((response) => {
                console.log(response);
                const newReview = response.data;
                setReviews((prevReviews) => [newReview, ...prevReviews]);
                //toast.success('Review Added');
                reset();
            })
            .catch((err) => {
                console.error('Error submitting review:', err);
                toast.error('Failed to submit review');
            })
            .finally(() => {
                setIsLoading(false);
            });

        toast.promise(
            res,
            {
                loading: "Submitting review",
                error: "An error ocuured",
                success: "Review Added"
            }
        )
    }

    const LoadingSpinner = () => (
        <svg
            className="absolute animate-spin right-4 top-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );



    return (
        <div className="listingSection__wrap">
            {/* HEADING */}
            <h2 className="text-2xl font-semibold">Reviews ({reviews.length} reviews)</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

            {/* Content */}
            <div className="space-y-5">
                <FiveStartIconForRate defaultPoint={rating} setRatingValue={setRatingValue} iconClass="w-6 h-6" className="space-x-0.5" />
                <div className="relative">
                    <TextArea
                        id='comment'
                        label='Feedback'
                        register={register}
                        errors={errors}
                        required
                    />
                    {/* Submit Review */}
                    <ButtonCircle
                        disabled={isLoading}
                        onClick={handleSubmit(onSubmit)}
                        className="absolute bg-primary right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                        size=" w-12 h-12"
                    >
                        {isLoading ? <LoadingSpinner /> : <ArrowRightIcon className="w-5 h-5" />}
                    </ButtonCircle>
                </div>
            </div>

            {/* comment */}
            <div className="divide-y divide-neutral-200">
                {reviews.map((review) => (
                    <CommentListing key={review.id}
                        className="py-8"
                        data={{
                            name: review.user.name || "Unknown",
                            avatar: review.user?.image || "/public/images/placeholder.jpg",
                            date: review.createdAt,
                            comment: review.comment,
                            starPoint: review.rating,
                        }}
                    />
                ))}
                {/* <div className="pt-8">
                        <ButtonSecondary>View more 20 reviews</ButtonSecondary>
                    </div> */}
            </div>
            <Button
                outline
                label='View more reviews'
                onClick={() => { }}
                width="1/2"
            />
        </div>
    )
}

export default Reviews