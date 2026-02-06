// 1. Image Imports
import movieMobile from "../assets/headliners/KaleidoscopeMobile.jpeg";
import cypherMobile from "../assets/headliners/cypher_mobile.jpeg";
import comedyMobile from "../assets/headliners/comediMobile (1).jpeg";
import fashionMobile from "../assets/headliners/fashionMobile.jpeg";
import dramaMobile from "../assets/headliners/dramaticMobile.jpeg";
import musicMobile from "../assets/headliners/tddwpMobile.jpeg";

export interface HeadlinerEvent {
  id: string;
  number: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  ctaLabel?: string;
  styles: {
    baseColor: string;
    stroke: string;
    boxColor: string;
  };
}

export const eventData: { headlinerEvents: HeadlinerEvent[] } = {
  headlinerEvents: [
    {
      id: "hl-kaleidoscope",
      number: "01",
      title: "KALEIDOSCOPE",
      description: "Frames that speak. A national short film battle where storytellers weave cinematic magic around a central theme.",
      image: {
        src: movieMobile,
        alt: "Camera film reel and cinema concept"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    },
    {
      id: "hl-terpsichore",
      number: "02",
      title: "TERPSICHORE",
      description: "Sync. Rhythm. Rebellion. The ultimate western group dance showdown where top crews battle for dominance.",
      image: {
        src: cypherMobile,
        alt: "Hip hop dancers performing"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    },
    {
      id: "hl-haha-hunt",
      number: "03",
      title: "HAHA HUNT",
      description: "The hunt for the next comic genius. Armed with just a mic, performers battle to be the last one laughing.",
      image: {
        src: comedyMobile,
        alt: "Microphone on a dark stage"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    },
    {
      id: "hl-till-deaf",
      number: "04",
      title: "TILL DEAF DO WE PART",
      description: "Amps cranked to eleven. The country's best semi-pro bands collide in a high-voltage sonic battle.",
      image: {
        src: musicMobile,
        alt: "High energy music festival"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    },
    {
      id: "hl-glitterati",
      number: "05",
      title: "GLITTERATI",
      description: "High fashion meets high fantasy. A runway spectacle of glamour, mystique, and ethereal elegance.",
      image: {
        src: fashionMobile,
        alt: "Fashion model on runway"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    },
    {
      id: "hl-nukkad-natak",
      number: "06",
      title: "NUKKAD NATAK",
      description: "The street is the stage. Raw energy and bold scripts echo through the crowd in this battle of voices.",
      image: {
        src: dramaMobile,
        alt: "Street play performance"
      },
      styles: {
        baseColor: "bg-[#E5E5E5]",
        stroke: "#22D3EE",
        boxColor: "bg-[#F0ABFC]"
      }
    }
  ]
};