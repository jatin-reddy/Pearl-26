import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import MovingTape from "../components/Tape";

// --- Types ---
type TeamCategory = "Council" | "StuCCA" | "Cultural Senate" | "Web Team";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface TeamSubgroup {
  title: string;
  members: TeamMember[];
}

// --- Image Handling ---

// GLOBAL CACHE: Keeps track of images that have already loaded once.
const loadedImageCache = new Set<string>();

const teamImages = import.meta.glob("../assets/team/*.{png,webp}", {
  eager: true,
  query: { w: 400, format: "webp" },
  import: "default",
}) as Record<string, string>;

const getMemberImage = (name: string): string | undefined => {
  const slug = name.toLowerCase().replace(/\s+/g, "_");
  const allPaths = Object.keys(teamImages);
  const matchedPath = allPaths.find(p => p.toLowerCase().includes(slug));
  return matchedPath ? teamImages[matchedPath] : undefined;
};

// --- Data ---
const teamData: Record<TeamCategory, TeamSubgroup[]> = {
  Council: [
    {
      title: "President, Student Union Council",
      members: [{ name: "Satyaraj Shivareddypeta", role: "General Secretary", image: "satya_raj" }],
    },
    {
      title: "Fest Convener",
      members: [{ name: "Varun Karthik", role: "Pearl'26 Convener", image: "Varun_Karthik" }],
    },
    {
      title: "Election Commission (EC)",
      members: [
        { name: "Manav Ajith", role: "Executive Member" },
        { name: "Haneesh Kankipati", role: "Executive Member" },
        { name: "Gayathri Krishna", role: "Executive Member" },
      ],
    },
    {
      title: "Corroboration and Review Committee (CRC)",
      members: [
        { name: "Devansh Sahu", role: "Executive Member" },
        { name: "ADITYA VIJAY", role: "Executive Member" },
      ],
    },
    {
      title: "SWD Nucleus",
      members: [
        { name: "Aryan Dalmia", role: "Coordinator" },
        { name: "Prasanna P E", role: "Coordinator" },
      ],
    },
    {
      title: "Organising Committee",
      members: [
        { name: "Sanjay S", role: "Operations and Coordination Head" },
        { name: "Abhijeeth Kurapati", role: "OC head" },
      ],
    },
  ],
  StuCCA: [
    {
      title: "Students' Council of Cultural Activities (StuCCA)",
      members: [
        { name: "Sahil Salvee", role: "Department of Technical Arts" },
        { name: "Harini Yadavilli", role: "Arts and Deco (AnD)" },
        { name: "Sri Niketh Mulagada", role: "Department of Controlz" },
        { name: "Shahil Singh", role: "Department of Photography" },
        { name: "Garv Chachan", role: "Department of Security and Hospitality" },
        { name: "Anirudh Peddinti", role: "Department of Public Relations" },
        { name: "Archit Khandelwal", role: "Department of Professional Events" },
        { name: "Saif", role: "Department of Visual Effects" },
        { name: "Marmik Sapovadia", role: "Lights and Sounds Department" },
        { name: "Malav Patel", role: "Department of Recreational Activities" },
      ],
    },
  ],
  "Cultural Senate": [
    {
      title: "Cultural Senate",
      members: [
        { name: "Krishna Saxena", role: "AMP Secretary" },
        { name: "Alekhya Sai Kamasani", role: "Fashion Club Secretary" },
        { name: "Rishit Shah", role: "Journal Club Secretary" },
        { name: "Ritwik Sethi", role: "Designers Anonymous Secretary" },
        { name: "Aayushman Modi", role: "Gourmet Club Secretary" },
        { name: "Shreya Agrawal", role: "Hindi Tarang Secretary" },
        { name: "Aswanth Ganesan", role: "Movie Club Secretary" },
        { name: "Anish Kumar Pidugu", role: "Swaranjali Secretary" },
        { name: "Rishabh Singh", role: "Comedy Club Secretary" },
        { name: "Akshar Varma", role: "Crimson Curtain Secretary"},
        { name: "Bhargava Atcha", role: "ELAS Secretary" },
        { name: "Sidhant Subramanian", role: "Music Club Secretary" },
        { name: "Rounak Singh", role: "Photography Club Secretary" },
        { name: "Aditya Kandpal", role: "Quiz Club Secretary" },
        { name: "Satyam Kumar Singh", role: "SaFL Secretary" },
        { name: "Atharva Deshkar", role: "VFx Club Secretary" },
        { name: "Shreekari", role: "Music Club Manager" },
        { name: "Vidith Bothra", role: "BITS Embryo President" },
        { name: "Shridali Singh", role: "MHSG President" },
        { name: "Rhythm Bulani", role: "Esports Club Secretary" },
        { name: "Shauryearaj Yuvraj Neema Kumar", role: "Paradox Joint Secretary" },
        { name: "Jayditya Kabra", role: "Cypher Secretary" },
      ],
    },
  ],
  "Web Team": [
    {
      title: "Web Team",
      members: [
        { name: "Jatin Reddy", role: "Web Development Lead (DoTA)" },
      ],
    },
  ],
};

