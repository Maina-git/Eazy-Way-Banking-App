import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignIn from "./pages/SignIn"; 
import BankPage from "./pages/BankPage";
import WithDraw from "./pages/WithDraw";
import Navbar from "./components/Navbar";
import Loans from "./pages/Loans";
import Transactions from "./pages/Transactions";
import Logout from "./pages/Logout";




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
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/bankpage" element={<BankPage/>}/>
      <Route path="/withdraw" element={<WithDraw/>} />
      <Route path="/loans" element={<Loans/>}/>
      <Route path="/Transactions" element={<Transactions/>}/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
</Router>
</>
)
}
export  default  App;



