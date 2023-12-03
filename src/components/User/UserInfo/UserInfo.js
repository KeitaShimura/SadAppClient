import React from "react";
// import moment from "moment";
// import localization from "moment/locale/ja";
import {
  Location,
  Link,
  // DataBirth
} from "../../../utils/icons";
import PropTypes from "prop-types";
import "./UserInfo.scss";

export default function UserInfo(props) {
  const { user } = props;
  return (
    <div className="user-info">
      <h2 className="name">{user?.name}</h2>
      {user?.bio && <div className="bio">{user?.bio}</div>}
      <div className="more-info">
        {user?.location && (
          <p>
            <Location />
            {user.location}
          </p>
        )}
        {user?.website && (
          <p>
            <a
              href={user.website}
              alt={user.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link /> {user.website}
            </a>
          </p>
        )}
        {/* {user?.birth_date && (
          <p>
            <DataBirth />
            {moment(user.birth_date).locale("ja", localization).format("LL")}
          </p>
        )} */}
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    birth_date: PropTypes.string,
  }),
};
