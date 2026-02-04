import Hero from "../components/Hero";
import HeadlinerEvents from "../components/HeadlinerEvents";
import ProShows from "../components/ProShows";
import PreviousArtists from "../components/PreviousArtists";
import LatestAftermovie from "../components/LatestAftermovie";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Hero />
      <HeadlinerEvents />
      <ProShows />
      <PreviousArtists />
      <LatestAftermovie />
    </>
  );
};

export default Landing;
