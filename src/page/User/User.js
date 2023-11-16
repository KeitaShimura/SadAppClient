import React from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BasicLayout from "../../layout/BasicLayout";
import "./User.scss";

function User() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  console.log(location);
  console.log(params.id);
  console.log(navigate);

  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>志村 啓太</h2>
      </div>
      <div>バナー</div>
      <div>ユーザー情報</div>
      <div className="user__posts">投稿一覧</div>
    </BasicLayout>
  );
}

export default User;