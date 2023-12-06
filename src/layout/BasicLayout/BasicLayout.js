import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./BasicLayout.scss";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RightMenu from "../../components/RightBar";

export default function BasicLayout(props) {
  const { className, children, showBackButton = true } = props;
  const navigate = useNavigate();

  // 戻るボタンのクリックイベントハンドラ
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Header />
        <Col md={8} className="basic-layout__content">
          {showBackButton && (
            <Button className="back-button" onClick={handleBackButtonClick}>
              <FontAwesomeIcon icon={faArrowLeft} /> 戻る
            </Button>
          )}
          {children}
        </Col>
        <Col xs={4} className="basic-layout__menu mt-4">
          <RightMenu />
        </Col>
      </Row>
    </Container>
  );
}

// propTypesの更新
BasicLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  showBackButton: PropTypes.bool, // 新しいプロパティ
};
