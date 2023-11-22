import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Follows.scss";
import BasicLayout from "../../layout/BasicLayout";
import { Button, ButtonGroup } from "react-bootstrap";
import { getFollowersApi, getFollowingApi } from "../../api/follow";
import { useParams } from "react-router-dom";

export default function Follows(props) {
  const params = useParams();
    const { setRefreshCheckLogin } = props;
  
  useEffect(() => {
    getFollowersApi(params.id)
      .then(users => {
        // ユーザーデータを扱う処理
        console.log(users);
      })
      .catch(err => {
        // エラーハンドリング
        console.error(err);
      });
  }, [params]);

  useEffect(() => {
    getFollowingApi(params.id)
      .then(users => {
        // ユーザーデータを扱う処理
        console.log(users);
      })
      .catch(err => {
        // エラーハンドリング
        console.error(err);
      });
  }, [params]);

  return (
    <BasicLayout
      className="follows"
      title="follows"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="follows__title">
        <h2>ユーザー一覧</h2>
        <input
          type="text"
          placeholder="同じ悩みを持つ仲間を探してみましょう！"
        />
      </div>

      <ButtonGroup className="follows__options">
        <Button>フォロー中</Button>
        <Button>フォロワー</Button>
      </ButtonGroup>
    </BasicLayout>
  );
}

// propTypes の宣言
Follows.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired, // setRefreshCheckLogin は関数であり、必須であることを示す
};
