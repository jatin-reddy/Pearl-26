import { Outlet } from "react-router-dom";
// import Navbar from "./components/Nav";
// import Footer from "./components/Foooter";

const App = () => {
  return (
    <>
      {/*<Navbar /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
