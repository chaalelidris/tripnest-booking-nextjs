"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

import usePreferencesModal from '@/hooks/usePreferencesModal';
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import { categories } from '@/app/components/navbar/Categories';
import { SafeUser } from '@/types';


export interface PreferencesModalFormData {
    categories: string[];
}

interface PreferencesModalProps {
    currentUser?: SafeUser | null;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ currentUser = null }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PreferencesModalFormData>({
        defaultValues: {
            categories: currentUser?.preferences || [],
        },
    });

    const selectedCategories = watch('categories');

    /* States */
    const preferencesModal = usePreferencesModal();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [shouldOpenModal, setShouldOpenModal] = useState(selectedCategories.length === 0); // Flag to track whether to open the modal


    const setCustomValue = (id: 'categories', value: any) => {
        setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    };


    const handleCategoryClick = (category: string) => {
        setCategoryError(false);
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setCustomValue('categories', newCategories);
    };

    const submitPreferences = async (data: PreferencesModalFormData) => {
        try {
            setIsLoading(true);
            if (selectedCategories.length === 0) {
                toast.error('Please pick at least one category!');
                setCategoryError(true);
                return;
            }

            const response = await axios.put('/api/preferences', { categories: selectedCategories });
            toast.success('Thanks submission successful');
            setShouldOpenModal(false);
            preferencesModal.onClose();
            //console.log('Submission successful:', response.data);
        } catch (error) {
            toast.error('Submission failed');
            console.error('Submission failed:', error);
        } finally {

            setIsLoading(false);
        }
    };

    useEffect(() => {
        setShouldOpenModal(selectedCategories.length === 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    const bodyContent = (
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

    return (
        <Modal
            loading={isLoading}
            disabled={isLoading}
            isOpen={preferencesModal.isOpen || shouldOpenModal}
            onClose={preferencesModal.onClose}
            onSubmit={handleSubmit(submitPreferences)}
            actionLabel="Next"
            title="Tripnest your trip home"
            body={bodyContent}
        />
    );
};

export default PreferencesModal;
