import { Outlet } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import NavMenu from "./components/Nav";
// import Footer from "./components/Foooter";

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <NavMenu />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </ReactLenis>
  );
};

export default App;
