
"use client"
import { useRef } from "react";


import Container from '@/app/components/Container';
import SectionMain from './components/sections/Main';
import SectionVideos from './components/sections/SectionVideos';
import SectionHowItWork from "./components/sections/SectionHowItWork/SectionHowItWork";
import SectionBecomeAnAuthor from "./components/sections/SectionBecomeAnAuthor/SectionBecomeAnAuthor";

export const dynamic = 'force-dynamic';

const Home = async () => {
  const sectionVideosRef = useRef<HTMLDivElement>(null);

  const handleWatchVideoClick = () => {
    if (sectionVideosRef.current) {
      sectionVideosRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <Container>
      <div className='max-w-screen-2xl mx-auto px-1 sm:px-4 '>
        <SectionMain className='mt-6' onWatchVideoClick={handleWatchVideoClick} />
        <div ref={sectionVideosRef} className="mt-6">
          <SectionVideos />
        </div>
        <div className="py-24 my-6 rounded-2xl bg-gradient-to-b from-secondary/20 to-white">
          <SectionHowItWork />
        </div>
        <div className="py-24 px-10 my-6 rounded-2xl bg-gradient-to-t from-green-500/20 to-white">
          <SectionBecomeAnAuthor />
        </div>

      </div>
    </Container>
  )
};

export default Home;
