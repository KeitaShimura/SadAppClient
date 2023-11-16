import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import { getUserApi } from "../../api/user";
import { toast } from "react-toastify";

import "./User.scss";

function User() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log(location);
  console.log(params.id);
  console.log(navigate);
  if (user) {
    console.log(user.name);
  }
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

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>{user ? user.name : "このユーザーは存在しません。"}</h2>
      </div>
      <BannerAvatar user={user} />
      <div>{user ? user.bio : "このユーザーは存在しません。"}</div>
      <div className="user__posts">投稿一覧</div>
    </BasicLayout>
  );
}

export default User;
