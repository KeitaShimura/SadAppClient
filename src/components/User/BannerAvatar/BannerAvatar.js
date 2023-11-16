import React from "react";
import PropTypes from "prop-types";
import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user } = props;
  const bannerUrl = user?.banner ? user.banner : null;
  console.log(bannerUrl);
  console.log(user);

  return (
    <div>
      {bannerUrl && (
        <div
          className="banner-avatar"
          style={{ backgroundImage: `url(${bannerUrl})` }}
        >
          {/* Other content if needed */}
        </div>
      )}
      {!bannerUrl && <h2>バナーはありません</h2>}
    </div>
  );
}

BannerAvatar.propTypes = {
  user: PropTypes.shape({
    banner: PropTypes.string,
  }),
};
