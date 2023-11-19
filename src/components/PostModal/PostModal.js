import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { Close } from "../../utils/icons";
import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Message submitted:", message);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

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
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows={6}
            value={message}
            onChange={handleChange}
            placeholder="今の気持ちを共有してみましょう！"
          />
          <span className="count">{message.length}</span>
          <Button type="submit">投稿する</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

PostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
