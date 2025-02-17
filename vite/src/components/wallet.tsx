import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/Firebase';

interface Deposit {
  name: string;
  amount: number;
  userId: string;
}

const Wallet: React.FC = () => {
  const userId = auth.currentUser?.uid;

  const [amount, setAmount] = useState<number>(0);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const handleDeposit = async () => {
    if (amount <= 0) {
      alert('Please add a valid amount');
      return;
    }
    if (!userId) {
      alert('User not authenticated');
      return;
    }

    try {
      await addDoc(collection(db, 'money'), {
        name: auth.currentUser?.displayName || 'Anonymous',
        amount,
        userId,
        createdAt: serverTimestamp(),
      });

      setAmount(0);
      fetchDeposits();
    } catch (err) {
      console.error('Error adding deposit:', err);
    }
  };

  const fetchDeposits = async () => {
    if (!userId) return;

    try {
      const q = query(collection(db, 'money'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const depositList: Deposit[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Deposit),
      }));

      setDeposits(depositList);

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
    <div className="w-auto h-[50vh] bg-blue-500 flex justify-between rounded-lg p-5 m-2 shadow-md">
     
      <div className="mt-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-white">My Wallet</h1>
        <p className="text-lg font-semibold text-white">My Balance</p>
        <span className="text-3xl bg-white p-2 rounded-lg font-bold text-green-600">${totalBalance}</span>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-bold text-white">Deposit</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
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
