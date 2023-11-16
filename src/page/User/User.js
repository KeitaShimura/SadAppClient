import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BasicLayout from "../../layout/BasicLayout";
import "./User.scss";
import { getUserApi } from "../../api/user";
import { toast } from "react-toastify";

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
      <div>バナー</div>
      <div>ユーザー情報</div>
      <div className="user__posts">投稿一覧</div>
    </BasicLayout>
  );
}

export default User;
