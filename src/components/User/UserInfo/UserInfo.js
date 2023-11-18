import React from "react";
import PropTypes from "prop-types";
// import { Location, Link, DataBirth } from "../../../utils/icon";
import "./UserInfo.scss";

export default function UserInfo(props) {
  const { user } = props;
  return (
    <div className="user-info">
      <div className="name">{user?.name}</div>
      {user?.bio && <div className="bio">{user?.bio}</div>}
    </div>
  );
}

// Define PropTypes for UserInfo component
UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
  }),
};
