import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { getAllUsersApi } from "../../api/user";
import ListUsers from "../../components/ListUsers";
import { isEmpty } from "lodash";
// import ListUsers from "../../components/ListUsers";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsersApi()
      .then((response) => {
        if (isEmpty(response)) {
          setUsers([]);
        } else {
          setUsers(response);
        }
      })
      .catch((err) => {
        // エラーハンドリング
        console.error(err);
      });
  }, []);

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

      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          テスト
        </div>
      ) : (
        <ListUsers users={users} />
      )}
    </BasicLayout>
  );
}

// propTypes の宣言
Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired, // setRefreshCheckLogin は関数であり、必須であることを示す
};
