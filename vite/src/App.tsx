import React, { useState } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Context from "./context/Context";


const App: React.FC = () => {
const  [isAuth, setIsAuth]=useState<boolean>(false);

if(!isAuth){
  return (
    <>
    <SignIn  setIsAuth={setIsAuth} />
    </>
  )
}
return (
  <>
  <Context>
    <Home/>
  </Context>

</>
)
}
export  default  App;



