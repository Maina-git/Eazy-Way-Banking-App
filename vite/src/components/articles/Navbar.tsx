import React from "react";



interface NavBarProps {
  NavItems:  { id: number; title: string; path: JSX.Element; icon: JSX.Element }[]; 
  onBankClick: (path: JSX.Element) => void;
}

const NavBar: React.FC<NavBarProps> = ({ NavItems, onBankClick }) => {
  return (
    <div className="w-1/4 p-5 h-screen bg-blue-500 flex flex-col gap-6  left-0 top-0">
      <h1 className="text-white font-bold text-2xl my-6">EAZY WAY</h1>
      <nav className="space-y-4">
        {NavItems.map((item) => (
          <div
            key={item.id}
          
            onClick={() => onBankClick(item.path)}
            className="flex items-center gap-4 text-white text-lg py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer">
            <span className="text-xl">{item.icon}</span> {item.title}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
