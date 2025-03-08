import React from "react";
import { AppContext } from "../context/Context";
import { useContext } from "react";




const Transact: React.FC = () => {

const context=useContext(AppContext);

const {totalBalance, handleBillPayment, setBills, setBillAmount}=context;

  return (
    <div className="flex flex-col items-center w-auto bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg m-1 p-5 shadow-lg">
      <h1 className="text-2xl font-bold text-white text-center mb-4">Peer-to-Peer Transfer</h1>
      <section className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <p className="text-lg font-semibold text-gray-700">Wallet Balance</p>
          <span className="text-3xl font-bold text-green-600">${totalBalance.toFixed(2)}</span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end mt-4 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-700">Pay Your Bills</h2>
          <input
            type="text"
            placeholder="Enter Bill Name"
            onChange={(e)=>setBills(e.target.value)}
            className="mt-2 p-2 w-full md:w-3/4 border border-gray-300 rounded-md"/>
 
           <input 
           type="number" 
           placeholder="Enter Bill Amount"
          onChange={(e)=>setBillAmount(e.target.value)}
           className="mt-2 p-2 w-full md:w-3/4 border border-gray-300 rounded-md"/>
          <button onClick={handleBillPayment} className="mt-3 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition">
            PAY
          </button>
        </div>
      </section>
      <div className="w-full m-2 bg-white rounded padding-auto   py-5 px-4">
  <button className="py-5 px-3 bg-green-500 rounded-lg text-white">Generate Bills Payment Card</button>
      </div>
    </div>
  );
};


export default Transact;










