
import React, { useContext } from "react";
import { AppContext } from "../context/Context";

const Transact: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Loading...</p>;
  }

  const {
    totalBalance,
    bills,
    handleBillPayment,
    setBills,
    setBillAmount,
    toBills,
    directToBills,
  } = context;

  return (
    <div className="flex flex-col items-center w-auto bg-gradient-to-r from-blue-200 to-blue-500 rounded-lg m-1 p-5 shadow-lg">
      <h1 className="text-2xl font-bold text-white text-center mb-4">Bills Payment</h1>
      <section className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <p className="text-lg font-semibold text-gray-700">Wallet Balance</p>
          <span className="text-3xl font-bold text-green-600">
            ${totalBalance ? totalBalance.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end mt-4 md:mt-0">
          <h2 className="text-lg font-semibold text-gray-700">Pay Your Bills</h2>
          <input
            type="text"
            placeholder="Enter Bill Name"
            onChange={(e) => setBills(e.target.value)}
            className="mt-2 p-2 w-full md:w-3/4 border border-gray-300 rounded-md"/>
          <input
            type="number"
            placeholder="Enter Bill Amount"
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="mt-2 p-2 w-full md:w-3/4 border border-gray-300 rounded-md"/>

          <button
            onClick={handleBillPayment}
            className="mt-3 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition">
            PAY
          </button>
        </div>
      </section>
      <div className="w-full m-2 bg-white rounded py-5 px-4">
        <button
          className="py-3 px-5 bg-green-500 rounded-lg text-white font-semibold"
          onClick={directToBills}
        >
          Generate Bills Payment Card
        </button>

        {toBills && (
          <div className="w-full h-auto bg-white rounded-lg flex flex-col items-center justify-center absolute top-20 left-0 right-0 p-5 shadow-lg">
            <p className="text-gray-700 font-bold text-3xl">My Bills</p>
            <div className="h-auto p-5 rounded-lg bg-gray-200 w-full m-3">
              {Array.isArray(bills) && bills.length > 0 ? (
                bills.map((bill: any, index: number) => (
                  <div className="justify-between items-center p-5 bg-white shadow-md rounded-lg w-full" key={index}>
                    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 w-full">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white text-lg font-bold rounded-full">
                          {bill.bills.charAt(0)}
                        </span>
                        <p className="text-gray-700 font-medium">{bill.bills}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-blue-600 text-lg font-semibold">${bill.billAmount.toFixed(2)}</p>
                        <span className="text-gray-500 text-sm">{bill.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Bills yet</p>
              )}
            </div>
            <div className="w-full flex justify-between">
              <button
                className="bg-red-500 px-5 py-2 rounded-lg text-white font-bold text-xs"
                onClick={directToBills}>
                Cancel
              </button>
              <button className="bg-green-500 px-5 py-2 rounded-lg text-white font-bold text-xs">
                Confirm Bills
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transact;

















