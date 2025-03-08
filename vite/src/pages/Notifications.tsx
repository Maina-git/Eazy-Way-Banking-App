
import React, { useContext } from 'react';
import { AppContext } from '../context/Context';

interface PropTypes {
  toNotifications: () => void;
}

const Notifications: React.FC<PropTypes> = ({ toNotifications }) => {
  const { message, readMessage, read, deposits, loan } = useContext(AppContext);

  return (
    <div
      className="w-auto h-auto m-2 bg-gray-100 rounded-lg overflow-y-scroll p-5 shadow-lg"
      style={{ scrollbarWidth: 'none' }}>
      <button
        onClick={toNotifications}
        className="bg-blue-500 px-5 py-2 text-white rounded-lg absolute top-5 left-5">
        Back
      </button>
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">
        Notifications
      </h2>
      {message && message.length > 0 ? (
        message.map((msg, index) => (
          <div key={index} className="p-3 bg-white shadow-md rounded-lg my-2">
            <p className="text-lg font-semibold text-blue-500">
              Welcome, {msg.name}!
              <br />
              <span className="text-xs">
                Welcome to Eazy Way App, your trusted partner in seamless and secure banking! 
                Manage your finances with ease, track your deposits, and experience a smarter way
                to bank. Your journey to financial freedom starts here!
              </span>
            </p>
            <span className="text-gray-600 text-sm">
              Your App ID is: <strong>{msg.userId}</strong>
            </span>
            <div className="flex flex-row justify-between">
              <span className="text-xs text-gray-300 m-3">&copy;E2025</span>
              <button
                onClick={readMessage}
                className={
                  !read
                    ? 'bg-blue-500 px-3 rounded-lg py-1 text-xs text-white'
                    : 'bg-gray-200 px-3 py-1 rounded-lg text-xs text-gray-400'
                }>
                {!read ? 'Mark as read' : 'Read'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No new notifications.</p>
      )}

    
      {deposits && deposits.length > 0 ? (
        deposits.map((deposit, index) => (
          <div key={index} className="p-3 bg-white shadow-md rounded-lg my-2">
            <span className="text-lg font-semibold text-blue-500">Hey User!</span>
            <p className="text-xs text-blue-500 font-bold">
              Congratulations! Your <span className="text-black font-bold">{deposit.amount}</span> deposit has been successfully added to your account. 
              Your funds are now available, and you can continue managing your finances with ease. Thank you for banking with us.
            </p>
            <div className="flex mt-3 justify-between">
              <span className="text-gray-300 text-xs">&copy;E2025</span>
              <button
                onClick={readMessage}
                className={
                  !read
                    ? 'bg-blue-500 px-3 rounded-lg py-2 text-xs text-white'
                    : 'bg-gray-200 px-3 py-1 rounded-lg text-xs text-gray-400'
                }>
                {!read ? 'Mark as read' : 'Read'}
              </button>
            </div>
          </div>
        ))
      ) : null}

      
      {loan && loan.length > 0 ? (
        loan.map((loan, index) => (
          <div key={index} className="p-3 bg-white shadow-md rounded-lg my-2">
            <span className="text-lg font-semibold text-blue-500">Hey User!</span>
            <p className="text-xs text-gray-700">
              Thank you for choosing Eazy Way App for your financial needs! We appreciate your trust in our services.
              <br />
              We are pleased to inform you that your <span className="text-blue-500 font-bold">{loan.loanType}</span> loan has been successfully disbursed. 
              As part of our agreement, kindly ensure that you repay the loan within the stipulated period to maintain a good credit record and 
              continue enjoying our seamless financial solutions.
            </p>
            <div className="flex mt-3 justify-between">
              <span className="text-gray-300 text-xs">&copy;E2025</span>
              <button
                onClick={readMessage}
                className={
                  !read
                    ? 'bg-blue-500 px-3 rounded-lg py-2 text-xs text-white'
                    : 'bg-gray-200 px-3 py-1 rounded-lg text-xs text-gray-400'}>
                { !read ? 'Mark as read' : 'Read'}
              </button>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default Notifications;








