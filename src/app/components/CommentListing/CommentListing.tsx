import { StarIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import Avatar from "../Avatar";
import { format } from "date-fns";

interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  hasListingTitle?: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  if (!data) {
    return (
      <div
        className={`nc-CommentListing flex space-x-4 ${className}`}
        data-nc-id="CommentListing"
      >
        <div className="pt-0.5">
          <Avatar
            src="/images/placeholder.jpg"
            size={60}
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between space-x-3">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">No Data Available</div>
            </div>
            <div className="flex text-yellow-500">
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
              <StarIcon className="w-4 h-4" />
            </div>
          </div>
          <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
            No comment available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          src={data.avatar }
          size={60}
        />
      </div>
      <div className="flex-grow overflow-ellipsis overflow-hidden">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data.name}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 mt-0.5">
              {formatDate(data.date)}
            </span>
          </div>
          <div className="flex text-neutral-300">
            {[1, 2, 3, 4, 5].map((item) => {
              return (<StarIcon key={item} className={`${data.starPoint >= item ? "w-4 h-4 text-yellow-500" : "w-4 h-4 "} `} />)
            })}

          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 ">
          {data.comment}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
