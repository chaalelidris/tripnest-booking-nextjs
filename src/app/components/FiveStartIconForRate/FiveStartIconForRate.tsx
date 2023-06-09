import { StarIcon } from "@heroicons/react/24/solid";
import { FC, useEffect } from "react";
import { useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
  setRatingValue: (id: string, value: any) => void;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4 hover:cursor-pointer",
  defaultPoint = 3,
  setRatingValue,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);


  useEffect(() => {
    setRatingValue("rating", point);
  }, [point, setRatingValue]);
  
  


  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${point >= item || currentHover >= item ? "text-yellow-500" : ""
              } ${iconClass}`}
            onMouseEnter={() => setCurrentHover(() => item)}
            onMouseLeave={() => setCurrentHover(() => 0)}
            onClick={() => {
              setPoint(() => item);
            }}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
