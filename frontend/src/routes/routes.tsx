import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../layouts/PrivatePayout/PrivateLayout";

// Public pages
import Home from "../pages/public pages/home/Home";
import Features from "../pages/public pages/features/Features";
import About from "../pages/public pages/about/About";
import Terms from "../pages/public pages/terms/Terms";

// Private pages
import Dashboard from "../pages/private pages/dashboard/Dashboard";
import Games from "../pages/private pages/games/Games";
import Community from "../pages/private pages/community/Community";
import Collections from "../pages/private pages/collections/Collections";
import Profile from "../pages/private pages/profile/Profile";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;