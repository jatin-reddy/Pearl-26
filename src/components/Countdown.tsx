import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-02-20T00:00:00");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end text-white select-none relative z-20">
      <div className="mb-3 text-right">
        <h3
          className="font-pearl text-xl md:text-3xl uppercase tracking-wider text-[#FF2E93]"
          style={{ textShadow: "3px 3px 0px #000" }}
        >
          BITS Pilani
        </h3>
        <p className="text-xs md:text-sm font-bold tracking-wide uppercase font-sans text-white drop-shadow-md">
          Hyderabad Campus
        </p>
      </div>

      <div className="flex gap-3 md:gap-5">
        <TimeBox value={timeLeft.days} label="DAYS" />
        <TimeBox value={timeLeft.hours} label="HOURS" />
        <TimeBox value={timeLeft.minutes} label="MINS" />
      </div>
    </div>
  );
}

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center transform -skew-x-6">
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-2 py-1 md:px-4 md:py-2 min-w-15 md:min-w-20 flex justify-center">
      <span className="font-pearl text-3xl md:text-5xl text-black">
        {value < 10 ? `0${value}` : value}
      </span>
    </div>

    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white mt-2 font-sans drop-shadow-md skew-x-6">
      {label}
    </span>
  </div>
);
