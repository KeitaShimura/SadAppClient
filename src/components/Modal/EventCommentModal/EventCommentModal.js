import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { Close } from "../../../utils/icons";
import classNames from "classnames";
import "./EventCommentModal.scss";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { createEventCommentApi } from "../../../api/eventComment";

export default function EventCommentModal(props) {
  const { show, setShow } = props;
  const params = useParams();

  const [message, setMessage] = useState("");

  const maxLength = 200;

  const onSubmit = async (e) => {
    e.preventDefault();

    // バリデーションチェック
    if (message.trim().length === 0 || message.trim().length > 500) {
      toast.warning("コメントは1文字以上500文字以下である必要があります。");
      return;
    }

    try {
      // コメントを作成
      await createEventCommentApi(params.id, {
        content: message,
      });

      window.location.reload();
      // メッセージをクリアしてモーダルを閉じる
      toast.success("コメントが作成されました。");
      setShow(false);
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.warning(
        "コメントの送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
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
            name="content"
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
            コメントする
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EventCommentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
