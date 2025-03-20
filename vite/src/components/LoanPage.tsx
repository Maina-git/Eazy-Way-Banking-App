import React from 'react'


const LoanPage:React.FC = () => {
  return (
<div className="w-auto  m-1 rounded-xl  h-[50vh] bg-gradient-to-r from-blue-400 to-blue-700 gap-5 flex items-center justify-center flex-col">
<h1 className="text-white font-bold text-6xl">E Loans</h1>

<p className="text-white text-xs p-5 ">
<b className="text-white font-bold text-2xl">"Eazy Way App Loan Policy"</b>  
Eazy Way App offers **three types of loans**: **Short-Term, Mid-Term, and Long-Term**, 
each with a fixed repayment period. Borrowers are required to **repay
the loan within the specified duration**. **Failure to meet the repayment
deadline may result in penalties, restricted account access, or other
necessary actions**. Ensure timely payments to maintain a good financial standing.
</p>
<span className="text-white text-xs">Seamless Banking Secure Future</span>
</div>
  )
}

export default LoanPage;
