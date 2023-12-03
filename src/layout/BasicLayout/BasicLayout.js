import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./BasicLayout.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BasicLayout(props) {
  const { className, children } = props;
  const navigate = useNavigate();

  // 戻るボタンのクリックイベントハンドラ
  const handleBackButtonClick = () => {
    navigate(-1); // 1ステップ前に戻る
  };

  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Header />
        <Col xs={12} className="basic-layout__content">
          <Button className="back-button" onClick={handleBackButtonClick}>
            <FontAwesomeIcon icon={faArrowLeft} /> 戻る
          </Button>
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