import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup } from "react-bootstrap";
import { getAllUsersApi } from "../../api/user";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;

  useEffect(() => {
    getAllUsersApi()
      .then((users) => {
        // ユーザーデータを扱う処理
        console.log(users);
      })
      .catch((err) => {
        // エラーハンドリング
        console.error(err);
      });
  });

  return (
    <BasicLayout
      className="users"
      title="users"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>ユーザー一覧</h2>
        <input
          type="text"
          placeholder="同じ悩みを持つ仲間を探してみましょう！"
        />
      </div>

      <ButtonGroup className="users__options">
        <Button>フォロー中</Button>
        <Button>フォロワー</Button>
      </ButtonGroup>
    </BasicLayout>
  );
}

// propTypes の宣言
Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired, // setRefreshCheckLogin は関数であり、必須であることを示す
};
