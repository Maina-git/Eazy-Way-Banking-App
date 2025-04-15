import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/Context";

const Loan: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return <div>Loading...</div>;

  const {
    showPopup,
    setShowPopup,
    selectedLoan,
    setSelectedLoan,
    handleLoanRequest,
  } = context;

  const loanOptions = [
    { title: "Short Term Loan", amount: 40000, period: "1 month" },
    { title: "Mid Term Loan", amount: 100000, period: "5 months" },
    { title: "Long Term Loan", amount: 4000000, period: "12 months" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 relative">
      {loanOptions.map((loan, index) => (
        <div
          key={index}
          className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-all">
          <h1 className="text-xl font-semibold text-gray-700">{loan.title}</h1>
          <span className="text-3xl font-bold text-blue-600 mt-2">
            ${loan.amount.toLocaleString()}
          </span>
          <p className="text-gray-500 mt-1">Period: {loan.period}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
            onClick={() => setShowPopup(true)}>
            Get Loan
          </button>
        </div>
      ))}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Select Loan Option
            </h2>
            {["Long Term Loan", "Short Term Loan", "Mid Term Loan"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-blue-500 cursor-pointer mb-2">
                <input
                  type="radio"
                  value={cat}
                  checked={selectedLoan === cat}
                  onChange={(e) => setSelectedLoan(e.target.value)}/>
                {cat}
              </label>
            ))}

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleLoanRequest}>
                Get Loan
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loan;


