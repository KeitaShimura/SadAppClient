import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BasicModal from "../../components/Modal/BasicModal";
import RegisterForm from "../../components/RegisterForm";
import "./Auth.scss";
import PropTypes from "prop-types";

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
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="auth__left" xs={6}>
      <div>
        <h2>人と話すのが怖い</h2>
        <h2>同じ悩みを持つ仲間と悩みを話しませんか？</h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal } = props;
  return (
    <Col className="auth__right" xs={6}>
      <div>
        <Button
          variant="primary"
          onClick={() =>
            openModal(<RegisterForm setShowModal={setShowModal} />)
          }
        >
          新規登録
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => openModal(<h2>ログイン</h2>)}
        >
          ログイン
        </Button>
      </div>
    </Col>
  );
}

// propTypesを追加してプロパティの型情報を指定
RightComponent.propTypes = {
  openModal: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
