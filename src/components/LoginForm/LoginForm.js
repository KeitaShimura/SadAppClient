import React, { useState } from "react";

import "./LoginForm.scss";
import { Button, Form, Spinner } from "react-bootstrap";
import {
  size,
  values,
  // size
} from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";

export default function LoginForm() {
  const [formData, setFormData] = useState(initialFromValue());
  const [loginLoading, setLoginLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warning("全ての項目を入力してください。");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("メールアドレスの形式が異なります。");
      } else {
        setLoginLoading(true);
        toast.success("アカウントを登録しました。");
      }
    }
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
          {!loginLoading ? "ログイン" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFromValue() {
  return {
    email: "",
    password: "",
  };
}
