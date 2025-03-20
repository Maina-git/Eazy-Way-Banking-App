import React from 'react'
import SideBar from '../components/articles/SideBar';
import BankFeed from '../components/Feed/BankFeed';
import BankPage from './FeedPages/BankPage';
import Transactions from './FeedPages/Transactions';
import Logout from './Logout';
import Loans from './FeedPages/Loans';
import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useState } from 'react';
import Notifications from './Notifications';

interface NavItem{
    id:number,
    title:string,
    icon:JSX.Element,
    path:JSX.Element
}

const Home:React.FC = () => {

  const [notifications, setNotifications]=useState<boolean>(false);
  const [open, setOpen]=useState(false);

  const openNavbar=()=>{
    setOpen(prev=>!prev);
  }

  const toNotifications=()=>{
    setNotifications(prev=>!prev);
  }



const [bankItem, setBankItem]=useState<JSX.Element | null>(<BankPage/>)
  const NavItems:NavItem[]=[
    {
      id:1,
      title:"My Account",
      icon:<RiAccountCircleFill/>,
      path:<BankPage/>
    },
    {
      id:2,
      title:"Transactions",
      icon:<BsCurrencyExchange/>,
      path:<Transactions/>
    },
    {
      id:3,
      title:"E Loans",
      icon:<FaMoneyBillTrendUp/>,
      path:<Loans/>
    },
    {
      id:4,
      title:"Logout",
      icon:<RiLogoutBoxRFill/>,
      path:<Logout/>
    },
  ]
  const handleClick=(selectedBankItem:JSX.Element)=>{
setBankItem(selectedBankItem);
  }


if (notifications) return <Notifications toNotifications={toNotifications}/>

  return (
    <div  className="flex-col md:h-screen md:flex md:flex-row w-full">
        <SideBar open={open} setOpen={setOpen} NavItems={NavItems} onBankClick={handleClick}   toNotifications={toNotifications}/>
        <BankFeed bankItem={bankItem}  openNavbar={openNavbar} open={open}/>
    </div>
  )
}

export default Home;


