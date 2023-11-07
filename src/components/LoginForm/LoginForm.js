import React from "react";

import "./LoginForm.scss";
import { Button, Form } from "react-bootstrap";

export default function LoginForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("login");
  };
  return (
    <div className="login-form">
      <h2>ログイン</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Control
            type="email"
            placeholder="メールアドレス"
            name="email"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="password"
            placeholder="パスワード"
            name="password"
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          ログイン
        </Button>
      </Form>
    </div>
  );
}
