
import { createContext, useState, useEffect, ReactNode } from "react";
import { collection, getDocs, addDoc, query, where, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

type Deposit = {
  name: string;
  amount: number;
  userId: string;
  createdAt: Timestamp | null;
};

interface ContextProps {
  amount: number;
  deposits: Deposit[];
  totalBalance: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  fetchDeposits: () => Promise<void>;
  handleDeposit: () => Promise<void>;
  userId: string | null;
}

export const AppContext = createContext<ContextProps | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const handleDeposit = async () => {
    if (amount <= 0) {
      alert("Please add a valid amount");
      return;
    }
    if (!userId) {
      alert("User not authenticated");
      return;
    }
    try {
      await addDoc(collection(db, "money"), {
        name: auth.currentUser?.displayName || "Anonymous",
        amount,
        userId,
        createdAt: serverTimestamp(),
      });
      setAmount(0);
      fetchDeposits();
    } catch (err) {
      console.error("Error adding deposit", err);
    }
  };

  const fetchDeposits = async () => {
    if (!userId) return;
    try {
      const q = query(collection(db, "money"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const depositList: Deposit[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Deposit),
        createdAt: doc.data().createdAt || null,
      }));

      setDeposits(depositList);
      const total = depositList.reduce((acc, deposit) => acc + Number(deposit.amount), 0);
      setTotalBalance(total);
    } catch (err) {
      console.error("Error fetching deposits", err);
    }
  };

  useEffect(() => {
    if (userId) fetchDeposits();
  }, [userId]);

  const contextValue: ContextProps = {
    amount,
    deposits,
    totalBalance,
    setAmount,
    fetchDeposits,
    handleDeposit,
    userId,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default ContextProvider;












