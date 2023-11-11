import React from "react";
import PropTypes from "prop-types";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  const { children } = props;

  return (
    <div>
      <h2>BasicLayout...</h2>
      {children}
    </div>
  );
}

// propTypesでプロパティの型情報を指定
BasicLayout.propTypes = {
  children: PropTypes.node,
};
