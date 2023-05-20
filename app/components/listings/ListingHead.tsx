'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import useWilayas from "@/app/hooks/useWilayas";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  wilayaLocationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  wilayaLocationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const { getWilayaByValue } = useWilayas();

  const location = getByValue(locationValue);
  const wilayaLocation = getWilayaByValue(wilayaLocationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}, ${wilayaLocation?.label}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}

export default ListingHead;