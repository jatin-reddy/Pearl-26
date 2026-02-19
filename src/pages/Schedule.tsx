import SectionHeading from "../components/SectionHeading";
import LiveNow from "../components/Schedule/LiveNow";
import Timeline from "../components/Schedule/Timeline";

const Schedule = () => {
  return (
    <div className="min-h-screen bg-[#634AA7] pt-28 pb-20 relative overflow-hidden">
        {/* Halftone Pattern Overlay (CSS only) */}
        <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
                backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
                backgroundSize: '20px 20px'
            }}
        />

      <div className="relative z-10 container mx-auto">
        <SectionHeading text1="SCHEDULE" text2="" ghostText="SCHEDULE" />
        <LiveNow />
        <Timeline />
      </div>
    </div>
  );
};

export default Schedule;
