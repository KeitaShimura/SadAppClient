import React, { useState } from "react";
import "./Header.scss"; // Import SCSS module
import {
    // Button,
    Image
} from "react-bootstrap";
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
// import PostModal from "../Modal/PostModal";
// import EventModal from "../Modal/EventModal";
import { Link } from "react-router-dom";

const Header = () => {
    // const [showPostModal, setShowPostModal] = useState(false);
    // const [showEventModal, setShowEventModal] = useState(false);

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
                <Link to={`/user/${user?.sub}`} onClick={() => setShowMobileMenu(false)}>
                    <FontAwesomeIcon icon={faUser} />
                    プロフィール
                </Link>
                <Link
                    to=""
                    onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                    }}
                >
                    <FontAwesomeIcon icon={faPowerOff} />
                    ログアウト
                </Link>
                {/* <Button
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
                </Button> */}
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
            <Link to="" onClick={logout}>
                <FontAwesomeIcon icon={faPowerOff} />
                ログアウト
            </Link>

            {/* <Button className="mr-4" onClick={() => setShowPostModal(true)}>
                投稿する
            </Button>
            <PostModal show={showPostModal} setShow={setShowPostModal} />

            <Button onClick={() => setShowEventModal(true)}>
                イベントを投稿する
            </Button>
            <EventModal show={showEventModal} setShow={setShowEventModal} /> */}
        </header>
    );
};

export default Header;
