import React from "react";
import Logo from "../../assets/png/error-404.png";
import "./Error404.scss";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="error404">
      <h2>COCOLOTalk</h2>
      <img src={Logo} alt="Error404" />
      <Link to="/">ホームへ戻る</Link>
    </div>
  );
}
