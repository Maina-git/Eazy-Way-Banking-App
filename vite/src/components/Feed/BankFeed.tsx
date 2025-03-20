

import React from 'react';
import { RiMenuFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

interface BankFeedProps {
  bankItem: JSX.Element;
  open: boolean;
  openNavbar: () => void;
}

const BankFeed: React.FC<BankFeedProps> = ({ bankItem, open, openNavbar}) => {



  return (
    <div 
      style={{ scrollbarWidth: "none" }}
      className="w-full md:w-3/4 h-screen overflow-hidden overflow-y-scroll relative">
  
      <button 
        onClick={openNavbar} 
        className="block md:hidden bg-red-500 absolute top-3 right-3 p-3 rounded-full text-white font-bold">
        {open ? <IoClose /> : <RiMenuFill />}
      </button>
      {bankItem}
    </div>
  );
};

export default BankFeed;
















