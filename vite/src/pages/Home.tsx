
import React from 'react'
//import Navbar from '../components/articles/SideBar';
import SideBar from '../components/articles/SideBar';
import BankFeed from '../components/Feed/BankFeed';
import BankPage from './BankPage';
import Transactions from './Transactions';
import Logout from './Logout';
import Loans from './Loans';
import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useState } from 'react';

interface NavItem{
    id:number,
    title:string,
    icon:JSX.Element,
    path:JSX.Element
}

const Home:React.FC = () => {
const [bankItem, setBankItem]=useState<JSX.Element | null>(<BankPage/>)
  const NavItems:NavItem[]=[
    {
      id:1,
      title:"My Account",
      icon:<RiAccountCircleFill/>,
      path:<BankPage/>
    },
    {
      id:1,
      title:"Transactions",
      icon:<BsCurrencyExchange/>,
      path:<Transactions/>
    },
    {
      id:1,
      title:"E Loans",
      icon:<FaMoneyBillTrendUp/>,
      path:<Loans/>
    },
    {
      id:1,
      title:"Logout",
      icon:<RiLogoutBoxRFill/>,
      path:<Logout/>
    },
  ]
  const handleClick=(selectedBankItem:JSX.Element)=>{
setBankItem(selectedBankItem);
  }
  return (
    <div  className="h-screen flex flex-row w-full">
        <SideBar NavItems={NavItems} onBankClick={handleClick}/>
        <BankFeed bankItem={bankItem}/>
    </div>
  )
}

export default Home;







