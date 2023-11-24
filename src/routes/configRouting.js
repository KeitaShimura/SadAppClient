import Error404 from "../page/Error404";
import Event from "../page/Event";
import Home from "../page/Home";
import User from "../page/User";
import Users from "../page/Users";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events",
    element: <Event />,
  },
  {
    path: "/user/:id",
    element: <User />,
  },
  {
    path: "/users/:id",
    element: <Users />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
