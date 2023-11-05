import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Auth.scss";

export default function Auth() {
  return (
    <Container className="auth" fluid>
      <Row>
        <LeftComponent />
        <RightComponent />
      </Row>
    </Container>
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

function RightComponent() {
  return (
    <Col className="auth__right">
      <div>
        <Button variant="primary">新規登録</Button>
        <Button variant="outline-primary">ログイン</Button>
      </div>
    </Col>
  );
}
