import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import "./EditUserForm.scss";
import moment from "moment";

export default function EditUserForm(props) {
  const {
    user,
    // setShowModal
  } = props;
  const [formData, setFormData] = useState(initialFromValue(user));

  useEffect(() => {
    setFormData(initialFromValue(user));
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="edit-user-form">
      <Form onSubmit={onSubmit}>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="name"
            defaultValue={formData.name}
            placeholder="名前"
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
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="website"
            defaultValue={formData.website}
            placeholder="ウェブサイト"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            name="location"
            defaultValue={formData.location}
            placeholder="居住地"
          />
        </Form.Group>

        <Form.Group>
          {moment(formData.birth_date, "YYYY/MM/DD", true).isValid() ? (
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale={ja}
              selected={moment(formData.birth_date).toDate()}
              placeholder="生年月日"
            />
          ) : (
            <DatePicker
              dateFormat="yyyy/MM/dd"
              locale={ja}
              placeholder="生年月日"
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
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
