import React, { useState } from "react";
//import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";



const App: React.FC = () => {
const  [isAuth, setIsAuth]=useState<boolean>(false);

/*const handleLogin = async()=>{
  try{
  await signInWithPopup(auth, provider);
  setIsAuth(true);
  }catch(err){
console.log(err);
  }
}
  */

if(!isAuth){
  return (
    <>
    <SignIn  setIsAuth={setIsAuth} />
    </>
  )
}
return (
  <>
<Home/>
</>
)
}
export  default  App;



