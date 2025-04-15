import React, { useContext } from "react";
import { IoNotifications } from "react-icons/io5";
import { AppContext } from "../../context/Context";

interface NavBarProps {
  NavItems: { id: number; title: string; path: JSX.Element; icon: JSX.Element }[];
  onBankClick: (path: JSX.Element) => void;
  toNotifications: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NotificationBadge: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      !
    </span>
  );
};

const SideBar: React.FC<NavBarProps> = ({
  NavItems,
  onBankClick,
  toNotifications,
  open,
  setOpen,
}) => {
  const context = useContext(AppContext);


  const notification = context?.notification || false;

  return (
    <>
      <div className="hidden md:block md:w-1/4 p-5 m-1 rounded-lg h-screen bg-gradient-to-r from-blue-400 to-blue-800 flex flex-col gap-6 left-0 top-0">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-2xl my-2">EAZY WAY</h1>
          <div className="relative my-2 cursor-pointer" onClick={toNotifications}>
            <IoNotifications className="text-white text-xl" />
            <NotificationBadge visible={notification} />
          </div>
        </div>
        <nav className="space-y-4">
          {NavItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onBankClick(item.path)}
              className="flex bg-white rounded-lg items-center gap-4 text-blue text-lg py-2 px-3 hover:bg-blue-200 transition duration-300 cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span> {item.title}
            </div>
          ))}
        </nav>
      </div>
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}></div>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex justify-between p-5">
          <h1 className="text-white font-bold text-2xl">EAZY WAY</h1>
        </div>
        <div className="p-4">
          <div className="relative my-2 cursor-pointer" onClick={toNotifications}>
            <IoNotifications className="text-white text-xl" />
            <NotificationBadge visible={notification} />
          </div>
          <nav className="mt-5 space-y-4">
            {NavItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onBankClick(item.path);
                  setOpen(false);
                }}
                className="flex bg-white rounded-lg items-center gap-4 text-blue text-lg py-2 px-3 hover:bg-blue-200 transition duration-300 cursor-pointer">
                <span className="text-xl">{item.icon}</span> {item.title}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;





