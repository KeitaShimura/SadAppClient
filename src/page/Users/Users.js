import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { getAllUsersApi } from "../../api/user";
import ListUsers from "../../components/ListUsers";
import { getFollowersApi, getFollowingApi } from "../../api/follow";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const pageSize = 100;
  const params = useParams();
  const [userType, setUserType] = useState("all");

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      let fetchedUsers;
      switch (userType) {
        case "following":
          fetchedUsers = await getFollowingApi(params.id, page, pageSize);
          break;
        case "followers":
          fetchedUsers = await getFollowersApi(params.id, page, pageSize);
          break;
        default:
          fetchedUsers = await getAllUsersApi(page, pageSize);
      }

      if (fetchedUsers && fetchedUsers.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        setPage((prevPage) => prevPage + 1);
        setHasMoreData(fetchedUsers.length === pageSize);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      toast.error("ユーザーの取得中にエラーが発生しました。");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    setUsers([]); // userType が変わるときにユーザーのリストをリセット
    setPage(1); // ページ番号をリセット
    setHasMoreData(true); // hasMoreData をリセット
    fetchUsers();
  }, [userType, params.id]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const loadMoreUsers = () => {
    fetchUsers();
  };

  return (
    <BasicLayout
      className="users"
      title="users"
      setRefreshCheckLogin={setRefreshCheckLogin}
      showBackButton={false}
    >
      <div className="users__header">
        <input
          type="text"
          className="form-control"
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

      <div className="users__content">
        {!filteredUsers ? (
          <div className="users__loading">
            <Spinner animation="border" variant="info" />
            もっと見る
          </div>
        ) : (
          <ListUsers users={filteredUsers} />
        )}
        {hasMoreData && (
          <div className="users__button">
            <Button className="load-button" onClick={loadMoreUsers}>
              {!loadingUsers ? (
                "もっと見る"
              ) : (
                <Spinner
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        )}
      </div>
    </BasicLayout>
  );
}

Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
