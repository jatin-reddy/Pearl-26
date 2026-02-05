import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";
import NavMenu from "./components/Nav";
import Footer from "./components/Footer";
import Preloader from "./Preloader";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader setLoading={setIsLoading} />}
      </AnimatePresence>
      <div>
        <NavMenu />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default App;
