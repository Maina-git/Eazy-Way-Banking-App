import React, { useContext } from 'react';
import { AppContext } from '../context/Context';

const Wallet: React.FC = () => {
  const context = useContext(AppContext);

  if (!context){
    return <p className="text-center text-red-500">Error: Context not available</p>;
  }

  const { amount, setAmount, handleDeposit, totalBalance } = context;

  return (
    <div className="w-auto h-[50vh] bg-blue-500 flex justify-between rounded-lg p-5 m-2 shadow-md">
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-white">My Wallet</h1>
        <p className="text-lg font-semibold text-white">My Balance</p>
        <span className="text-3xl bg-white p-2 rounded-lg font-bold text-green-600">
          ${totalBalance.toFixed(2)}
        </span>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-bold text-white">Deposit</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
          placeholder="Enter Amount"
          className="border border-gray-300 rounded px-3 py-2 mt-2 w-full"
        />
        <button
          onClick={handleDeposit}
          className="mt-4 bg-blue-300 text-white py-2 px-5 w-full rounded hover:bg-blue-400">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Wallet;
