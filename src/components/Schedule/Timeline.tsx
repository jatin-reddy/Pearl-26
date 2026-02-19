import { useState } from "react";
import { scheduleData } from "../../data/schedule";
import clsx from "clsx";

const Timeline = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);

  const events = scheduleData.filter((e) => e.day === activeDay);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 font-grotesk">
      {/* Date Header - Kept the main header strict as well */}
      <div className="flex justify-center mb-8">
        <div className="relative">
            <div className="bg-white border-4 border-black px-12 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center">
                <h1 className="text-6xl md:text-7xl font-pearl text-[#2A1B5E] leading-none">DAY {activeDay}</h1>
                <span className="font-rumba text-3xl text-[#4FD1C5] -mt-2">
                  {activeDay === 1 ? "FEB 20TH" : activeDay === 2 ? "FEB 21ST" : "FEB 22ND"}
                </span>
            </div>
        </div>
      </div>

      {/* Tabs - Straightened */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day as 1 | 2 | 3)}
            className={clsx(
              "px-6 py-2 text-2xl font-bold border-4 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              activeDay === day
                ? "bg-[#A020F0] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white text-black"
            )}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* List Headers - Hidden on small mobile, visible on md+ */}
    <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-center">
        <div className="md:col-span-6">
             <div className="bg-[#9370DB] border-4 border-black text-black font-pearl text-3xl py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                EVENT
             </div>
        </div>
        <div className="md:col-span-3">
            <div className="bg-[#9370DB] border-4 border-black text-black font-pearl text-3xl py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                TIME
             </div>
        </div>
        <div className="md:col-span-3">
            <div className="bg-[#9370DB] border-4 border-black text-black font-pearl text-3xl py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ROOM
             </div>
        </div>
    </div>

      {/* Events List */}
      <div className="space-y-3 md:space-y-4">
        {events.map((event) => (
          <div key={event.id} className="grid grid-cols-12 gap-2 md:gap-4 items-stretch">
            
            {/* Mobile: Time comes first for logical flow (Time -> Event -> Room) or user asked for Event Time Room? 
                User asked: "event time and room". 
                Let's try: [Event (Grow)] [Time (Auto)] [Room (Auto)] for mobile.
            */}

            {/* Event Name - Full width on desktop (col-6), prominent on mobile */}
            <div className="col-span-7 md:col-span-6">
              <div className="bg-[#FF4D4D] border-2 md:border-4 border-black p-2 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left md:text-center h-full flex items-center justify-center hover:scale-[1.01] transition-transform">
                <span className="text-white font-bold text-sm md:text-2xl uppercase tracking-wide font-grotesk leading-tight line-clamp-2 md:line-clamp-none">
                    {event.title}
                </span>
              </div>
            </div>

            {/* Time */}
            <div className="col-span-3 md:col-span-3">
               <div className="bg-[#FF9F1C] border-2 md:border-4 border-black p-1 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center h-full flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-xl font-grotesk">{event.time}</span>
              </div>
            </div>

            {/* Room */}
             <div className="col-span-2 md:col-span-3">
               <div className="bg-[#FF9F1C] border-2 md:border-4 border-black p-1 md:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center h-full flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-xl font-grotesk break-all md:break-normal">{event.room}</span>
              </div>
            </div>

          </div>
        ))}

        {events.length === 0 && (
            <div className="text-center text-white text-2xl font-rumba mt-10">
                No events scheduled yet for this day!
            </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
