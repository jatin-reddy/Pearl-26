

export type Event = {
  id: string;
  name: string;
  category: string;
  image?: { src: string; alt: string };
};

type EventCardProps = {
  event: Event;
};



function EventCard({ event }: EventCardProps) {

    const name=event.name
    const words=name.split(" ")
  return (
    <div className="relative w-full group cursor-pointer">
   
      <div className="card-shape relative h-[400px] w-full overflow-hidden bg-black border border-zinc-800 transition-all duration-300 group-hover:border-lime-400">
        {/* Image */}
        {event.image?.src ? (
          <img
            src={event.image.src}
            alt={event.image.alt || event.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            No image
          </div>
        )}
        

        
      </div>

    
      <div className="absolute bottom-4 right-5 z-10 flex gap-2">
       
          {/* Event name */}
          <span className="text-white font-small text-lg tracking-wide">
            {words[0]}
          </span>
          <span className="text-[#F3D300] font-small text-lg tracking-wide">
            {words[1]}
          </span>
       
      </div>
    </div>
  );
}

export default EventCard;