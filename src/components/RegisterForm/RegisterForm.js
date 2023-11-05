import React, { useState } from "react";
import PropTypes from "prop-types";

import "./RegisterForm.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function RegisterForm(props) {
    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFromValue());

    const onSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);

        console.log(formData);
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    return (
        <div className="register-form">
            <h2>新規登録フォーム</h2>
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
        confirmPassword: ""
    }
}