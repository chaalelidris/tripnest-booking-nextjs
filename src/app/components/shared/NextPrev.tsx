import React, { FC } from "react";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';


export interface NextPrevProps {
  className?: string;
  currentPage?: number;
  totalPage?: number;
  btnClassName?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  onlyNext?: boolean;
  onlyPrev?: boolean;
}

const NextPrev: FC<NextPrevProps> = ({
  className = "",
  onClickNext = () => { },
  onClickPrev = () => { },
  btnClassName = "w-10 h-10",
  onlyNext = false,
  onlyPrev = false,
}) => {
  return (
    <div
      className={`nc-NextPrev relative flex items-center text-neutral-900 dark:text-neutral-300 ${className}`}
      data-nc-id="NextPrev"
      data-glide-el="controls"
    >
      {!onlyNext && (
        <button
          className={`${btnClassName} ${!onlyPrev ? "mr-[6px]" : ""
            } bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 transform-gpu transition-all hover:scale-110 ease-in-out`}
          onClick={onClickPrev}
          title="Prev"
          data-glide-dir="<"
        >
          <BiChevronLeft />
        </button>
      )}
      {!onlyPrev && (
        <button
          className={`${btnClassName} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-300 transform-gpu transition-all hover:scale-110 ease-in-out`}
          onClick={onClickNext}
          title="Next"
          data-glide-dir=">"
        >
          <BiChevronRight />
        </button>
      )}
    </div>
  );
};

export default NextPrev;




























/* import { FC } from 'react'
interface NextPrevProps {
  className: string;
}
const NextPrev: FC<NextPrevProps> = ({
  className="",
}) => {
  return (
    <div className="glide__arrows" data-glide-el="controls">
      <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
        <BiChevronLeft />
      </button>
      <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
        <BiChevronRight />
      </button>
    </div>
  )
}

export default NextPrev */