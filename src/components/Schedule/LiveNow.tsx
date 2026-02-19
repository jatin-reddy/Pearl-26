import { useEffect, useState } from "react";
import type { Event } from "../../data/schedule";
import { scheduleData } from "../../data/schedule";

const LiveNow = () => {
  const [displayEvents, setDisplayEvents] = useState<
    { event: Event; status: "LIVE" | "UP NEXT" }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 1. Calculate relevant events (Live + Upcoming)
    const updateSchedule = () => {
        const now = new Date();
        // const now = new Date("2026-02-20T10:15:00"); // Test Time

        const parseEventDate = (dateStr: string, timeStr: string): Date => {
            const monthMap: Record<string, number> = { "Feb": 1 };
            const [monthName, dayWithSuffix] = dateStr.split(" ");
            const day = parseInt(dayWithSuffix);
            
            const [timePart, modifier] = timeStr.split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);
            if (!minutes) minutes = 0;
            
            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
            if (timeStr === "12 Noon") hours = 12;

            return new Date(2026, monthMap[monthName] || 1, day, hours, minutes);
        };

        const sorted = [...scheduleData]
            .map(e => ({ ...e, startTime: parseEventDate(e.date, e.time) }))
            .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

        const relevant: { event: Event; status: "LIVE" | "UP NEXT" }[] = [];

        for (const event of sorted) {
            const diffMs = now.getTime() - event.startTime.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);

            // Live: Started within last 1 hour
            if (diffHours >= 0 && diffHours < 1) {
                relevant.push({ event, status: "LIVE" });
            }
            // Upcoming: Future events (limit to next 4)
            else if (diffHours < 0) {
                if (relevant.length < 5) {
                    relevant.push({ event, status: "UP NEXT" });
                }
            }
        }

        // If nothing is relevant (end of festival?), maybe show nothing or last event?
        // For now, let's just set what we have.
        setDisplayEvents(relevant);
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 60000); // Re-calculate schedule every min
    return () => clearInterval(interval);
  }, []);

  // 2. Carousel Rotation Effect
  useEffect(() => {
    if (displayEvents.length <= 1) return;

    const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayEvents.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer);
  }, [displayEvents.length]);


  if (displayEvents.length === 0) return null;

  const currentItem = displayEvents[currentIndex] || displayEvents[0];
  const { event, status } = currentItem;

  return (
    <div className="max-w-4xl mx-auto mb-12 px-4">
      {/* Container - Rotation removed for cleaner look if requested, or kept minimal */}
      <div className="relative bg-white border-4 border-black p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ease-in-out">
        <div className="bg-[#FFEB3B] p-6 border-2 border-black flex flex-col items-center justify-center text-center min-h-[200px]">
            
          {/* Live/Next Indicator */}
          <div className={`absolute -top-6 -left-6 px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 ${status === "LIVE" ? "bg-[#FF4D4D] animate-pulse" : "bg-[#4FD1C5]"}`}>
            <span className={`font-pearl text-xl tracking-wider ${status === "LIVE" ? "text-white" : "text-black"}`}>
                {status === "LIVE" ? "LIVE NOW!" : "COMING UP"}
            </span>
          </div>

          {/* Content with Fade Effect Key (changing key triggers React re-render of node) */}
          <div key={event.id} className="animate-in fade-in zoom-in duration-500 w-full">
            <h2 className="text-4xl md:text-6xl font-rumba text-[#6a1b9a] drop-shadow-sm mb-4 uppercase leading-tight">
                {event.title}
            </h2>
            
            <div className="flex flex-wrap gap-4 justify-center mt-2">
                <div className="bg-black text-white font-bold font-grotesk px-6 py-2 text-xl border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    {event.time}
                </div>
                <div className="bg-[#6a1b9a] text-white font-bold font-grotesk px-6 py-2 text-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Room: {event.room}
                </div>
            </div>
            {/* Day indicator for context */}
             <div className="mt-4 text-sm font-bold font-grotesk tracking-widest uppercase opacity-70">
                Day {event.day} — {event.date}
             </div>
          </div>

          {/* Carousel Controls */}
          {displayEvents.length > 1 && (
            <div className="flex items-center justify-between w-full mt-6 px-4 md:px-12">
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(prev => (prev - 1 + displayEvents.length) % displayEvents.length);
                }}
                className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-black flex items-center justify-center hover:bg-[#A020F0] hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:scale-90"
                aria-label="Previous"
              >
                <span className="font-bold text-lg md:text-xl">&lt;</span>
              </button>

              <div className="flex gap-2">
                  {displayEvents.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full border-2 border-black transition-colors duration-300 ${idx === currentIndex ? 'bg-[#6a1b9a]' : 'bg-white'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                  ))}
              </div>
              
              <button
                onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(prev => (prev + 1) % displayEvents.length);
                }}
                className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-black flex items-center justify-center hover:bg-[#A020F0] hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:scale-90"
                aria-label="Next"
              >
                <span className="font-bold text-lg md:text-xl">&gt;</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LiveNow;
