import React, { useState } from "react";
import { updatePassword } from "../../../api/user";
import { Button, Form, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import "./EditPasswordForm.scss";

export default function ChangePasswordForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState({
    current_password: "",
    password: "",
    password_confirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // バリデーションチェック
    if (formData.password !== formData.password_confirm) {
      toast.error("新しいパスワードと確認用パスワードが一致しません。");
      setLoading(false);
      return;
    }

    // 新しいパスワードと古いパスワードが一致しない場合のバリデーション
    if (formData.password === formData.current_password) {
      toast.error("新しいパスワードは古いパスワードと異なる必要があります。");
      setLoading(false);
      return;
    }

    try {
      // パスワードの更新リクエストを送信
      const response = await updatePassword(
        formData.current_password,
        formData.password,
      );

      if (
        response.data &&
        response.data.error === "current_password_mismatch"
      ) {
        // バックエンドからのエラーレスポンスをチェック
        toast.error("現在のパスワードが正しくありません。");
        setLoading(false);
        return;
      }

      setShowModal(false);
      toast.success("パスワードが更新されました。");
    } catch (error) {
      console.error("Error updating password:", error);
      // エラーレスポンスの内容に応じて異なるメッセージを表示
      if (
        error.response &&
        error.response.data.error === "current_password_mismatch"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("パスワードの更新中にエラーが発生しました。");
      }
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="change-password-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Control
            type="password"
            name="current_password"
            placeholder="現在のパスワード"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="password"
            name="password"
            placeholder="新しいパスワード"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="password"
            name="password_confirm"
            placeholder="新しいパスワードの確認"
            value={formData.passwordConfirm}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} 更新
        </Button>
      </Form>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
