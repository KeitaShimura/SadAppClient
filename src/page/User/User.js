import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import "./User.scss";

export default function User() {
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
