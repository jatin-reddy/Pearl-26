import { Outlet } from "react-router-dom";
import NavMenu from "./components/Nav";
// import Footer from "./components/Foooter";

const App = () => {
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
