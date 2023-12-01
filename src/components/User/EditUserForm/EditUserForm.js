import React, { useState, useEffect, useCallback } from "react";
import { updateUserData } from "../../../api/user";
import { Button, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import moment from "moment";
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

    await updateUserData(bannerFile, iconFile, formData)
      .then(() => {
        setShowModal(false);
        console.log("success");
      })
      .catch(() => {
        // エラー時のメッセージ
        toast.error("データの更新中にエラーが発生しました。");
      });

    setLoading(false);
    window.location.reload();
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

        <Form.Group>
          {moment(formData.birth_date, "YYYY/MM/DD", true).isValid() ? (
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale={ja}
              selected={moment(formData.birth_date).toDate()}
              placeholder="生年月日"
              onChange={(date) =>
                setFormData({ ...formData, birth_date: date })
              }
            />
          ) : (
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale={ja}
              placeholder="生年月日"
              onChange={(date) =>
                setFormData({ ...formData, birth_date: date })
              }
            />
          )}
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
