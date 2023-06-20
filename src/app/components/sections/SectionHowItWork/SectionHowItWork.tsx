"use client"

import NcImage from "@/app/components/shared/NcImage/NcImage";
import Image from "next/image";
import Heading from "../../Heading";


export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: string;
    imgDark?: string;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: "/images/how/HIW2-1.png",
    title: "Smart search",
    desc: "Name the area or type of home you are looking for the search bar. Our app will find you the perfect match.",
  },
  {
    id: 2,
    img: "/images/how/HIW2-2.png",
    title: "Choose property",
    desc: "From the number of options our app will provide, you can select any property that you like to explore.",
  },
  {
    id: 3,
    img: "/images/how/HIW2-3.png",
    title: "Book you property",
    desc: "Find a home or space from our search bar. Enter your specific location, property type and price range.",
  },
];

const SectionHowItWork: React.FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading
        center
        title="How it work"
        subtitle="Book safely"
      />
      <div className="mt-20 relative grid md:grid-cols-3 gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-10"
          src="/images/how/VectorHIW.svg"
          width={60}
          height={60}
          alt=""
        />
        {data?.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            {item.imgDark ? (
              <>
                <NcImage
                  containerClassName="dark:hidden block mb-8 max-w-[200px] mx-auto"
                  src={item.img}
                />
                <NcImage
                  containerClassName="hidden dark:block mb-8 max-w-[200px] mx-auto"
                  src={item.imgDark}
                />
              </>
            ) : (
              <NcImage
                containerClassName="mb-8 max-w-[200px] mx-auto"
                src={item.img}
              />
            )}
            <div className="text-center mt-auto">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
