import React, { useState } from "react";
import './Header.scss'; // Import SCSS module
import { Button, Image } from "react-bootstrap";
import Logo from "../../assets/png/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPowerOff, faUser, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
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
    return (
        <header className="header">
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

            <Button className="mr-4" onClick={() => setShowPostModal(true)}>投稿する</Button>
            <PostModal show={showPostModal} setShow={setShowPostModal} />

            <Button onClick={() => setShowEventModal(true)}>
                イベントを投稿する
            </Button>
            <EventModal show={showEventModal} setShow={setShowEventModal} />
        </header>
    );
};

export default Header;
