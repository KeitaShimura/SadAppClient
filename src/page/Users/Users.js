import React, { useEffect, useState } from "react";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import ListUsers from "../../components/ListUsers";
import { getFollowersApi, getFollowingApi } from "../../api/follow";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Users() {
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const pageSize = 100;
  const params = useParams();
  const [userType, setUserType] = useState("all");

  const fetchUsers = async (type) => {
    setLoadingUsers(true);
    try {
      let fetchedUsers = [];
      switch (type) {
        case "followings": {
          const followingResponse = await getFollowingApi(
            params.id,
            page,
            pageSize,
          );
          fetchedUsers = followingResponse.map((item) => item.follower); // Extract the "following" user objects
          setFollowings((prev) => [...prev, ...fetchedUsers]);
          break;
        }
        case "followers": {
          const followersResponse = await getFollowersApi(
            params.id,
            page,
            pageSize,
          );
          fetchedUsers = followersResponse.map((item) => item.following); // Extract the "follower" user objects
          setFollowers((prev) => [...prev, ...fetchedUsers]);
          break;
        }
        default:
          setUserType("followings");
          break;
      }

      setHasMoreData(fetchedUsers.length === pageSize);
    } catch (error) {
      toast.error("ユーザーの取得中にエラーが発生しました。");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMoreData(true);
    setFilteredUsers([]);

    if (userType === "followings") {
      setFollowings([]);
      fetchUsers("followings");
    } else if (userType === "followers") {
      setFollowers([]);
      fetchUsers("followers");
    } else {
      setAllUsers([]);
      fetchUsers("all");
    }
  }, [userType, params.id]);

  useEffect(() => {
    const currentUsers =
      userType === "followers"
        ? followers
        : userType === "followings"
          ? followings
          : allUsers;

    const filtered =
      searchTerm === ""
        ? currentUsers
        : currentUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );

    setFilteredUsers(filtered);
  }, [searchTerm, followers, followings, allUsers, userType]);

  const loadMoreUsers = () => {
    fetchUsers(userType);
  };

  return (
    <BasicLayout className="users" title="users" showBackButton={false}>
      <div className="users__header">
        <input
          type="text"
          className="form-control"
          placeholder="ユーザーを探す"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ButtonGroup className="users__options">
        <Button
          className={userType === "followings" ? "active" : ""}
          onClick={() => setUserType("followings")}
        >
          フォロー中
        </Button>
        <Button
          className={userType === "followers" ? "active" : ""}
          onClick={() => setUserType("followers")}
        >
          フォロワー
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
