import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import configRouting from "./configRouting";

export default function Routing() {
  return (
    <Router>
      <Routes>
        {configRouting.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}
