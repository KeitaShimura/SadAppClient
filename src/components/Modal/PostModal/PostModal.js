import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { Close } from "../../../utils/icons";
import classNames from "classnames";
import { createPostApi } from "../../../api/post";
import "./PostModal.scss";
import { toast } from "react-toastify";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const maxLength = 500;

  const onSubmit = async (e) => {
    e.preventDefault();

    // バリデーションチェック
    if (message.trim().length === 0 || message.trim().length > maxLength) {
      toast.error("コメントは1文字以上500文字以下である必要があります。");
      return;
    }

    try {
      // createPostApiを呼び出してメッセージと画像を作成
      await createPostApi({ content: message }, image);

      // メッセージをクリアしてモーダルを閉じる
      toast.success("投稿が作成されました。");
      setMessage("");
      setImage(null);
      setShow(false);
    } catch (error) {
      // エラーをハンドル
      console.error("Error creating post:", error);
      toast.warning(
        "投稿の送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
          <Form.Label>画像をアップロード</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={onChangeFile} />
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
