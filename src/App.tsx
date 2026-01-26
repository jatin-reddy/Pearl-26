import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import NavMenu from "./components/Nav";
// import Footer from "./components/Foooter";

const App = () => {
  useEffect(() => {
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);

  return (
    <>
      <NavMenu />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
