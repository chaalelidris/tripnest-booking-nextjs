'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from '@/hooks/useSearchModal';

/* Components */
import Modal from '@/app/components/modals/Modal';
import Heading from '@/app/components/Heading';
import Counter from '@/app/components/inputs/Counter';
import Calendar from '@/app/components/inputs/Calendar';
import WilayaSelect, { WilayaSelectValue } from '@/app/components/inputs/WilayaSelect';
import CountrySelect, { CountrySelectValue } from '@/app/components/inputs/CountrySelect';

enum STEPS {
  LOCATION = 0,
  WILAYA = 1,
  DATE = 2,
  INFO = 3,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>(
    {
      "value": "DZ",
      "label": "Algeria",
      "flag": "🇩🇿",
      "latlng": [
        28,
        3
      ],
      "region": "Africa"
    });
  const [wilayaLocation, setWilayaLocation] = useState<WilayaSelectValue>()
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(() =>
    dynamic(() => import('@/app/components/Map'),
      {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location],
  );

  const WilayaMap = useMemo(() =>
    dynamic(() => import('@/app/components/Map'),
      {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wilayaLocation],
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      wilayaLocationValue: wilayaLocation?.label,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/listings/',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    searchModal.onClose();
    router.push(url);
    setStep(STEPS.LOCATION);
  }, [
    step,
    searchModal,
    location,
    wilayaLocation,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} zoom={4} />
    </div>
  );

  if (step === STEPS.WILAYA) {
    let center = wilayaLocation && [wilayaLocation?.latitude, wilayaLocation?.longitude];

    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your wilaya located?"
          subtitle="Help guests find you!"
        />
        <hr />
        <WilayaSelect
          value={wilayaLocation}
          onChange={(value) => setWilayaLocation(value as WilayaSelectValue)} />

        <WilayaMap center={center} zoom={10} />
      </div>
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place!' />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests are coming?'
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you need?'
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bahtrooms do you need?'
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title='Filters'
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
