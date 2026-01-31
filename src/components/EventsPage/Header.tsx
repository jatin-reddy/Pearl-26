
import { useState,useRef } from 'react';
import { useScroll } from 'motion/react';
import SectionHeading from '../SectionHeading';
import eventData from "../../utils/eventData.json";


type HeadlinerEvent = {
    id: string;
    title: string;
    description: string;
    ctaLabel?: string;
    image?: { src: string; alt: string };
  };

function Header() {

  const sectionRef = useRef<HTMLElement | null>(null);
  

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });


    const headlinerEvents = (eventData as { headlinerEvents: HeadlinerEvent[] }).headlinerEvents ?? [];

  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const total = headlinerEvents.length;
  const safeIndex = total > 0 ? ((activeEventIndex % total) + total) % total : 0;
  const activeEvent = total > 0 ? headlinerEvents[safeIndex] : null;

  const goPrev = () => {
    if (total <= 1) return;
    setActiveEventIndex((i) => (i - 1 + total) % total);
  };

  const goNext = () => {
    if (total <= 1) return;
    setActiveEventIndex((i) => (i + 1) % total);
  };

  return (
    <div className="bg-[#634AA7] w-full flex flex-col" ref={sectionRef as React.RefObject<HTMLDivElement>}>
    <SectionHeading
      text1="Our"
      text2="Events"
      ghostText="Our Events"
      text1Color="text-[#FFFFFF]"
      text2Color="text-[#F3D300]"
      externalProgress={scrollYProgress}
    />

    <div className="headlinerEventsContainer flex flex-col gap-10 max-md:gap-5 mb-20 px-24">
      <h2 className="text-4xl text-white font-body font-light py-12 flex justify-center items-center max-md:text-lg">
        HEADLINER EVENTS
      </h2>

      {activeEvent ? (
        <div className="headlinerEventsContent flex gap-30 max-md:gap-10 max-md:flex-col justify-center items-center max-md:px-10">
          <div className="eventImage flex items-center gap-10 ">
            <div className="eventCard bg-white h-[416px] w-[695px] shadow-[14px_14px_0_0_rgba(0,0,0,1)] overflow-hidden max-md:w-[200px] max-md:h-[180px] max-md:shadow-[8px_8px_0_0_rgba(0,0,0,1)] "> 
              {activeEvent.image?.src ? (
                <img
                  src={activeEvent.image.src}
                  alt={activeEvent.image.alt || activeEvent.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/60 font-body">
                  No image
                </div>
              )}
            </div>

            {/* Arrow controls beside the event card */}
            <div className="flex flex-col gap-6">
              {/* UP */}
              <button
                type="button"
                aria-label="Previous event"
                disabled={total <= 1}
                className="h-[116px] w-[118px] max-md:h-[50px] max-md:w-[52px] bg-[#FFEC6F] shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goPrev}
              >
                <span
                  className="block w-0 h-0"
                  style={{
                    borderLeft: '14px solid transparent',
                    borderRight: '14px solid transparent',
                    borderBottom: '22px solid #000',
                  }}
                />
              </button>

              {/* DOWN */}
              <button
                type="button"
                aria-label="Next event"
                disabled={total <= 1}
                className="h-[116px] w-[118px] max-md:h-[50px] max-md:w-[52px] bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goNext}
              >
                <span
                  className="block w-0 h-0"
                  style={{
                    borderLeft: '14px solid transparent',
                    borderRight: '14px solid transparent',
                    borderTop: '22px solid #000',
                  }}
                />
              </button>
            </div>
          </div>

          <div className="eventDetails flex flex-col gap-6 w-[400px] max-md:px-10 max-md:items-center">
            <h3 className="relative text-3xl max-md:text-lg font-bold font-pearl font-stretch-semi-expanded">
              <span className="absolute left-0 top-0 translate-y-[6px] text-black tracking-wider select-none pointer-events-none">
                {activeEvent.title}
              </span>
              <span className="relative text-white tracking-wider ">{activeEvent.title}</span>
            </h3>

            <p className="text-white font-medium font-body">{activeEvent.description}</p>

            {activeEvent.ctaLabel ? (
              <button
                type="button"
                className="w-fit bg-[#FA549D] text-white px-6 py-3 font-body shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
              >
                {activeEvent.ctaLabel}
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-white font-body">No events found.</p>
      )}
    </div>
  </div>
  )
}

export default Header
