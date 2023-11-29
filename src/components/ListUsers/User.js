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

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);
  const iconUrl = user?.icon ? user.icon : IconNotFound;
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const authUser = useAuth();

  const handleFollow = (userId, event) => {
    event.preventDefault(); // This should now work without error
    followUserApi(userId)
      .then(() => {
        console.log("User ID:", userId);
        setIsFollowing(true);
        // Additional logic if needed
      })
      .catch((error) => {
        console.error("Follow Error:", error);
      });
  };

  const handleUnfollow = () => {
    unfollowUserApi(user.id)
      .then(() => {
        setIsFollowing(false);
        // Additional logic if needed
      })
      .catch((error) => {
        console.error("Unfollow Error:", error);
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
      <Image className="icon" src={iconUrl} roundedCircle />
      {userInfo && (
        <div>
          <div className="name">{userInfo.name}</div>
          <div className="name">
            <p>{userInfo.bio}</p>
          </div>
        </div>
      )}
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
            className="unfollow"
            onClick={(e) => {
              e.stopPropagation();
              handleFollow(user.id, e);
            }}
          >
            フォローする
          </Button>
        ))}
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
