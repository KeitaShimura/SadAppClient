import React from "react";
import PropTypes from "prop-types";
import IconNotFound from "../../../assets/png/icon-no-found.png";
import { Button } from "react-bootstrap";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, authUser } = props;
  const iconUrl = user?.icon ? user.icon : IconNotFound;
  const bannerUrl = user?.banner ? user.banner : null;
  console.log(bannerUrl);

  return (
    <div
      className="banner-icon"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >
      <div className="icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      {user && (
        <div className="options">
          {authUser.sub === user.id && <Button>プロフィール編集</Button>}
          {authUser.sub !== user.id && <Button>フォローする</Button>}
        </div>
      )}
    </div>
  );
}

BannerAvatar.propTypes = {
  user: PropTypes.shape({
    icon: PropTypes.string,
    banner: PropTypes.string,
    id: PropTypes.number, // Adding id as a required prop
  }),
  authUser: PropTypes.shape({
    // Changing this to an object
    sub: PropTypes.string,
  }),
};
