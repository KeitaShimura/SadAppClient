import Error404 from "../page/Error404";
import Home from "../page/Home";
import User from "../page/User";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user/:id",
    element: <User />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
