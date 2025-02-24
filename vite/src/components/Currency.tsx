import React, { useState } from "react";

const Currency: React.FC = () => {
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="w-full m-2 bg-blue-500 p-5 rounded-lg shadow-md mt-6">
      <h1 className="text-xl font-bold text-white text-center">Change Currency</h1>

      <div className="flex flex-col gap-4 mt-4">
        <label className="text-white font-semibold">Select Currency:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="KES">Kenyan Shilling (KES)</option>
        </select>
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Convert
        </button>
      </div>
    </div>
  );
};

export default Currency;

