import { createBrowserRouter } from "react-router";

import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../layouts/PrivatePayout/PrivateLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

// Public pages
import Home from "../pages/public pages/home/Home";
import Features from "../pages/public pages/features/Features";
import About from "../pages/public pages/about/About";
import Terms from "../pages/public pages/terms/Terms";

// Auth pages
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/singup/Signup";

// Private pages
import Dashboard from "../pages/private pages/dashboard/Dashboard";
import Games from "../pages/private pages/games/Games";
import Community from "../pages/private pages/community/Community";
import Collections from "../pages/private pages/collections/Collections";
import Profile from "../pages/private pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
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
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
