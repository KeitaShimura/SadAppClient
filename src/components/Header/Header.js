import React, { useState } from "react";
import "./Header.scss"; // Import SCSS module
import { Button, Image } from "react-bootstrap";
import Logo from "../../assets/png/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPowerOff,
  faUser,
  faUsers,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { logoutApi } from "../../api/auth";
import PostModal from "../Modal/PostModal";
import EventModal from "../Modal/EventModal";

const Header = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const user = useAuth();
  console.log(user);
  const logout = () => {
    logoutApi();
    window.location.reload();
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className={`header ${showMobileMenu ? "show-mobile-menu" : ""}`}>
      <FontAwesomeIcon
        icon={faBars}
        className="hamburger-menu"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      />
      <div className="mobile-menu">
        <a href="/" onClick={() => setShowMobileMenu(false)}>
          <FontAwesomeIcon icon={faHome} />
          投稿一覧
        </a>
        <a href="/events" onClick={() => setShowMobileMenu(false)}>
          <FontAwesomeIcon icon={faVideo} />
          イベント一覧
        </a>
        <a
          href={`/users/${user?.sub}`}
          onClick={() => setShowMobileMenu(false)}
        >
          <FontAwesomeIcon icon={faUsers} />
          ユーザー一覧
        </a>
        <a href={`/user/${user?.sub}`} onClick={() => setShowMobileMenu(false)}>
          <FontAwesomeIcon icon={faUser} />
          プロフィール
        </a>
        <a
          href=""
          onClick={() => {
            logout();
            setShowMobileMenu(false);
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} />
          ログアウト
        </a>
        <Button
          onClick={() => {
            setShowPostModal(true);
            setShowMobileMenu(false);
          }}
        >
          投稿する
        </Button>
        <Button
          onClick={() => {
            setShowEventModal(true);
            setShowMobileMenu(false);
          }}
        >
          イベントを投稿する
        </Button>
      </div>

      <Image className="logo" src={Logo} width={40} />
      <a href="/">
        <FontAwesomeIcon icon={faHome} />
        投稿一覧
      </a>
      <a href="/events">
        <FontAwesomeIcon icon={faVideo} />
        イベント一覧
      </a>
      <a href={`/users/${user?.sub}`}>
        <FontAwesomeIcon icon={faUsers} />
        ユーザー一覧
      </a>
      <a href={`/user/${user?.sub}`}>
        <FontAwesomeIcon icon={faUser} />
        プロフィール
      </a>
      <a href="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} />
        ログアウト
      </a>

      <Button className="mr-4" onClick={() => setShowPostModal(true)}>
        投稿する
      </Button>
      <PostModal show={showPostModal} setShow={setShowPostModal} />

      <Button onClick={() => setShowEventModal(true)}>
        イベントを投稿する
      </Button>
      <EventModal show={showEventModal} setShow={setShowEventModal} />
    </header>
  );
};

export default Header;
