import React, { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialFromValue(user));
  const bannerUrl = user?.banner ? user.banner : null;

  const onDropBanner = useCallback((acceptedFile) => {
    console.log(acceptedFile);
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

  console.log(user.banner);

  useEffect(() => {
    setFormData(initialFromValue(user));
  }, [user]);

  const onChange = (e) => {
    setShowModal({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="edit-user-form">
      <div
        className="banner-icon"
        style={{ backgroundImage: `url(${bannerUrl})` }}
        {...getRootBannerProps()}
      >
        <input {...getInputBannerProps()} />
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
          更新
        </Button>
      </Form>
    </div>
  );
}

// propTypesでプロパティの型情報を指定
EditUserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
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
    bio: user.bio || "",
    website: user.website || "",
    location: user.location || "",
    birth_date: user.birth_date || "",
  };
}
