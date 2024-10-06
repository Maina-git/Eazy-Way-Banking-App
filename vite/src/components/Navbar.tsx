import React from 'react'
import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";


const Navbar:React.FC = () => {
  return (
    <div className="w-full  h-[20vh] bg-blue-500 flex justify-between">
      <Link to="/bankpage" className="mx-10 w-[400px] flex   hover:bg-blue-300  text-2xl  justify-center items-center text-white font-bold"> <RiAccountCircleFill/> My Account</Link>
      <Link to="/Transactions" className="mx-10  w-[400px]  flex  hover:bg-blue-300    text-2xl  justify-center items-center text-white font-bold " > <BsCurrencyExchange/> Transactions</Link>
      <Link to="/loans" className="mx-10 w-[400px]   flex  hover:bg-blue-300    text-2xl  justify-center items-center text-white font-bold ">  <FaMoneyBillTrendUp/> Eazy Way Loans</Link>
      <Link to="/logout" className="mx-10  w-[400px]  flex  hover:bg-blue-300    text-2xl  justify-center items-center text-white font-bold ">  <RiLogoutBoxRFill/> Logout</Link>

    </div>
  )
}

export default Navbar
