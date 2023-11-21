import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { Close } from "../../utils/icons";
import classNames from "classnames";
import { createPostApi } from "../../api/post";
import "./PostModal.scss";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxLength = 200;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call createPostApi with the message
      const response = await createPostApi({ description: message });
      console.log("Post created:", response.data);

      // Clear the message and close the modal
      toast.success(response.message);
      setShow(false);
      window.location.reload();
    } catch (error) {
      // Handle any errors here
      console.error("Error creating post:", error);
      toast.warning(
        "ツイートの送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
      window.location.reload();
    }
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
            type="text"
            name="description"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="今の気持ちを共有してみましょう！"
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            {message.length}
          </span>
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            投稿する
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

PostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
