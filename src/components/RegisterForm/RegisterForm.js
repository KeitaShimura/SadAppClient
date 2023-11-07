import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  size,
  values,
  // size
} from "lodash";
// import { toast } from 'react-toastify';
import "./RegisterForm.scss";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validation";

export default function RegisterForm(props) {
  // const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFromValue());

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    console.log(validCount);

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
            placeholder="名前"
            name="name"
            defaultValue={formData.name}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="email"
            placeholder="メールアドレス"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="パスワード"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="パスワード確認"
                name="confirmPassword"
                defaultValue={formData.confirmPassword}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          登録
        </Button>
      </Form>
    </div>
  );
}

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
