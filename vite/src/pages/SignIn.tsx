import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signWithGooglePopup } from "../config/Firebase";

interface AuthProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<AuthProps> = ({ setIsAuth }) => {
  const handleLogin = async () => {
    try {
      await signWithGooglePopup();
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-center">
        <h2 className="mt-10 text-2xl md:text-3xl text-blue-500">
          Sign in with Google to Continue
        </h2>
        <button
          className="px-5 py-2 mt-10 flex items-center text-gray-500 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
          onClick={handleLogin}>
          <FcGoogle className="mr-2 text-xl" /> Sign In With Google
        </button>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-full bg-blue-500 text-white p-6">
        <p className="text-4xl md:text-6xl font-bold text-center">Eazy Way</p>
        <span className="text-sm md:text-xs mt-2">
          Simple banking app for every African
        </span>
      </div>
    </div>
  );
};

export default SignIn;

