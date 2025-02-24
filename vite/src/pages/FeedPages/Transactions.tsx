import React from 'react'
import Transact from '../../components/Transact';
import Currency from '../../components/Currency';

const Transactions:React.FC = () => {
  return (
    <div className="w-[75vw]  flex flex-col gap-5 overflow-y-scroll"
    style={{
      scrollbarWidth:"none"
    }}>
      <Transact/>
      <Currency/>
    </div>
  )
}

export default Transactions;
