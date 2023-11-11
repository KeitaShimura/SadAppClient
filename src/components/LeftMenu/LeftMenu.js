import React from "react";
import "./LeftMenu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPowerOff,
  faUser,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function LeftMenu() {
  return (
    <div className="left-menu">
      <h2>COCOLOTalk</h2>
      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> 投稿一覧
      </Link>
      <Link to="/events">
        <FontAwesomeIcon icon={faVideo} />
        イベント一覧
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} />
        ユーザー一覧
      </Link>
      <Link to="/profile">
        <FontAwesomeIcon icon={faUser} />
        プロフィール
      </Link>
      <Link to="/logout">
        <FontAwesomeIcon icon={faPowerOff} />
        ログアウト
      </Link>
      <Button>COCOLOTalk</Button>
    </div>
  );
}
