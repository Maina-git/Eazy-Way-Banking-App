import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';
import { Timestamp } from 'firebase/firestore';

interface Deposit {
  name: string;
  amount: number;
  userId: string;
  createdAt?: Timestamp;
}

const UserDetails: React.FC = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  
  const userId = auth.currentUser?.uid;

  const fetchDeposits = async () => {
    if (!userId) {
      console.warn("User is not authenticated.");
      return;
    }

    try {
      const q = query(collection(db, 'money'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const depositList: Deposit[] = querySnapshot.docs.map(doc => ({
        ...(doc.data() as Deposit),
      }));

      setDeposits(depositList);

      // Ensure numeric summation
      const total = depositList.reduce((acc, deposit) => acc + Number(deposit.amount), 0);
      setTotalBalance(total);
    } catch (err) {
      console.error('Error fetching deposits:', err);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [userId]);

  return (
    <div className="shadow-md w-auto mx-2 py-6 px-4 bg-white rounded-lg h-[50vh] overflow-y-scroll"
    style={{scrollbarWidth:"none"}}>
      <h2 className="text-lg font-bold mb-4 text-gray-800">Your Deposits History</h2>
      {deposits.length > 0 ? (
        deposits.map((deposit, index) => (
          <div key={index} className="border-b py-3">
            <p className="text-gray-700 font-medium">
              {deposit.userId === userId ? 'You' : deposit.name}
            </p>
            <p className="text-gray-500">
              Amount: <span className="font-bold text-red-600">${deposit.amount}</span>
            </p>
            <p className="text-gray-400 text-sm">
              {deposit.createdAt ? new Date(deposit.createdAt.toDate()).toLocaleString() : 'Date unavailable'}
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
