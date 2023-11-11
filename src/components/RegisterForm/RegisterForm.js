import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  size,
  values,
  // size
} from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";

import "./RegisterForm.scss";

export default function RegisterForm(props) {
  // const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFromValue());
  const [registerLoading, setRegisterLoading] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

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
      } else if (formData.password !== formData.confirmPassword) {
        toast.warning("パスワードが一致しません。");
      } else if (size(formData.password) < 6) {
        toast.warning("パスワードは6文字以上に設定してください。");
      } else {
        setRegisterLoading(true);
        toast.success("アカウントを登録しました。");
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-form">
      <h2>新規登録</h2>
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
                name="confirmPassword"
                placeholder="パスワード確認"
                defaultValue={formData.confirmPassword}
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
  setShowModal: PropTypes.func.isRequired,
};

function initialFromValue() {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
}
