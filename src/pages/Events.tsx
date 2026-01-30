import Header from  "../components/EventsPage/Header";
import Filter from "../components/EventsPage/Filter";
import EventList from "../components/EventsPage/EventList";
import { useState } from "react";
import type { EventCategory } from "../components/EventsPage/Filter";
import {motion} from "motion/react";



const Events = () => {

  const [category, setCategory] = useState<EventCategory>("all");
  
  

  return (
    <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
     className="min-h-screen flex flex-col " >
      <Header />
      <div className="bg-[#271b46] w-full h-full ">
        <Filter value={category} onChange={setCategory} />
        <motion.div
          className="eventsList py-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>

         <EventList category={category} />
        </motion.div>

      </div>
    
    </motion.div>
  );
};

export default Events;