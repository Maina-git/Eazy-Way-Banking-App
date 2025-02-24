import React from 'react'

interface BankfeedProps{
    bankItem:JSX.Element | null
}

const BankFeed:React.FC<BankfeedProps>= ({bankItem}) => {
  return (
    <div 
    style={{scrollbarWidth:"none"}}
    className="w-3/4 h-screen bg-gray-200 overflow-hidden overflow-y-scroll">
      {bankItem}
    </div>
  )
}

export default BankFeed;
