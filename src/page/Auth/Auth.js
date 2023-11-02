import React from "react";
import { Col, Container, Row } from "react-bootstrap";

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
    <Col className="auth__left">
      <h2>左側</h2>
    </Col>
  );
}

function RightComponent() {
  return (
    <Col className="auth__right">
      <h2>右側</h2>
    </Col>
  );
}
