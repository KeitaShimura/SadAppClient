import React from "react";
import Logo from "../../assets/png/logo.png";
import "./Error404.scss";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Error404() {
  return (
    <div className="error404">
      <h2>ページが存在しません。</h2>
      <Image className="logo" src={Logo} width={200} />
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} /> ホームへ戻る
      </Link>
    </div>
  );
}
