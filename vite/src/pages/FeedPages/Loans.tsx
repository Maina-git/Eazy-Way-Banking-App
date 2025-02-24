import React from 'react'
import LoanPage from '../../components/LoanPage';
import Loan from '../../components/Loan';


const Loans:React.FC = () => {
  return (
<div className="overflow-hidden overflow-y-scroll" style={{scrollbarWidth:"none"}}>
<LoanPage/>
<h1 className="text-xl text-green-500 font-bold text-center my-2">Select a Loan</h1>
<Loan/>
</div>
  )
}


export default Loans;











