import React from "react";

import "./EditUserForm.scss";
import { Button, Form } from "react-bootstrap";

export default function EdigUserForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("テストテスト");
  };
  return (
    <div className="edit-user-form">
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Control type="text" name="name" placeholder="名前" />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            name="name"
            placeholder="自己紹介を書いてみましょう！"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control type="text" name="website" placeholder="ウェブサイト" />
        </Form.Group>
        <Button variant="primary" type="submit">
          更新
        </Button>
      </Form>
    </div>
  );
}
