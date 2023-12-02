import React, { useState } from "react";
import "./Header.scss";
import { Image } from "react-bootstrap";
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
import { Link } from "react-router-dom";

const Header = () => {

  const user = useAuth();
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

        <Link to="/" onClick={() => setShowMobileMenu(false)}>
          <Image className="logo" src={Logo} width={100} />
        </Link>

        <Link to="/" onClick={() => setShowMobileMenu(false)}>
          <FontAwesomeIcon icon={faHome} />
          投稿一覧
        </Link>
        <Link to="/events" onClick={() => setShowMobileMenu(false)}>
          <FontAwesomeIcon icon={faVideo} />
          イベント一覧
        </Link>
        <Link
          to={`/users/${user?.sub}`}
          onClick={() => setShowMobileMenu(false)}
        >
          <FontAwesomeIcon icon={faUsers} />
          ユーザー一覧
        </Link>
        <Link
          to={`/user/${user?.sub}`}
          onClick={() => setShowMobileMenu(false)}
        >
          <FontAwesomeIcon icon={faUser} />
          プロフィール
        </Link>
        <Link
          to=""
          onClick={() => {
            if (window.confirm("ログアウトしますか？")) {
              logout();
            }
            setShowMobileMenu(false);
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} />
          ログアウト
        </Link>
      </div>

      <Image className="logo" src={Logo} width={40} />
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        投稿一覧
      </Link>
      <Link to="/events">
        <FontAwesomeIcon icon={faVideo} />
        イベント一覧
      </Link>
      <Link to={`/users/${user?.sub}`}>
        <FontAwesomeIcon icon={faUsers} />
        ユーザー一覧
      </Link>
      <Link to={`/user/${user?.sub}`}>
        <FontAwesomeIcon icon={faUser} />
        プロフィール
      </Link>
      <Link to=""
        onClick={() => {
        if (window.confirm("ログアウトしますか？")) {
          logout();
        }
        setShowMobileMenu(false);
      }}>
        <FontAwesomeIcon icon={faPowerOff} />
        ログアウト
      </Link>
    </header>
  );
};

export default Header;
