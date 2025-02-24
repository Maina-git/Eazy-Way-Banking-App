import React, { useState, useEffect } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Context from "./context/Context";

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(
    
    localStorage.getItem("isAuth") === "true");


  useEffect(() => {
    localStorage.setItem("isAuth", String(isAuth));
  }, [isAuth]);


  if (!isAuth) {
    return <SignIn setIsAuth={setIsAuth} />;
  }

  return (
    <Context>
      <Home />
    </Context>
  );
};

export default App;

