import SectionHeading from "../components/SectionHeading";

const Sponsors = () => {
  return (
    <div className="h-screen bg-[#634AA7] flex flex-col items-center justify-center">
      <SectionHeading
        text1="Our"
        text2="Events"
        ghostText="Our Events"
        text1Color="text-[#FFFFFF]"
        text2Color="text-[#F3D300]"
      />
      <p className="text-white/70 mt-4">We're lining up something great!</p>
    </div>
  );
};

export default Sponsors;
