import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import ButtonCircle from '@/app/components/buttons/ButtonCircle';
import CommentListing from '@/app/components/CommentListing/CommentListing';
import FiveStartIconForRate from '@/app/components/FiveStartIconForRate/FiveStartIconForRate';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import TextArea from '../inputs/TextArea';
import ButtonSecondary from '../buttons/ButtonSecondary';

const Reviews = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            review: "",
        }
    });

    const renderReviews = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* Content */}
                <div className="space-y-5">
                    <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
                    <div className="relative">
                        <TextArea
                            id='rating'
                            label='Rating'
                            register={register}
                            errors={errors}
                        />
                        <ButtonCircle
                            className="absolute bg-primary right-2 top-1/2 transform -translate-y-1/2"
                            size=" w-12 h-12 "
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </div>
                </div>

                {/* comment */}
                <div className="divide-y divide-neutral-200">
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    {/* <div className="pt-8">
                        <ButtonSecondary>View more 20 reviews</ButtonSecondary>
                    </div> */}
                    <Button
                        outline
                        label='View more 20 reviews'
                        onClick={() => { }}
                        width="1/2"
                    />
                </div>
            </div>
        )
    }

    return (
        renderReviews()
    )
}

export default Reviews