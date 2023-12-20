import React, { useEffect, useState } from "react";
import {
  followUserApi,
  unfollowUserApi,
  checkIfFollowingApi,
} from "../../../api/follow";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../EditUserForm";
import IconNotFound from "../../../assets/png/icon-no-found.png";

import "./BannerIcon.scss";
import { toast } from "react-toastify";
import EditPasswordForm from "../EditPasswordForm";
import { API_HOST } from "../../../utils/constant";

export default function BannerIcon(props) {
  const { user, authUser } = props;
  // Correct usage of useState
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State for password modal

  const [isFollowing, setIsFollowing] = useState(false);
  const iconUrl = user?.icon ? user.icon : IconNotFound;
  const bannerUrl = user?.banner ? user.banner : null;

  const handleFollow = (userId, event) => {
    event.preventDefault();
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
      style={{ backgroundImage: `url(${API_HOST}${bannerUrl})` }}
    >
      <div className="icon-container">
        <Image src={`${API_HOST}${iconUrl}`} alt="Icon" />
      </div>

      {user && (
        <div className="options">
          {Number(authUser.sub) === user.id && (
            <div>
              <div className="mb-2">
                <Button
                  className="edit-user-button"
                  onClick={() => setShowModal(true)}
                >
                  プロフィール編集
                </Button>
              </div>
              <div>
                <Button
                  className="edit-password-button"
                  onClick={() => setShowPasswordModal(true)}
                >
                  パスワード更新
                </Button>
              </div>
            </div>
          )}
          {Number(authUser.sub) !== user.id && (
            <>
              {isFollowing ? (
                <Button
                  className="unfollow"
                  onClick={(event) => handleUnfollow(user.id, event)}
                >
                  <span>フォロー解除</span>
                </Button>
              ) : (
                <Button
                  className="follow"
                  onClick={(event) => handleFollow(user.id, event)}
                >
                  フォローする
                </Button>
              )}
            </>
          )}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="プロフィール編集"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>

      {/* Render EditPasswordForm modal */}
      <ConfigModal
        show={showPasswordModal}
        setShow={setShowPasswordModal}
        title="パスワード編集"
      >
        <EditPasswordForm user={user} setShowModal={setShowPasswordModal} />
      </ConfigModal>
    </div>
  );
}

BannerIcon.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    banner: PropTypes.string,
  }),
  authUser: PropTypes.shape({
    sub: PropTypes.string,
  }),
};
