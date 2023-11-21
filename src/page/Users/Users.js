import React from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;

  return (
    <BasicLayout
      className="users"
      title="users"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <h2>ユーザー一覧</h2>
    </BasicLayout>
  );
}

// propTypes の宣言
Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired, // setRefreshCheckLogin は関数であり、必須であることを示す
};
