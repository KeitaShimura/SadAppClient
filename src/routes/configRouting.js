import Error404 from "../page/Error404";
import Home from "../page/Home";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
