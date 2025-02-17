import React from 'react';
import Wallet from '../components/wallet';
import UserDetails from '../components/UserDetails';


const BankPage:React.FC = () => {
  return (
    <div className="w-auto h-screen flex flex-col gap-5 overflow-y-scroll"
    style={{
      scrollbarWidth:"none"
    }}>
      <Wallet/>
      <UserDetails/>
    </div>
  )
}

export default BankPage;

