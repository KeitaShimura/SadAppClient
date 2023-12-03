import React, { useState, useEffect, useCallback } from "react";
import { updateUserData } from "../../../api/user";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { Camera } from "../../../utils/icons";
import { toast } from "react-toastify";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialFromValue(user));
  const [bannerUrl, setBannerUrl] = useState(user?.banner || null);
  const [bannerFile, setBannerFile] = useState(null);
  const [iconUrl, setIconUrl] = useState(user?.icon || null);
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });

  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });

  const onDropIcon = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setIconUrl(URL.createObjectURL(file));
    setIconFile(file);
  });

  const { getRootProps: getRootIconProps, getInputProps: getInputIconProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
      noKeyboard: true,
      multiple: false,
      onDrop: onDropIcon,
    });

  useEffect(() => {
    setFormData(initialFromValue(user));
  }, [user]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // バリデーションチェック
    if (formData.name.length < 1 || formData.name.length > 255) {
      toast.error("ユーザー名は1文字以上255文字以下である必要があります。");
      return;
    }

    if (formData.email.length < 1 || formData.email.length > 255) {
      toast.error("メールアドレスは1文字以上255文字以下である必要があります。");
      return;
    }

    if (formData.bio.length > 1000) {
      toast.error("自己紹介文は1000文字以下である必要があります。");
      return;
    }

    if (formData.website.length > 255) {
      toast.error("ウェブサイトのURLは255文字以下である必要があります。");
      return;
    }

    if (formData.birth_date.length > 255) {
      toast.error("生年月日は255文字以下である必要があります。");
      return;
    }

    try {
      // バリデーションに合格した場合、データの更新を試行
      await updateUserData(bannerFile, iconFile, formData);
      setShowModal(false);
      window.location.reload();
      toast.success("プロフィールを更新しました。");
    } catch (error) {
      // エラー時のメッセージ
      console.error("Error updating data:", error);
      toast.error("データの更新中にエラーが発生しました。");
    }

    setLoading(false);
  };

  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerUrl})` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>
      <div
        className="icon"
        style={{ backgroundImage: `url(${iconUrl})` }}
        {...getRootIconProps()}
      >
        <input {...getInputIconProps()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="name"
            defaultValue={formData.name}
            placeholder="名前"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="email"
            name="email"
            defaultValue={formData.email}
            placeholder="メールアドレス"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            name="bio"
            defaultValue={formData.bio}
            placeholder="自己紹介を書いてみましょう！"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="website"
            defaultValue={formData.website}
            placeholder="ウェブサイト"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="location"
            defaultValue={formData.location}
            placeholder="居住地"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="date"
            name="birth_date"
            defaultValue={formData.birth_date}
            placeholder="生年月日"
            onChange={onChange}
          />
        </Form.Group>

        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} 更新
        </Button>
      </Form>
    </div>
  );
}

// propTypesでプロパティの型情報を指定
EditUserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string,
    birth_date: PropTypes.string,
    icon: PropTypes.string,
    banner: PropTypes.string,
  }),
  setShowModal: PropTypes.func.isRequired,
};

function initialFromValue(user) {
  return {
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    website: user.website || "",
    location: user.location || "",
    birth_date: user.birth_date || "",
  };
}
