import React, { useState } from "react";

import "./LoginForm.scss";
import { Button, Form } from "react-bootstrap";

export default function LoginForm() {
  const [formData, setFormData] = useState(initialFromValue());

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <h2>ログイン</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group className="form-group">
          <Form.Control
            type="email"
            name="email"
            placeholder="メールアドレス"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="password"
            name="password"
            placeholder="パスワード"
            defaultValue={formData.password}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          ログイン
        </Button>
      </Form>
    </div>
  );
}

function initialFromValue() {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
}
