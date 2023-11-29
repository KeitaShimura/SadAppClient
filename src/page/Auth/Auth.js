import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BasicModal from "../../components/Modal/BasicModal";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import "./Auth.scss";
import PropTypes from "prop-types";

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
  return (
    <Col className="auth__top" xs={12}>
      <div>
        <h2>人と話すのが怖い</h2>
        <h2>同じ悩みを持つ仲間と悩みを話しませんか？</h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setRefreshCheckLogin } = props;
  return (
    <Col className="auth__bottom" xs={12}>
      <div>
        <Button
          variant="primary"
          onClick={() =>
            openModal(<RegisterForm setRefreshCheckLogin={setRefreshCheckLogin} />)
          }
        >
          新規登録
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(<LoginForm setRefreshCheckLogin={setRefreshCheckLogin} />)
          }
        >
          ログイン
        </Button>
      </div>
    </Col>
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
