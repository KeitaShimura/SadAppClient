import React from "react";
import PropTypes from "prop-types";

import "./BasicLayout.scss";
import { Col, Container, Row } from "react-bootstrap";

export default function BasicLayout(props) {
  const { className, children } = props;

  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <h2>Menu...</h2>
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}

// propTypesでプロパティの型情報を指定
BasicLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
