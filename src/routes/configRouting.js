import Error404 from "../page/Error404";
import Event from "../page/Event";
import Home from "../page/Home";
import PostLikedUsers from "../page/PostLikedUsers";
import EventLikedUsers from "../page/EventLikedUsers";

import User from "../page/User";
import Users from "../page/Users";
import EventParticipants from "../page/EventParticipants";

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
    path: "/post_likes/:id",
    element: <PostLikedUsers />,
  },
  {
    path: "/event_likes/:id",
    element: <EventLikedUsers />,
  },
  {
    path: "/event_participants/:id",
    element: <EventParticipants />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
