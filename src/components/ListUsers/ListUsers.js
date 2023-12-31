import React from "react";
import PropTypes from "prop-types";
import { isEmpty, map } from "lodash";
import User from "./User";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { users } = props;

  if (isEmpty(users)) {
    return <p className="text-center mt-2 fw-bold">ユーザーは存在しません</p>;
  }

  return (
    <ul className="list-users">
      {map(users, (user) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
}

ListUsers.propTypes = {
  users: PropTypes.array.isRequired,
};
