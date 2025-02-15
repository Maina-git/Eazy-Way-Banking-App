import React from 'react'

interface BankfeedProps{
    bankItem:JSX.Element | null
}

const BankFeed:React.FC<BankfeedProps>= ({bankItem}) => {
  return (
    <div className="w-3/4 h-screen bg-gray-200">
      {bankItem}
    </div>
  )
}

export default BankFeed;
