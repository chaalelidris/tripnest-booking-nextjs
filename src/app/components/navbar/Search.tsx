"use client";

import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/hooks/useSearchModal";
import useContries from "@/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useContries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Location";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diffTime = differenceInDays(end, start);

      if (diffTime === 0) {
        diffTime = 1;
      }
      return `${diffTime} Night(s)`;
    }

    return "Duration";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className=" border-[1px]
                  w-full
                  md:w-auto
                  py-[7px]
                  rounded-full
                  shadow-md
                  hover:shadow-lg
                  transition
                  cursor-pointer
                  ml-24
                "
    >
      <div
        className=" flex
                    flex-row
                    items-center
                    justify-between
                  "
      >
        <div
          className="
                    text-sm
                    font-semibold
                    px-6
                  text-zinc-800
                    "
        >
          {locationLabel}
        </div>
        <div
          className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x-[1px]
        flex-1
        text-center
        text-zinc-800
        "
        >
          {durationLabel}
        </div>
        <div
          className=" text-sm
                      pl-6
                      pr-2
                      text-gray-600
                      flex 
                      flex-row
                      items-center
                      gap-3
                      "
        >
          <div
            className="hidden 
                          sm:block
                          overflow-ellipsis 
                          whitespace-nowrap 
                          overflow-hidden"
          >
            {guestLabel}
          </div>
          <div
            className="
            p-2
            bg-primary
            rounded-full
            text-white

          "
          >
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
