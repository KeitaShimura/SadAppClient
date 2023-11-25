import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getUserPostsApi } from "../../api/post";
import { getUserApi } from "../../api/user";
import BasicLayout from "../../layout/BasicLayout";
import BannerIcon from "../../components/User/BannerIcon";
import UserInfo from "../../components/User/UserInfo";
import ListPosts from "../../components/ListPosts";
import ListEvents from "../../components/ListEvents/ListEvents";
import "./User.scss";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { getUserEventsApi } from "../../api/event";

function User(props) {
  const params = useParams();
  const authUser = useAuth();
  const { setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [events, setEvents] = useState(null); // State for user events
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    setLoadingPosts(true);

    const apiCall = activeTab === "posts" ? getUserPostsApi : getUserEventsApi;

    apiCall(params.id, pageTemp, pageSize).then((response) => {
      if (!response) {
        setLoadingPosts(0);
      } else {
        if (activeTab === "posts") {
          setPosts([...posts, ...response]);
        } else {
          setEvents([...events, ...response]);
        }
        setPage(pageTemp);
        setLoadingPosts(false);
      }
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
        setPosts(response); // この行を変更
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [params]);

  useEffect(() => {
    if (activeTab === "events") {
      getUserEventsApi(params.id) // Replace with your actual API call
        .then((response) => {
          setEvents(response);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }, [params, activeTab]);

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>{user ? user.name : "このユーザーは存在しません。"}</h2>
      </div>
      <BannerIcon user={user} authUser={authUser} />
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
      </ButtonGroup>

      <div className="user__content">
        {
          activeTab === "posts"
            ? posts && <ListPosts posts={posts} />
            : events && <ListEvents events={events} /> // Assuming you have a ListEvents component
        }

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
