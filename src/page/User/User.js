import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getUserPostsApi } from "../../api/post";
import { getUserApi } from "../../api/user";
import BasicLayout from "../../layout/BasicLayout";
import BannerIcon from "../../components/User/BannerIcon";
import UserInfo from "../../components/User/UserInfo";
import ListPosts from "../../components/ListPosts";

import "./User.scss";

function User() {
  const params = useParams();
  const authUser = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        console.log(response);
        setUser(response);
        if (!response) toast.error("このユーザーは存在しません。");
      })
      .catch(() => {
        toast.error("このユーザーは存在しません。");
      });
  }, [params]);

  useEffect(() => {
    getUserPostsApi(params.id)
      .then((response) => {
        console.log(response); // レスポンスの構造を確認
        setPosts(response); // この行を変更
        if (!response) toast.error("このユーザーは存在しません。");
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("このユーザーは存在しません。");
      });
  }, [params]);

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>{user ? user.name : "このユーザーは存在しません。"}</h2>
      </div>
      <BannerIcon user={user} authUser={authUser} />
      <UserInfo user={user} />
      <div className="user__posts">
        <h3>投稿一覧</h3>
        {posts && <ListPosts posts={posts} />}
      </div>
    </BasicLayout>
  );
}

export default User;
