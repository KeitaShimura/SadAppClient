import React from "react";
import { Image, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "./BasicModal.scss";
import Logo from "../../../assets/png/logo.png";

export default function BasicModel(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Image src={Logo} width={80} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

// propTypesでプロパティの型情報を指定
BasicModel.propTypes = {
  show: PropTypes.bool.isRequired, // 'show' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  setShow: PropTypes.func.isRequired, // 'setShow' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  children: PropTypes.node.isRequired, // 'children' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
};
