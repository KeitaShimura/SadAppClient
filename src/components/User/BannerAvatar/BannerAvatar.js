import React, { useState } from "react";
import PropTypes from "prop-types";
import IconNotFound from "../../../assets/png/icon-no-found.png";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
    const { user, authUser } = props;
    // Correct usage of useState
    const [showModal, setShowModal] = useState(false);
    const iconUrl = user?.icon ? user.icon : IconNotFound;
    const bannerUrl = user?.banner ? user.banner : null;

    return (
        <div
            className="banner-icon"
            style={{ backgroundImage: `url(${bannerUrl})` }}
        >
            <div className="icon" style={{ backgroundImage: `url(${iconUrl})` }} />
            {user && (
                <div className="options">
                    {authUser.sub !== user.id && <Button onClick={() => setShowModal(true)}>プロフィール編集</Button>}
                    {authUser.sub !== user.id && <Button>フォローする</Button>}
                </div>
            )}

            <ConfigModal show={showModal} setShow={setShowModal} title="プロフィール編集">
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
                <p>dddd</p>
            </ConfigModal>
        </div>
    );
}

BannerAvatar.propTypes = {
    user: PropTypes.shape({
        icon: PropTypes.string,
        banner: PropTypes.string,
        id: PropTypes.number,
    }),
    authUser: PropTypes.shape({
        sub: PropTypes.string,
    }),
};
