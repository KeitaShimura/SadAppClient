import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BasicModal from "../../components/Modal/BasicModal";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import "./Auth.scss";
import PropTypes from "prop-types";
import TestPng from "../../assets/png/test.png";

export default function Auth(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Container className="auth" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return <Col className="auth__top" xs={12}></Col>;
}

function RightComponent(props) {
  const { openModal, setRefreshCheckLogin } = props;

  // 画像の幅を設定する
  const imageWidth = 400;

  // スタイルオブジェクトを定義して、<p>要素に適用
  const paragraphStyle = {
    width: imageWidth,
    whiteSpace: "normal", // テキストを折り返す
  };

  return (
    <div>
      <Col
        className="auth__bottom d-flex flex-column align-items-center"
        xs={12}
      >
        <div>
          <div>
            <h1>人と話すのが怖い</h1>
            <h2>同じ悩みを持つ仲間と悩みを話しませんか？</h2>
          </div>
          <Button
            variant="primary"
            onClick={() =>
              openModal(
                <RegisterForm setRefreshCheckLogin={setRefreshCheckLogin} />,
              )
            }
          >
            新規登録
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              openModal(
                <LoginForm setRefreshCheckLogin={setRefreshCheckLogin} />,
              )
            }
          >
            ログイン
          </Button>
        </div>
      </Col>
      <div className="scroll-container">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-5">
          <div className="text-center">
            <img
              src={TestPng}
              alt="Image 3"
              width={imageWidth} // 画像の幅を設定
            />
            <p className="h2 mt-5 fw-bold mx-3" style={paragraphStyle}>
              日常の気持ちを仲間とシェアしてみましょう！
            </p>
          </div>
          <div className="text-center">
            <img
              src={TestPng}
              alt="Image 3"
              width={imageWidth} // 画像の幅を設定
            />
            <p className="h2 mt-5 fw-bold mx-3" style={paragraphStyle}>
              オンラインで仲間と交流してみましょう！
            </p>
          </div>
          <div className="text-center">
            <img
              src={TestPng}
              alt="Image 3"
              width={imageWidth} // 画像の幅を設定
            />
            <p className="h2 mt-5 fw-bold mx-3" style={paragraphStyle}>
              コメントを投稿し、親睦を深めましょう！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};

// propTypesでプロパティの型情報を指定
RightComponent.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
