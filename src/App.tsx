import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";
import NavMenu from "./components/Nav";
import Footer from "./components/Footer";
import Preloader from "./Preloader"; // Make sure path is correct

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
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
