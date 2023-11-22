import Error404 from "../page/Error404";
import Follows from "../page/Follows";
import Home from "../page/Home";
import User from "../page/User";
import Users from "../page/Users";

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
    path: "/users",
    element: <Users />,
  },
  {
    path: "/follows/:id",
    element: <Follows />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
