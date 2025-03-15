import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home/home";
import Detail from "../pages/detail/detail";
import Catch from "../pages/catch/catch";
import Arsenal from "../pages/arsenal/arsenal";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Detail />,
        path: "/detail/:name",
      },
      {
        element: <Catch />,
        path: "/catch/:name",
      },
      {
        element: <Arsenal />,
        path: "/arsenal",
      },
    ],
  },
]);
