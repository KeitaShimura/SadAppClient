import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsersApi } from "../../api/user";
import { getLikesForEventApi } from "../../api/eventLike";
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { Spinner } from "react-bootstrap";
import "./EventLikedUsers.scss";
import { toast } from "react-toastify";

export default function EventLikedUsers() {
  const [likedUsers, setLikedUsers] = useState(null);
  const [filteredLikedUsers, setFilteredLikedUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const params = useParams();

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        // いいねしたユーザー一覧を取得
        const likesData = await getLikesForEventApi(params.id);
        const likedUserIds = likesData.map((like) => like.user_id);

        // 全ユーザーを取得
        const allUsers = await getAllUsersApi();

        // いいねしたユーザーの情報をフィルタリング
        const likedUsersData = allUsers.filter((user) =>
          likedUserIds.includes(user.id),
        );

        setLikedUsers(likedUsersData);
      } catch (error) {
        setLikedUsers([]);
        // エラーメッセージ
        toast.error("いいねしたユーザー情報の取得中にエラーが発生しました。");
      }
    };

    fetchLikedUsers();
  }, [params.id]);

  useEffect(() => {
    // ユーザーの絞り込みなどのロジックを追加する場合には、ここで実装します
    // この例では絞り込みを行わず、すべてのいいねしたユーザーを表示します
    if (searchTerm === "") {
      setFilteredLikedUsers(likedUsers);
    } else {
      const filtered = likedUsers?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredLikedUsers(filtered);
    }
  }, [searchTerm, likedUsers]);

  return (
    <BasicLayout className="liked-users" title="いいねしたユーザー">
      <div className="liked-users__title">
        <h2>いいねしたユーザー一覧</h2>
        <input
          type="text"
          placeholder="ユーザーを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!filteredLikedUsers ? (
        <div className="liked-users__loading">
          <Spinner animation="border" variant="info" />
          ロード中...
        </div>
      ) : (
        <ListUsers users={filteredLikedUsers} />
      )}
    </BasicLayout>
  );
}
