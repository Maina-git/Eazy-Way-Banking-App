import React from "react";
import { auth } from "../config/Firebase";

const LogoutCard: React.FC = () => {
  return (
    <div className="bg-white w-full max-w-md mx-auto mt-5 p-6 rounded-xl shadow-lg flex flex-col items-center text-center">

      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"/>
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700">Seamless Banking, Secure Future</h2>
      <p className="text-gray-600 mt-2">
        You are signed in as <span className="font-medium text-blue-600">{auth.currentUser?.email}</span>
      </p>
      <p className="text-gray-500 mt-2">Are you sure you want to sign out?</p>
      <button className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition">
        Sign Out
      </button>
    </div>
  );
};

export default LogoutCard;
