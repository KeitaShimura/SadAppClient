import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";
import { registerApi, setTokenApi } from "../../api/auth";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFromValue());
  const [registerLoading, setRegisterLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirm
    ) {
      toast.warning("全ての項目を入力してください。");
    } else if (!isEmailValid(formData.email)) {
      toast.warning("メールアドレスの形式が異なります。");
    } else if (formData.password !== formData.password_confirm) {
      toast.warning("パスワードが一致しません。");
    } else if (formData.password.length < 6) {
      toast.warning("パスワードは6文字以上に設定してください。");
    } else {
      setRegisterLoading(true);
      registerApi(formData)
        .then((response) => {
          if (response.code) {
            toast.warning(response.message);
          } else {
            toast.success("アカウントを登録しました。");
            setTokenApi(response.token);
            setRefreshCheckLogin(true);
          }
        })
        .catch(() => {
          toast.error(
            "サーバーエラーが起こりました。時間を置いてもう一度試してください。",
          );
        })
        .finally(() => {
          setRegisterLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-form">
      <h2 className="text-center">新規登録</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="name"
            placeholder="名前"
            defaultValue={formData.name}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="email"
            name="email"
            placeholder="メールアドレス"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Row>
            <Col>
              <Form.Control
                type="password"
                name="password"
                placeholder="パスワード"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                name="password_confirm"
                placeholder="パスワード確認"
                defaultValue={formData.password_confirm}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!registerLoading ? "登録" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

// propTypesでプロパティの型情報を指定
RegisterForm.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};

function initialFromValue() {
  return {
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  };
}
