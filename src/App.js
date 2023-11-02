import React, { useState } from "react";
import Auth from "./page/Auth";

export default function App() {
  const [
    user,
    // setUser
  ] = useState({ name: "志村 啓太" });

  return <div>{user ? <Auth /> : <h1>ログインしていません。</h1>}</div>;
}
