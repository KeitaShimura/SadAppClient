import React, { useEffect, useState } from "react";
import {
  followUserApi,
  unfollowUserApi,
  checkIfFollowingApi,
} from "../../../api/follow";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import IconNotFound from "../../../assets/png/icon-no-found.png";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, authUser } = props;
  // Correct usage of useState
  const [showModal, setShowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const iconUrl = user?.icon ? user.icon : IconNotFound;
  const bannerUrl = user?.banner ? user.banner : null;

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
    <div
      className="banner-icon"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >
      <div className="icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      <div className="icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      {user && (
        <div className="options">
          {Number(authUser.sub) === user.id && (
            <Button onClick={() => setShowModal(true)}>プロフィール編集</Button>
          )}
          {Number(authUser.sub) !== user.id &&
            (isFollowing ? (
              <Button
                className="unfollow"
                onClick={(event) => handleUnfollow(user.id, event)}
              >
                <span>フォロー解除</span>
              </Button>
            ) : (
              <Button onClick={(event) => handleFollow(user.id, event)}>
                フォローする
              </Button>
            ))}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="プロフィール編集"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}

BannerAvatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    banner: PropTypes.string,
  }),
  authUser: PropTypes.shape({
    sub: PropTypes.string,
  }),
};
