import React, { useState } from "react";
import Auth from "./page/Auth";
import { ToastContainer } from "react-toastify";
import Routing from "./routes/Routing";

export default function App() {
  const [
    user,
    // setUser
  ] = useState({ name: "志村 啓太" });

  return (
    <div>
      {user ? (
        <div>
          <Routing />
        </div>
      ) : (
        <Auth />
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
