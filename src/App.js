import React, { useState } from "react";
import Auth from "./page/Auth";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [
    user,
    // setUser
  ] = useState({ name: "志村 啓太" });

  return (
    <div>
      {user ? (
        <div>
          <Auth />
        </div>
      ) : (
        <h1>ログインしていません。</h1>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
