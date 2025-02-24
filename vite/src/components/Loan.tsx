import React from "react";

const Loan = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6">
      {[
        { title: "Short Term Loan", amount: 40000, period: "1 month" },
        { title: "Mid Term Loan", amount: 100000, period: "5 months" },
        { title: "Long Term Loan", amount: 4000000, period: "12 months" },
      ].map((loan, index) => (
        <div
          key={index}
          className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition-all"
        >
          <h1 className="text-xl font-semibold text-gray-700">{loan.title}</h1>
          <span className="text-3xl font-bold text-blue-600 mt-2">${loan.amount.toLocaleString()}</span>
          <p className="text-gray-500 mt-1">Period: {loan.period}</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
            Get Loan
          </button>
        </div>
      ))}
    </div>
  );
};

export default Loan;
