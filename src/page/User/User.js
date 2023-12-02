import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import {
  getUserEventsApi,
  getUserLikedEventsApi,
  getUserParticipatedEvents,
} from "../../api/event";
import { getUserPostsApi, getUserLikedPostsApi } from "../../api/post";
import BasicLayout from "../../layout/BasicLayout";
import BannerIcon from "../../components/User/BannerIcon";
import UserInfo from "../../components/User/UserInfo";
import ListPosts from "../../components/ListPosts";
import ListEvents from "../../components/ListEvents";
import "./User.scss";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { getUserApi } from "../../api/user";
import { getFollowersApi, getFollowingApi } from "../../api/follow";

function User(props) {
  const params = useParams();
  const authUser = useAuth();
  const { setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null);
  const [likedPosts, setLikedPosts] = useState(null);
  const [likedEvents, setLikedEvents] = useState(null);
  const [participatedEvents, setParticipatedEvents] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const pageSize = 50;
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingPosts(true);

    let apiCall;

    switch (activeTab) {
      case "posts":
        apiCall = getUserPostsApi;
        break;
      case "events":
        apiCall = getUserEventsApi;
        break;
      case "participated-events":
        apiCall = getUserParticipatedEvents;
        break;
      case "liked-posts":
        apiCall = getUserLikedPostsApi;
        break;
      case "liked-events":
        apiCall = getUserLikedEventsApi;
        break;
      default:
        apiCall = getUserPostsApi; // デフォルトは投稿
    }

    apiCall(params.id, pageTemp, pageSize)
      .then((response) => {
        if (!response) {
          setLoadingPosts(0);
        } else {
          switch (activeTab) {
            case "posts":
              setPosts([...(posts || []), ...response]);
              break;
            case "events":
              setEvents([...(events || []), ...response]);
              break;
            case "participated-events":
              setParticipatedEvents([
                ...(participatedEvents || []),
                ...response,
              ]);
              break;
            case "liked-posts":
              setLikedPosts([...(likedPosts || []), ...response]);
              break;
            case "liked-events":
              setLikedEvents([...(likedEvents || []), ...response]);
              break;
            default:
              setPosts([...(posts || []), ...response]); // デフォルトは投稿
          }
          setPage(pageTemp);
          setLoadingPosts(false);
        }
      })
      .catch((error) => {
        toast.error(
          "データの読み込み中にエラーが発生しました。もう一度お試しください。",
        );
        console.error("API Error:", error);
      });
  };

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        setUser(response);
        if (!response) toast.error("このユーザーは存在しません。");
      })
      .catch(() => {
        toast.error("このユーザーは存在しません。");
      });
  }, [params]);

  useEffect(() => {
    getUserPostsApi(params.id)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        toast.error(
          "データの読み込み中にエラーが発生しました。もう一度お試しください。",
        );
        console.error("API Error:", error);
      });
  }, [params]);

  useEffect(() => {
    if (activeTab === "events") {
      getUserEventsApi(params.id)
        .then((response) => {
          setEvents(response);
        })
        .catch((error) => {
          toast.error(
            "イベントデータを取得中にエラーが発生しました。もう一度お試しください。",
          );
          console.error("API Error:", error);
        });
    }
  }, [params, activeTab]);

  useEffect(() => {
    if (activeTab === "participated-events") {
      getUserParticipatedEvents(params.id)
        .then((response) => {
          setParticipatedEvents(response);
        })
        .catch((error) => {
          toast.error("参加したイベントを取得中にエラーが発生しました。");
          console.error("Participated Events Error:", error);
        });
    }
  }, [params, activeTab]);

  useEffect(() => {
    if (activeTab === "liked-posts") {
      getUserLikedPostsApi(params.id)
        .then((response) => {
          setLikedPosts(response);
        })
        .catch((error) => {
          toast.error("いいねした投稿を取得中にエラーが発生しました。");
          console.error("Liked Posts Error:", error);
        });
    }
  }, [params, activeTab]);

  useEffect(() => {
    if (activeTab === "liked-events") {
      getUserLikedEventsApi(params.id)
        .then((response) => {
          setLikedEvents(response);
        })
        .catch((error) => {
          toast.error("いいねしたイベントを取得中にエラーが発生しました。");
          console.error("Liked Events Error:", error);
        });
    }
  }, [params, activeTab]);

  useEffect(() => {
    getFollowersApi(params.id)
      .then((response) => {
        setFollowersCount(response.length);
      })
      .catch((error) => {
        toast.error("フォロワー数を取得中にエラーが発生しました。");
        console.error("Followers Count Error:", error);
      });
  }, [params.id]);

  useEffect(() => {
    getFollowingApi(params.id)
      .then((response) => {
        setFollowingCount(response.length);
      })
      .catch((error) => {
        toast.error("フォロー数を取得中にエラーが発生しました。");
        console.error("Following Count Error:", error);
      });
  }, [params.id]);

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <BannerIcon user={user} authUser={authUser} />
      <div>
        <Link to={`/users/${params.id}`} className="user-following-link">
          フォロー中:
        </Link>{" "}
        {followingCount}
        <Link to={`/users/${params.id}`} className="user-follower-link">
          フォロワー:
        </Link>{" "}
        {followersCount}
      </div>
      <UserInfo user={user} />
      <ButtonGroup className="user__options">
        <Button
          onClick={() => setActiveTab("posts")}
          active={activeTab === "posts"}
        >
          投稿
        </Button>
        <Button
          onClick={() => setActiveTab("events")}
          active={activeTab === "events"}
        >
          イベント
        </Button>
        <Button
          onClick={() => setActiveTab("participated-events")}
          active={activeTab === "participated-events"}
        >
          参加イベント
        </Button>
        <Button
          onClick={() => setActiveTab("liked-posts")}
          active={activeTab === "liked-posts"}
        >
          いいねした投稿
        </Button>
        <Button
          onClick={() => setActiveTab("liked-events")}
          active={activeTab === "liked-posts"}
        >
          いいねしたイベント
        </Button>
      </ButtonGroup>

      <div className="user__content">
        {activeTab === "posts" && posts && <ListPosts posts={posts} />}
        {activeTab === "events" && events && <ListEvents events={events} />}
        {activeTab === "participated-events" && likedPosts && (
          <ListEvents events={participatedEvents} />
        )}
        {activeTab === "liked-posts" && likedPosts && (
          <ListPosts posts={likedPosts} />
        )}
        {activeTab === "liked-events" && likedEvents && (
          <ListEvents events={likedEvents} />
        )}

        <Button onClick={moreData}>
          {!loadingPosts ? (
            loadingPosts !== 0 && "もっと見る"
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
    </BasicLayout>
  );
}

export default User;

// propTypes の宣言
User.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
