import React from "react";
import PropTypes from "prop-types";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup } from "react-bootstrap";

export default function Users(props) {
  const { setRefreshCheckLogin } = props;

  return (
    <BasicLayout
      className="users"
      title="users"
      setRefreshCheckLogin={setRefreshCheckLogin}
      >
          <div className="users__title">
              <h2>ユーザー一覧</h2>
              <input type="text" placeholder="同じ悩みを持つ仲間を探してみましょう！" />
          </div>
    
          <ButtonGroup className="users__options">
              <Button>フォロー中</Button>
              <Button>フォロワー</Button>
          </ButtonGroup>
    </BasicLayout>
  );
}

// propTypes の宣言
Users.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired, // setRefreshCheckLogin は関数であり、必須であることを示す
};
