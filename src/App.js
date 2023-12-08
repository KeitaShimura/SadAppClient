import React, { useEffect, useState } from "react";
import Auth from "./page/Auth";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isUserLoggedAPI } from "./api/auth";
import Routing from "./routes/Routing";
import Footer from "./components/Footer";

export default function App() {
  const [user, setUser] = useState(null);
  const [refreshCheckLogin] = useState(false);
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    setUser(isUserLoggedAPI());
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
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
      <Footer />
    </AuthContext.Provider>
  );
}
