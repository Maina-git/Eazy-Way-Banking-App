import React from 'react'

const Transactions:React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center">
      
<div className="flex justify-between items-center shadow-md  rounded-[15px] mt-20 py-10 w-[90%]"> 
     <div className="w-[200px]"><p className="text-2xl text-blue-500 ml-10">To Euros</p></div>   
     <div><button className="bg-blue-500 py-2  px-10 text-white text-xs rounded-[10px]">Convert</button></div>
       <div><span className="text-black text-xl mr-10">300000</span></div> </div>
<div className="flex justify-between items-center shadow-md  rounded-[15px] mt-20 py-10 w-[90%]"> 
     <div className="w-[200px]"><p className="text-2xl text-blue-500 ml-10">To  YENS</p></div>   
     <div><button className="bg-blue-500 py-2  px-10 text-white text-xs rounded-[10px]">Convert</button></div>
       <div><span className="text-black text-xl mr-10">300000</span></div> </div>
<div className="flex justify-between items-center shadow-md  rounded-[15px] mt-20 py-10 w-[90%]">
      <div className="w-[200px]"><p className="text-2xl text-blue-500 ml-10">YOUR CURRENCY</p></div>   
      <div><button className="bg-blue-500 py-2  px-10 text-white text-xs rounded-[10px]">Convert</button></div>  
      <div><span className="text-black text-xl mr-10">300000</span></div> </div>

    </div>
  )
}

export default Transactions;