import React, { useEffect, useState } from "react";
import Auth from "./page/Auth";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLoggedAPI } from "./api/auth";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(isUserLoggedAPI());
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {user ? <h1 style={{ color: 'red' }}>ログインしていますか</h1> : <Auth />}
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
    </AuthContext.Provider>
  );
}
