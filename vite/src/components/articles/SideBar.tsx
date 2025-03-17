import React from "react";
import { IoNotifications } from "react-icons/io5";
import { AppContext } from "../../context/Context";
import { useContext } from "react";


interface NavBarProps {
  NavItems:  { id: number; title: string; path: JSX.Element; icon: JSX.Element }[]; 
  onBankClick: (path: JSX.Element) => void;
toNotifications:any
}

const SideBar: React.FC<NavBarProps> = ({ NavItems, onBankClick, toNotifications}) => {

const {notification}=useContext(AppContext);


  return (
    <div className="w-1/4 p-5 m-1 rounded-lg h-screen bg-gradient-to-r from-blue-200 to-blue-500  flex flex-col gap-6  left-0 top-0">
     <div className="flex justify-between">
      <h1 className="text-white font-bold text-2xl my-2">EAZY WAY</h1>
      <div className="my-2 cursor-pointer" onClick={toNotifications}><IoNotifications className="text-white text-xl flex flex-row"/>  
      <span className={notification && `bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full`}>{notification ? 1 : null}</span>
      </div>
      </div>
      <nav className="space-y-4">
        {NavItems.map((item) => (
          <div
            key={item.id}
    
            onClick={() => onBankClick(item.path)}
            className="flex bg-white rounded-lg items-center gap-4 text-blue text-lg py-2 px-3  hover:bg-blue-200 transition duration-300 cursor-pointer">
            <span className="text-xl">{item.icon}</span> {item.title}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideBar; 