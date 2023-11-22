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
  const [filteredUsers, setFilteredUsers] = useState(null); // State for filtered users
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const params = useParams();
  const [userType, setUserType] = useState("all");

  console.log("Users data: ", users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsersApi();
        if (userType === "following") {
          const followingData = await getFollowingApi(params.id);
          const followingUsers = allUsers.filter((user) =>
            followingData.some((f) => f.following_id === user.id),
          );
          setUsers(followingUsers);
        } else if (userType === "followers") {
          const followersData = await getFollowersApi(params.id);
          const followerUsers = allUsers.filter((user) =>
            followersData.some((f) => f.follower_id === user.id),
          );
          setUsers(followerUsers);
        } else {
          setUsers(allUsers);
        }
      } catch (error) {
        setUsers([]);
      }
    };

    fetchUsers();
  }, [userType, params.id]);

  useEffect(() => {
    // This useEffect handles the filtering of users based on the search term
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users?.filter(
        (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()),
        // You can add more conditions to filter by different user attributes
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ButtonGroup className="users__options">
        <Button
          className={userType === "following" ? "active" : ""}
          onClick={() => setUserType("following")}
        >
          フォロー中
        </Button>
        <Button
          className={userType === "followers" ? "active" : ""}
          onClick={() => setUserType("followers")}
        >
          フォロワー
        </Button>
        <Button
          className={userType === "all" ? "active" : ""}
          onClick={() => setUserType("all")}
        >
          全ユーザー
        </Button>
      </ButtonGroup>

      {!filteredUsers ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          テスト
        </div>
      ) : (
        <ListUsers users={filteredUsers} />
      )}
    </BasicLayout>
  );
}

// propTypes の宣言
Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
