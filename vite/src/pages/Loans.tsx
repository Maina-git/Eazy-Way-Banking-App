import React from 'react'

const Loans:React.FC = () => {
  return (
<div className="flex py-5 h-auto flex-col justify-center items-center">
      

<div className="flex shadow-md w-[90%]  justify-between items-center rounded-[10px] mt-10">
    <h1 className="text-3xl text-blue-500 mx-20">Long Term Loans</h1>

<div className=" flex flex-col">
<span className="flex justify-between items-center  m-10"><p className="mx-20 text-1xl">$50000000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
<span className="flex justify-between items-center  m-10" ><p className="mx-20 text-1xl">$40000000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
<span className="flex justify-between items-center  m-10"><p className="mx-20 text-1xl">$30000000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
</div>
</div>


<div className="flex shadow-md w-[90%]  justify-between items-center rounded-[10px] mt-10">
<h1 className="text-3xl text-blue-500 mx-20">Short Term Loans</h1>
<div className=" flex flex-col">
<span className="flex justify-between items-center  m-10"><p className="mx-20 text-1xl">$300000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
<span className="flex justify-between items-center  m-10" ><p className="mx-20 text-1xl">$200000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
<span className="flex justify-between items-center  m-10"><p className="mx-20 text-1xl">$100000</p> <button className="px-5 py-1 bg-blue-500 text-white text-xs">TAKE LOAN</button>  </span>
</div>

</div>
</div>
  )
}


export default Loans;











