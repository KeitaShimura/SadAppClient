import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Close } from "../../../utils/icons";

import "./ConfigModal.scss";

export default function ConfigModal(props) {
  const { show, setShow, children } = props;

  return (
    <Modal
      className="config-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Close onClick={() => setShow(false)} />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

// propTypesでプロパティの型情報を指定
ConfigModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
