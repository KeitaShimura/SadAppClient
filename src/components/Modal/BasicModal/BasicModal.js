import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types"; // PropTypesをインポート

import "./BasicModal.scss";

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
        <Modal.Title>COCOLOTalk</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

// propTypesを追加してプロパティの型情報を指定
BasicModel.propTypes = {
  show: PropTypes.bool.isRequired, // 'show' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  setShow: PropTypes.func.isRequired, // 'setShow' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  children: PropTypes.node.isRequired, // 'children' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
};
