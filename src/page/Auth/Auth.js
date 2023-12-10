import React, { useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import BasicModal from "../../components/Modal/BasicModal";
import RegisterForm from "../../components/Modal/RegisterForm";
import LoginForm from "../../components/Modal/LoginForm";
import "./Auth.scss";
import PropTypes from "prop-types";
import PostPng from "../../assets/png/post.png";
import EventPng from "../../assets/png/event.png";
import UserPng from "../../assets/png/user.png";
import Logo from "../../assets/png/logo.png";

export default function Auth() {
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
          <RightComponent openModal={openModal} setShowModal={setShowModal} />
        </Row>
      </Container>
      {contentModal && (
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}
        </BasicModal>
      )}
    </>
  );
}

function LeftComponent() {
  return <Col className="auth__top" xs={12}></Col>;
}

function RightComponent(props) {
  const { openModal } = props;

  // スタイルオブジェクトを定義して、<p>要素に適用
  const paragraphStyle = {
    whiteSpace: "normal", // テキストを折り返す
  };

  return (
    <div>
      <Col
        className="auth__bottom d-flex flex-column align-items-center"
        xs={12}
      >
        <div className="mb-4">
          <h1>対人恐怖症の方のためのSNS</h1>
          <Image className="logo" src={Logo} width={200} />
        </div>
        <div className="mb-4">
          <Button variant="primary" onClick={() => openModal(<RegisterForm />)}>
            新規登録
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openModal(<LoginForm />)}
          >
            ログイン
          </Button>
        </div>
      </Col>
      <div className="scroll-container">
        <div>
          <h2>人と話すのが怖い</h2>
          <h3>同じ悩みを持つ仲間と悩みを話しませんか？</h3>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-5">
          <Card className="text-center mb-4 card-custom" width="80%">
            <div className="card-content">
              <img src={PostPng} alt="Image 3" className="card-image" />
              <p className="h2 fw-bold mx-3" style={paragraphStyle}>
                日常の気持ちを仲間とシェアしてみましょう！
              </p>
            </div>
          </Card>
          <Card className="text-center mb-4 card-custom" width="80%">
            <div className="card-content">
              <img src={EventPng} alt="Image 3" width="80%" className="mb-4" />
              <p className="h2 fw-bold mx-3" style={paragraphStyle}>
                オンラインで仲間と交流してみましょう！
              </p>
            </div>
          </Card>
          <Card className="text-center mb-4 card-custom" width="80%">
            <div className="card-content">
              <img src={UserPng} alt="Image 3" width="80%" className="mb-4" />
              <p className="h2 fw-bold mx-3" style={paragraphStyle}>
                コメントを投稿し、親睦を深めましょう！
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
RightComponent.propTypes = {
  openModal: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
