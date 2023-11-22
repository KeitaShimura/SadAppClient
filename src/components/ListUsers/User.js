import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserApi } from "../../api/user";
import { toast } from "react-toastify";
import { Image } from "react-bootstrap";
import IconNotFound from "../../assets/png/icon-no-found.png";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);
  const iconUrl = user?.icon ? user.icon : IconNotFound;

  console.log(userInfo);
  useEffect(() => {
    getUserApi(user.id)
      .then((response) => {
        console.log(response);
        setUserInfo(response);
        if (!response) toast.error("このユーザーは存在しません。");
      })
      .catch(() => {
        toast.error("このユーザーは存在しません。");
      });
  }, [user]);

  return (
    <div className="user">
      <Image className="icon" src={iconUrl} roundedCircle />
      {userInfo && (
        <div>
          <div className="name">{userInfo.name}</div>
          <div className="name">
            <p>{userInfo.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    bio: PropTypes.string,
  }),
  userInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    bio: PropTypes.string,
  }),
};
