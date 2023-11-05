import React from "react";
import PropTypes from "prop-types";

import "./RegisterForm.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function RegisterForm(props) {
  const { setShowModal } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  return (
    <div className="register-form">
      <h2>新規登録フォーム</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Control type="text" placeholder="名前" />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control type="email" placeholder="メールアドレス" />
        </Form.Group>
        <Form.Group className="form-group">
          <Row>
            <Col>
              <Form.Control type="password" placeholder="パスワード" />
            </Col>
            <Col>
              <Form.Control type="password" placeholder="パスワード確認" />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          登録
        </Button>
      </Form>
    </div>
  );
}

RegisterForm.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
