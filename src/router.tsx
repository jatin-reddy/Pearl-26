import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Landing from "./pages/Landing";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "events", element: <Events /> },
      { path: "schedule", element: <Schedule /> },
      { path: "gallery", element: <Gallery /> },
      { path: "team", element: <Team /> },
      { path: "contact", element: <Contact /> },
      { path: "sponsors", element: <Sponsors /> },
    ],
  },
]);
