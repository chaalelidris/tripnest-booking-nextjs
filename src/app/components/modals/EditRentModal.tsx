'use client';

import { useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

import useEditRentModal from '@/hooks/useEditRentModal';

/* Next */
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

/* utils */
import { ImgType, imagesUpload } from '@/libs/utils/ImagesUpload';

/* components */
import Modal from '@/app/components/modals/Modal';
import Input from '@/app/components/inputs/Input';
import Heading from '@/app/components/Heading';
import Counter from '@/app/components/inputs/Counter';
import ImageUpload from '@/app/components/inputs/ImageUpload';
import WilayaSelect, { WilayaSelectValue } from "@/app/components/inputs/WilayaSelect";
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CountrySelect, { CountrySelectValue } from '@/app/components/inputs/CountrySelect';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing } from '@/types';
import useContries from '@/hooks/useCountries';
import useWilayas from '@/hooks/useWilayas';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  WILAYA = 2,
  INFO = 3,
  IMAGES = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

interface IEditRentModal { }
const EditRentModal: React.FC<IEditRentModal> = () => {
  const [categoryError, setCategoryError] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const editRentModal = useEditRentModal();

  const { getAll, getByValue } = useContries();
  const { getAllWilayas, getWilayaByValue } = useWilayas();

  const listing: SafeListing | null = useMemo(
    () => editRentModal.listing,

    [editRentModal.listing]
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  // Set the initial form values when the component mounts
  useEffect(() => {
    setValue('id', String(listing?.id));
    setValue('category', String(listing?.category));
    setValue('location', listing?.locationValue ? getByValue(listing?.locationValue) : null);
    setValue('wilayaLocation', listing?.wilayaLocationValue ? getWilayaByValue(listing?.wilayaLocationValue) : null);
    setValue('guestCount', listing?.guestCount);
    setValue('bathroomCount', listing?.bathroomCount);
    setValue('roomCount', listing?.roomCount);
    setValue('images', listing?.images);
    setValue('price', listing?.price);
    setValue('title', listing?.title);
    setValue('description', listing?.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing, setValue]);


  const category = watch('category');
  const location = watch('location');
  const wilayaLocation = watch('wilayaLocation');
  const guestCount = watch('guestCount');
  const bathroomCount = watch('bathroomCount');
  const roomCount = watch('roomCount');

  const Map = useMemo(() => dynamic(() => import('@/app/components/Map'),
    {
      ssr: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const WilayaMap = useMemo(() => dynamic(() => import('@/app/components/Map'), {
    ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [wilayaLocation]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const validateStep = (step: STEPS, condition: boolean, errorMessage: string) => {
    if (!condition) {
      toast.error(errorMessage);
      if (step === STEPS.CATEGORY) {
        setCategoryError(true);
      }
      return false;
    }
    return true;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    switch (step) {
      case STEPS.CATEGORY:
        if (!validateStep(step, category !== '', 'Please pick a category!')) {
          return;
        }
        break;
      case STEPS.LOCATION:
        if (!validateStep(step, location !== null, 'Please choose a location!')) {
          return;
        }
        break;
      case STEPS.WILAYA:
        if (!validateStep(step, wilayaLocation !== null, 'Please choose a wilaya!')) {
          return;
        }
        break;
      case STEPS.IMAGES:
        if (!validateStep(step, images.length > 0, 'Please add listing images!')) {
          return;
        }
        break;
      default:
        break;
    }

    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setLoading(true);

    try {
      let media: ImgType[] = [];
      if (images.length > 0) {
        media = await imagesUpload(images);
      }

      await axios.put(`/api/listings`, {
        ...data,
        images: media,
      });

      toast.success('Listing updated!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      editRentModal.onClose();
    } catch (err) {
      console.log(err);
      toast.error(`Something went wrong: ${err}`);
      setStep(STEPS.CATEGORY);
    } finally {
      setLoading(false);
      setImages([]);
    }
  };


  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Update';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh] '>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              icon={item.icon}
              label={item.label}
              onClick={(category) => {
                setCategoryError(false);
                setCustomValue('category', category)
              }}
              selected={category === item.label}
              categoryError={categoryError}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} zoom={4} />
      </div>
    );
  }

  if (step === STEPS.WILAYA) {
    let center = wilayaLocation && [wilayaLocation?.latitude, wilayaLocation?.longitude];

    location?.label == "Algeria" ? (bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your wilaya located?"
          subtitle="Help guests find you!"
        />
        <hr />
        <WilayaSelect
          value={wilayaLocation}
          onChange={(value) => setCustomValue('wilayaLocation', value)} />

        <WilayaMap center={center} zoom={10} />
      </div>
    )) : (bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ooops! Currently we are providing rental services only for Algeria country"
          subtitle=""
        />
        <hr />
        <p className='text-rose-500'>Please click back and select algeria country</p>

      </div>
    ));
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have'
        />
        <Counter
          title='Guests'
          subtitle='How many guests would you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
        <hr />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add photos of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload images={images} setImages={setImages} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  return (
    <Modal
      disabled={loading}
      loading={loading}
      isOpen={editRentModal.isOpen}
      onClose={editRentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Tripnest your trip home'
      body={bodyContent}
    />
  );
};
export default EditRentModal;
