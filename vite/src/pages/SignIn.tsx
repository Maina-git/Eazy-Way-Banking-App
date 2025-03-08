import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import { collection } from "firebase/firestore";

interface AuthProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<AuthProps> = ({ setIsAuth }) => {
  const [name, setName]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuth(true);
      addDoc(collection(db, "users"), {
        name,
        userId:auth.currentUser?.uid,
        createdAt:serverTimestamp()
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">


    
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-center bg-white shadow-md rounded-lg mx-4 my-6 md:my-0 md:mx-0">
        <h1 className="text-4xl font-bold text-blue-500">Eazy Way</h1>
        <span className="text-sm text-blue-500 mt-2">Seamless Banking, Secure Future.</span>
        <form onSubmit={handleSignUp} className="mt-6 w-full max-w-xs">
        <div className="mb-4">
            <label className="block text-gray-600 text-left mb-1">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Name" 
              required/>
          </div>

          <div>
          <label className="block text-gray-600 text-left mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email" 
              required/>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-left mb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password" 
              required/>
            <div 
              className="absolute right-3 top-10 cursor-pointer" 
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-600 text-left mb-1">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              value={confirm} 
              onChange={(e) => setConfirm(e.target.value)} 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password" 
              required/>
            <div 
              className="absolute right-3 top-10 cursor-pointer" 
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>


          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>
    </div>
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 h-full bg-gradient-to-r from-blue-200 to-blue-500 text-white p-6">
        <p className="text-4xl md:text-[100px] font-bold text-center">Eazy Way</p>
      </div>
    </div>
  );
};

export default SignIn;




