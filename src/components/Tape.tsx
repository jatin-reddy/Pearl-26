import { motion } from "motion/react";

const MovingTape = ({
  text = "SOUTH INDIA'S LARGEST CULTURAL FEST",
  // Default colors (Pearl Theme)
  bgColor = "bg-[#FDE047]",
  textColor = "text-[#D946EF]",
  separatorColor = "bg-[#D946EF]",
  speed = 18,
  direction = 1,
}) => {
  // Repeat content to fill screen
  const content = Array(8).fill(text);

  return (
    <div
      className={`w-full overflow-hidden border-y border-black/5 ${bgColor}`}
    >
      <div className="relative flex w-full py-2">
        <motion.div
          className="flex min-w-full items-center whitespace-nowrap"
          animate={{ x: direction === 1 ? "-50%" : "50%" }}
          initial={{ x: "0%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed,
          }}
        >
          {[...content, ...content].map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`
                  mx-4 font-poppins font-bold uppercase tracking-wider
                  ${textColor}
                  text-sm       
                  md:text-sm    
                  lg:text-base  
                `}
              >
                {item}
              </span>

              <div
                className={`
                  mx-2 rounded-full ${separatorColor}
                  h-1.5 w-1.5   
                  md:h-2 md:w-2
                `}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MovingTape;