// --- Components ---

const TeamMemberCard = ({ member, priority = false }: { member: TeamMember, priority?: boolean }) => {
  const imageUrl = getMemberImage(member.image || member.name);
  
  const [isLoaded, setIsLoaded] = useState(() => {
    return imageUrl ? loadedImageCache.has(imageUrl) : false;
  });

  const handleLoad = () => {
    if (imageUrl) loadedImageCache.add(imageUrl);
    setIsLoaded(true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      // FIX 1: If priority is true, animate immediately (don't wait for scroll/view)
      animate={priority ? { opacity: 1, scale: 1 } : undefined}
      // FIX 2: Only use whileInView for non-priority (lower down) items
      whileInView={!priority ? { opacity: 1, scale: 1 } : undefined}
      // FIX 3: Removed negative margin. 'once: true' is enough.
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group p-4"
    >
      <div className="bg-[#E5E5E5] border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-2 group-hover:-translate-x-1">
        <div className="aspect-square bg-white border-2 border-black flex items-center justify-center overflow-hidden mb-4 relative">
          
          {!isLoaded && imageUrl && (
             <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                <span className="font-pearl text-black/5 text-xl tracking-tighter">PEARL'26</span>
             </div>
          )}

          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={member.name} 
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onLoad={handleLoad}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 
                ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-pearl text-black/10 text-4xl select-none text-center px-4">PEARL'26</span>
            </div>
          )}
        </div>
        <div className="text-center font-rumba">
          <h4 className="font-bold text-xl uppercase tracking-widest text-black leading-wider mb-1">{member.name}</h4>
          <p className="text-xs text-gray-700 font-bold uppercase tracking-widest leading-wider">{member.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Team() {
  const [activeTab, setActiveTab] = useState<TeamCategory>("Council");
  const categories: TeamCategory[] = ["Council", "StuCCA", "Cultural Senate"];

  return (
    <div className="min-h-screen bg-[#F25C9A]">
      <MovingTape />
      <div className="py-24 px-4 sm:px-8">
        <SectionHeading
          text1="OUR"
          text2="TEAM"
          ghostText="THE CREW"
          text1Color="text-white"
          text2Color="text-[#F3D300]"
        />

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 my-12 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-8 py-3 font-pearl text-lg md:text-xl uppercase tracking-widest transition-all duration-200 border-4 border-black
              ${
                activeTab === cat
                  ? "bg-[#F3D300] text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
                  : "bg-white text-black hover:bg-white/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-20"
          >
            {teamData[activeTab].map((subgroup, idx) => (
              <div key={idx} className="flex flex-col items-center gap-10">
                <h3 className="font-rumba text-white text-3xl md:text-5xl text-center tracking-widest leading-none drop-shadow-[5px_5px_0px_rgba(0,0,0,0.9)]">
                  {subgroup.title}
                </h3>
                <div className={
                  subgroup.members.length > 4
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
                    : "flex flex-wrap justify-center gap-4 w-full"
                }>
                    {subgroup.members.map((member, mIdx) => (
                      <div key={mIdx} className={subgroup.members.length > 4 ? "" : "w-full sm:w-72 lg:w-80"}>
                        {/* We pass priority to the first 8 items. 
                          This tells the card: "You are at the top, show yourself immediately!" 
                        */}
                        <TeamMemberCard member={member} priority={mIdx < 8} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}