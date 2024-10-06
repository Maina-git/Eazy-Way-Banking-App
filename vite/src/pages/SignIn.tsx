import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {signWithGooglePopup}  from "../config/Firebase"

interface authProps{
  setIsAuth:Boolean
}



const SignIn:React.FC <authProps>= ({setIsAuth}) => {

const handleLogin = async () =>{
  try{
    await signWithGooglePopup();

 setIsAuth(true);
  }catch(err){
    console.log(err);
  }
}

return (
    <div className="flex flex-col justify-center items-center">
      
      
      <h1 className="text-4xl text-blue-500 font-bold my-20">EAZY WAY</h1>
      <h2 className="mt-10 text-3xl text-blue-500">Sign in with Google  To Continue</h2>
      <button className="px-5 rounded-[20px] py-2 border-[2px] border-gray-300 text-gray-500 bg-white mt-20 flex" onClick={handleLogin}> <FcGoogle className="mx-2"/> Sign In With Google</button>
    </div>
  )
}
export default SignIn;

