import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Close } from "../../utils/icons";
import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;

  return (
    <Modal
      className="post-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
    </Modal>
  );
}

PostModal.propTypes = {
  show: PropTypes.bool.isRequired, // 'show' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  setShow: PropTypes.func.isRequired, // 'setShow' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
  children: PropTypes.node.isRequired, // 'children' プロパティの型情報を指定し、isRequiredを使って必須フィールドであることを示す
};
