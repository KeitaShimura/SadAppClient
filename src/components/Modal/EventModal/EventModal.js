import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "react-bootstrap";
import { Close } from "../../../utils/icons";
import classNames from "classnames";
import { createEventApi } from "../../../api/event";
import "./EventModal.scss";
import { toast } from "react-toastify";
import { isValidDateFormat } from "../../../utils/functions";

export default function EventModal(props) {
  const { show, setShow } = props;
  const [formData, setFormData] = useState(initialFromValue());
  const maxLength = 200;

  const onSubmit = async (e) => {
    e.preventDefault();
    // バリデーションチェック
    if (formData.title.length === 0 || formData.title.length > 100) {
      toast.warning(
        "イベントタイトルは1文字以上100文字以下である必要があります。",
      );
      return;
    }

    if (formData.content.length > 500) {
      toast.warning("イベント内容は500文字以下である必要があります。");
      return;
    }

    if (!isValidDateFormat(formData.eventDate)) {
      toast.warning(
        "不正な日付形式です。日付はYYYY-MM-DD HH:mmの形式で指定してください。",
      );
      return;
    }

    try {
      // Call createEventApi with formData
      const response = await createEventApi(formData);
      console.log("Event created:", response.data);

      // Clear the form and close the modal
      toast.success(response.message);
      setShow(false);
      window.location.reload();
    } catch (error) {
      // Handle any errors here
      console.error("Error creating event:", error);
      toast.warning(
        "イベントの投稿中にエラーが発生しました。もう一度お試しください。",
      );
      window.location.reload();
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      className="event-modal"
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
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              name="title"
              placeholder="タイトル"
              value={formData.title} // valueプロパティを追加
              onChange={onChange} // onChangeイベントハンドラを追加
            />
          </Form.Group>
          <Form.Control
            as="textarea"
            rows={6}
            type="text"
            name="content"
            value={formData.content} // valueプロパティを追加
            onChange={onChange} // onChangeイベントハンドラを追加
            placeholder="内容"
          />
          <span
            className={classNames("count", {
              error: formData.content.length > maxLength,
            })}
          >
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                name="event_url"
                placeholder="イベントURL"
                value={formData.event_url} // valueプロパティを追加
                onChange={onChange} // onChangeイベントハンドラを追加
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                type="date"
                name="event_date"
                placeholder="開催日"
                value={formData.event_date} // valueプロパティを追加
                onChange={onChange} // onChangeイベントハンドラを追加
              />
            </Form.Group>
            {formData.content.length}
          </span>
          <Button
            type="submit"
            disabled={
              formData.content.length > maxLength || formData.content.length < 1
            }
          >
            イベントを投稿する
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

function initialFromValue() {
  return {
    title: "",
    content: "",
    event_url: "",
    event_date: "",
  };
}
