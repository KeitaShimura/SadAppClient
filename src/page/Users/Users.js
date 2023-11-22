import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { getAllUsersApi } from "../../api/user";
import ListUsers from "../../components/ListUsers";
import { getFollowersApi, getFollowingApi } from "../../api/follow";
import { useParams } from "react-router-dom";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState(null);
  const params = useParams();
  const [userType, setUserType] = useState('all'); // New state for user type

  useEffect(() => {
    const fetchUsers = () => {
      if (userType === 'following') {
        getFollowingApi(params.id).then(setUsers).catch(() => setUsers([]));
      } else if (userType === 'followers') {
        getFollowersApi(params.id).then(setUsers).catch(() => setUsers([]));
      } else {
        getAllUsersApi().then(setUsers).catch(() => setUsers([]));
      }
    };

    fetchUsers();
  }, [userType]); // Depend on userType

  return (
    <BasicLayout className="users" title="users" setRefreshCheckLogin={setRefreshCheckLogin}>

      <div className="users__title">
        <h2>ユーザー一覧</h2>
        <input
          type="text"
          placeholder="同じ悩みを持つ仲間を探してみましょう！"
        />
      </div>

      <ButtonGroup className="users__options">
        <Button onClick={() => setUserType('following')}>フォロー中</Button>
        <Button onClick={() => setUserType('followers')}>フォロワー</Button>
        <Button onClick={() => setUserType('all')}>全ユーザー</Button>
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
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
