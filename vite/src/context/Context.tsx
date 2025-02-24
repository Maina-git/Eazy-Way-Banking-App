import { createContext, useState, useEffect, ReactNode } from "react";
import { 
  collection, getDocs, addDoc, query, where, serverTimestamp, Timestamp, 
} from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";

type Deposit = {
  name: string;
  amount: number;
  userId: string;
  createdAt: Timestamp | null;
};

type Message = {
  name: string;
  createdAt: Timestamp | null;
  userId: string;
};

interface ContextProps {
  amount: number;
  recipientUid: string;
  setRecipientUid: React.Dispatch<React.SetStateAction<string>>;
  deposits: Deposit[];
  notification: boolean;
  read: boolean;
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
  readMessage: () => void;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message[];
  totalBalance: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  fetchDeposits: () => Promise<void>;
  handleDeposit: () => Promise<void>;
  userId: string | null;
}

export const AppContext = createContext<ContextProps | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [message, setMessage] = useState<Message[]>([]);
  const [notification, setNotification] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [recipientUid, setRecipientUid] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

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
      setNotification(true);
      setAmount(0);
      fetchDeposits();
    } catch (err) {
      console.error("Error adding deposit:", err);
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
      setBalance(total); 
    } catch (err) {
      console.error("Error fetching deposits:", err);
    }
  };

  const fetchMessage = async () => {
    if (!userId) return;
    try {
      const q = query(collection(db, "users"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const messageList: Message[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Message), 
        createdAt: doc.data().createdAt || null,
      }));

      setMessage(messageList);
      setNotification(true);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const readMessage = () => {
    setRead(true);
    setNotification(false);
  };

  useEffect(() => {
    if (userId) {
      fetchDeposits();
      fetchMessage();
    }
  }, [userId]);




  const contextValue: ContextProps = {
    amount,
    recipientUid,
    setRecipientUid,
    deposits,
    read,
    setRead,
    readMessage,
    totalBalance,
    setAmount,
    fetchDeposits,
    handleDeposit,
    userId,
    message,
    notification,
    setNotification,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default ContextProvider;







