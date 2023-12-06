import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import "./RightMenu.scss";
import ListPosts from "../ListPosts";
import { toast } from "react-toastify";
import { getPostsApi } from "../../api/post";
import { getEventsApi } from "../../api/event";
import ListEvents from "../ListEvents";

export default function RightBar() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  // スクロールイベントリスナーを設定
  useEffect(() => {
    getPostsApi(1, 3) // 最初の3件の投稿のみを取得
      .then((response) => {
        setPosts(response.data); // 既存の投稿リストに追加する代わりに、置き換える
      })
      .catch(() => {
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  }, []);

  // スクロールイベントリスナーを設定
  useEffect(() => {
    getEventsApi(1, 3) // 最初の3件の投稿のみを取得
      .then((response) => {
        setEvents(response.data); // 既存の投稿リストに追加する代わりに、置き換える
      })
      .catch(() => {
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  }, []);

  return (
    <div>
      <Card className="post">
        <div className="post__header">
          <div className="right-aligned">
            <h2>直近の投稿</h2>
          </div>
        </div>

        <div className="post__content">
          {posts && posts.length > 0 ? (
            <ListPosts posts={posts} />
          ) : (
            <p className="text-center mt-2 fw-bold">投稿は存在しません</p>
          )}
        </div>
      </Card>
      <Card className="event">
        <div className="event__header">
          <div className="right-aligned">
            <h2>直近の投稿</h2>
          </div>
        </div>

        <div className="event__content">
          {events && events.length > 0 ? (
            <ListEvents events={events} />
          ) : (
            <p className="text-center mt-2 fw-bold">イベントは存在しません</p>
          )}
        </div>
      </Card>
    </div>
  );
}
