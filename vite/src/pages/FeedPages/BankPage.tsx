import React from 'react';
import Wallet from '../../components/wallet';
import UserDetails from '../../components/UserDetails';
import Myapp from '../../components/Myapp';


const BankPage:React.FC = () => {
  return (
    <div className="w-auto h-auto flex flex-col gap-5 overflow-y-scroll"
    style={{
      scrollbarWidth:"none"
    }}>
      <Myapp/>
      <Wallet/>
      <UserDetails/>
    </div>
  )
}

export default BankPage;

