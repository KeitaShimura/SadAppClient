import React, {useState} from "react";

export default function App() {
  const [user, setUser] = useState({name: "志村 啓太"});

  return <div>{user ? <h1>ログインしています。</h1> : <h1>ログインしていません。</h1>}</div>;
}