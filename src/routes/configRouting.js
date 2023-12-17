import Error404 from "../page/Error404";
import Post from "../page/Post";
import PostComments from "../page/PostComments";
import PostLikedUsers from "../page/PostLikedUsers";
import Event from "../page/Event";
import EventComments from "../page/EventComments";
import EventLikedUsers from "../page/EventLikedUsers";
import EventParticipants from "../page/EventParticipants";
import User from "../page/User";
import Follows from "../page/Follows";
import Users from "../page/Users";

export default [
  {
    path: "/",
    element: <Post />,
  },
  {
    path: "/posts/:id",
    element: <PostComments />,
  },
  {
    path: "/post_likes/:id",
    element: <PostLikedUsers />,
  },
  {
    path: "/events",
    element: <Event />,
  },
  {
    path: "/events/:id",
    element: <EventComments />,
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
