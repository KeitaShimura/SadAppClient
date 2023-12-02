import React from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-bootstrap";

// import LeftMenu from "../../components/LeftMenu";
import "./BasicLayout.scss";
import Header from "../../components/Header/Header";

export default function BasicLayout(props) {
  const { className, children } = props;

  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Header />
        {/* <Col xs={3} className="basic-layout__menu">
          <LeftMenu />
        </Col> */}
        <Col xs={12} className="basic-layout__content">
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
