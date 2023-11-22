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

import "./User.scss";
import { Button, Spinner } from "react-bootstrap";

function User(props) {
  const params = useParams();
  const authUser = useAuth();
  const { setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);

  console.log(posts);
  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    setLoadingPosts(true);

    getUserPostsApi(params.id, pageTemp, pageSize).then((response) => {
      if (!response) {
        setLoadingPosts(0);
      } else {
        setPosts([...posts, ...response]);
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

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>{user ? user.name : "このユーザーは存在しません。"}</h2>
      </div>
      <BannerIcon user={user} authUser={authUser} />
      <UserInfo user={user} />
      <div className="user__posts">
        <h3>投稿一覧</h3>
        {posts && <ListPosts posts={posts} />}
        <Button onClick={moreData}>
          {!loadingPosts ? (
            loadingPosts !== 0 && "もっと見る"
          ) : (
            <Spinner
              as="span"
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
