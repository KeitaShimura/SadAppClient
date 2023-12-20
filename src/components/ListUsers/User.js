import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserApi } from "../../api/user";
import { toast } from "react-toastify";
import { Button, Image } from "react-bootstrap";
import IconNotFound from "../../assets/png/icon-no-found.png";
import { useNavigate } from "react-router";
import {
  checkIfFollowingApi,
  followUserApi,
  unfollowUserApi,
} from "../../api/follow";
import useAuth from "../../hooks/useAuth";
import { API_HOST } from "../../utils/constant";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);
  const iconUrl = user?.icon ? `${API_HOST}${user.icon}` : IconNotFound;
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const authUser = useAuth();

  const handleFollow = (userId, event) => {
    event.preventDefault(); // This should now work without error
    followUserApi(userId)
      .then(() => {
        setIsFollowing(true);
        // フォロー成功時のメッセージ
        toast.success("ユーザーをフォローしました。");
      })
      .catch((error) => {
        console.error("Follow Error:", error);
        // フォローエラー時のメッセージ
        toast.error("ユーザーのフォロー中にエラーが発生しました。");
      });
  };

  const handleUnfollow = () => {
    unfollowUserApi(user.id)
      .then(() => {
        setIsFollowing(false);
        // アンフォロー成功時のメッセージ
        toast.success("ユーザーのフォローを解除しました。");
      })
      .catch((error) => {
        console.error("Unfollow Error:", error);
        // アンフォローエラー時のメッセージ
        toast.error("ユーザーのフォロー解除中にエラーが発生しました。");
      });
  };

  const handleShowUser = (userId) => {
    navigate(`/user/${userId}`);
  };
  useEffect(() => {
    getUserApi(user.id)
      .then((response) => {
        console.log(response);
        setUserInfo(response);
        if (!response) toast.error("このユーザーは存在しません。");
      })
      .catch(() => {
        toast.error("このユーザーは存在しません。");
      });
  }, [user]);

  useEffect(() => {
    // フォロー状態をチェックする関数
    const checkFollowStatus = async () => {
      try {
        console.log(authUser.sub, user.id);
        const status = await checkIfFollowingApi(authUser.sub, user.id); // 実際のAPIコールに置き換えてください
        setIsFollowing(status);
      } catch (error) {
        console.error("フォロー状態チェックエラー:", error);
      }
    };

    if (user && authUser) {
      checkFollowStatus();
    }
  }, [user, authUser]); // user と authUser に依存

  return (
    <div className="user" onClick={() => handleShowUser(user.id)}>
      <div className="user-info-container">
      <div className="icon-container">
          <Image className="icon" src={iconUrl} roundedCircle />
        </div>
        {userInfo && (
          <div>
            <div className="name">{userInfo.name}</div>
            <div className="bio">
              <p>{userInfo.bio}</p>
            </div>
          </div>
        )}
      </div>
      <div className="button-container">
        {Number(authUser.sub) !== user.id &&
          (isFollowing ? (
            <Button
              className="unfollow"
              onClick={(e) => {
                e.stopPropagation();
                handleUnfollow(user.id, e);
              }}
            >
              <span>フォロー解除</span>
            </Button>
          ) : (
            <Button
              className="follow"
              onClick={(e) => {
                e.stopPropagation();
                handleFollow(user.id, e);
              }}
            >
              フォローする
            </Button>
          ))}
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    bio: PropTypes.string,
  }),
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    bio: PropTypes.string,
  }),
};
