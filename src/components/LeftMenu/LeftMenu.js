import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { logoutApi } from "../../api/auth";
import PostModal from "../PostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPowerOff,
  faUser,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import "./LeftMenu.scss";

export default function LeftMenu() {
  const [showModal, setShowModal] = useState(false);

  const user = useAuth();
  console.log(user);
  const logout = () => {
    logoutApi();
    window.location.reload();
  };
  return (
    <div className="left-menu">
      <h2>COCOLOTalk</h2>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        投稿一覧
      </Link>
      <Link to="/events">
        <FontAwesomeIcon icon={faVideo} />
        イベント一覧
      </Link>
      <Link to={`users/${user?.sub}`}>
        <FontAwesomeIcon icon={faUsers} />
        ユーザー一覧
      </Link>
      <Link to={`user/${user?.sub}`}>
        <FontAwesomeIcon icon={faUser} />
        プロフィール
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} />
        ログアウト
      </Link>

      <Button onClick={() => setShowModal(true)}>投稿する</Button>
      <PostModal show={showModal} setShow={setShowModal} />

      <Button>イベントを投稿する</Button>
    </div>
  );
}
