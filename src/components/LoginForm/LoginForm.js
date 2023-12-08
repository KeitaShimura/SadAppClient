import React, { useState } from "react";
import PropTypes from "prop-types";
import { loginApi, setTokenApi } from "../../api/auth";
import { isEmailValid } from "../../utils/validation";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFromValue());
  const [loginLoading, setLoginLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // フォームデータの各項目をチェック
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const value = formData[key];

        // フォームデータが空でないかチェック
        if (!value) {
          toast.warning("全ての項目を入力してください。");
          valid = false;
          break; // バリデーションエラーがある場合、ループを中断
        }

        // メールアドレスの形式が正しいかチェック
        if (key === "email" && !isEmailValid(value)) {
          toast.warning("メールアドレスの形式が異なります。");
          valid = false;
          break; // バリデーションエラーがある場合、ループを中断
        }
      }
    }

    // バリデーションエラーがない場合、APIリクエストを送信
    if (valid) {
      setLoginLoading(true);
      loginApi(formData)
        .then((response) => {
          if (response.message) {
            toast.warning(response.message);
          } else {
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
          setLoginLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-form">
      <h2 className="text-center">ログイン</h2>
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
          {!loginLoading ? "ログインする" : <Spinner animation="border" />}
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

LoginForm.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
