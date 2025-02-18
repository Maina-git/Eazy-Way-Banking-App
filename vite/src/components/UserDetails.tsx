import { useContext } from 'react';
import { AppContext } from '../context/Context';

const UserDetails: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p className="text-center text-red-500">Error: Context not available</p>;
  }

  const { deposits, userId } = context;

  return (
    <div
      className="shadow-md w-auto mx-2 py-6 px-4 bg-white rounded-lg h-[50vh] overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <h2 className="text-lg font-bold mb-4 text-gray-800">Your Deposits History</h2>
      {deposits.length > 0 ? (
        deposits.map((deposit, index) => (
          <div key={index} className="border-b py-3">
            <p className="text-gray-700 font-medium">
              {deposit.userId === userId ? "You" : deposit.name}
            </p>
            <p className="text-gray-500">
              Amount: <span className="font-bold text-red-600">${deposit.amount}</span>
            </p>
            <p className="text-gray-400 text-sm">
              {deposit.createdAt
                ? new Date(deposit.createdAt.toDate()).toLocaleString()
                : "Date unavailable"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No deposits available</p>
      )}
    </div>
  );
};

export default UserDetails;

