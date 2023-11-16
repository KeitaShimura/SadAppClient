import React from "react";
import PropTypes from "prop-types";
import IconNotFound from "../../../assets/png/icon-no-found.png";
import { Button } from "react-bootstrap";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user } = props;
  const iconUrl = user?.icon ? user.icon : IconNotFound;
  const bannerUrl = user?.banner ? user.banner : null;
  console.log(bannerUrl);
  console.log(user);

  return (
    <div
      className="banner-icon"
      style={{ backgroundImage: `url(${bannerUrl})` }}
    >
      <div className="icon" style={{ backgroundImage: `url(${iconUrl})` }} />
      {user && (
        <div className="options">
          <Button>プロフィール編集</Button>
        </div>
      )}
    </div>
  );
}

BannerAvatar.propTypes = {
  user: PropTypes.shape({
    icon: PropTypes.string,
    banner: PropTypes.string,
  }),
};
