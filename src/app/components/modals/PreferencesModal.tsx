"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import usePreferencesModal from '@/hooks/usePreferencesModal';
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import { categories } from '@/app/components/navbar/Categories';
import { SafePreferences } from '@/types';
import WilayaSelect from '../inputs/WilayaSelect';
import dynamic from 'next/dynamic';
import useWilayas from '@/hooks/useWilayas';

interface PreferencesModalProps {
    currentUserPreferences?: SafePreferences | null;
}

enum STEPS {
    CATEGORY,
    WILAYA,
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ currentUserPreferences = null }) => {
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { getWilayaByValue } = useWilayas();


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            categories: currentUserPreferences?.categories || [],
            wilayaLocation: getWilayaByValue(String(currentUserPreferences?.location)) || null,
        },
    });

    

    const selectedCategories = watch('categories');
    const wilayaLocation = watch('wilayaLocation');

    // Dynamically import WilayaMap component based on wilayaLocation
    const WilayaMap = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [wilayaLocation]);

    const preferencesModal = usePreferencesModal();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [shouldOpenModal, setShouldOpenModal] = useState(selectedCategories.length === 0);

    // Function to set custom form values
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    };

    // Function to handle category selection
    const handleCategoryClick = (category: string) => {
        setCategoryError(false);
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c: any) => c !== category)
            : [...selectedCategories, category];
        setCustomValue('categories', newCategories);
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const submitPreferences: SubmitHandler<FieldValues> = async (data) => {

        try {
            setIsLoading(true);
            if (step === STEPS.CATEGORY) {
                if (selectedCategories.length === 0) {
                    toast.error('Please pick at least one category!');
                    setCategoryError(true);
                    return;
                }
                return onNext();
            }

            const response = await axios.put('/api/preferences', data);
            toast.success('Thanks submission successful');
            setShouldOpenModal(false);
            preferencesModal.onClose();
            setStep(STEPS.CATEGORY);
        } catch (error) {
            toast.error('Submission failed');
            console.error('Submission failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Determine the label for the main action button based on the current step
    const actionLabel = useMemo(() => {
        if (step === STEPS.WILAYA) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    // Determine the label for the secondary action button based on the current step
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    useEffect(() => {
        // Set shouldOpenModal based on whether there are selected categories
        setShouldOpenModal(selectedCategories.length === 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your preferences?"
                subtitle="Please pick one or more categories to help us recommend the best places for you."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            icon={item.icon}
                            label={item.label}
                            onClick={() => handleCategoryClick(item.label)}
                            selected={selectedCategories.includes(item.label)}
                            categoryError={categoryError}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.WILAYA) {
        let center = wilayaLocation && [wilayaLocation.latitude, wilayaLocation.longitude];

        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Choose Your Preferred Wilaya"
                    subtitle="Select prefered wilaya location to personalize your 
                    recommendations for preferred destination."
                />
                <hr />
                <WilayaSelect
                    value={wilayaLocation}
                    onChange={(value) => setCustomValue('wilayaLocation', value)}
                />
                <WilayaMap center={center} zoom={10} />
            </div>
        );
    }

    return (
        <Modal
            loading={isLoading}
            disabled={isLoading}
            isOpen={preferencesModal.isOpen || shouldOpenModal}
            onClose={preferencesModal.onClose}
            onSubmit={handleSubmit(submitPreferences)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Tripnest your trip home"
            body={bodyContent}
        />
    );
};

export default PreferencesModal;

