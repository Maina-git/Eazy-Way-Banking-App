import React from 'react'
import Transact from '../../components/Transact';
import Currency from '../../components/Currency';
import TransactionsPage from '../../components/TransactionsPage';

const Transactions:React.FC = () => {
  return (
    <div className="w-auto  flex flex-col gap-5 overflow-y-scroll"
    style={{
      scrollbarWidth:"none"
    }}>
      <TransactionsPage/>
      <Transact/>
      <Currency/>
    </div>
  )
}

export default Transactions;
