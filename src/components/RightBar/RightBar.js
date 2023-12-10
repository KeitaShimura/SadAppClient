import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ListPosts from "../ListPosts";
import { toast } from "react-toastify";
import { getPostsApi } from "../../api/post";
import { getEventsApi } from "../../api/event";
import ListEvents from "../ListEvents";
import { useLocation } from "react-router-dom";
import "./RightBar.scss";

export default function RightBar() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const location = useLocation();

  useEffect(() => {
    getPostsApi(1, 3)
      .then((response) => {
        setPosts(response.data);
      })
      .catch(() => {
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  }, []);

  useEffect(() => {
    getEventsApi(1, 3)
      .then((response) => {
        setEvents(response.data);
      })
      .catch(() => {
        toast.error("イベントの読み込み中にエラーが発生しました。");
      });
  }, []);

  return (
    <div className="right-bar">
      {location.pathname !== "/" && (
        <Card className="post mb-2">
          <div className="post__header">
            <div className="right-aligned">
              <h2>最近の投稿</h2>
            </div>
          </div>

          <div className="post__content">
            {posts && posts.length > 0 ? (
              <ListPosts posts={posts} setPosts={setPosts} />
            ) : (
              <p className="text-center mt-2 fw-bold">投稿は存在しません</p>
            )}
          </div>
        </Card>
      )}

      {location.pathname !== "/events" && (
        <Card className="event">
          <div className="event__header">
            <div className="right-aligned">
              <h2>最近のイベント</h2>
            </div>
          </div>

          <div className="event__content">
            {events && events.length > 0 ? (
              <ListEvents events={events} setEvents={setEvents} />
            ) : (
              <p className="text-center mt-2 fw-bold">イベントは存在しません</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
