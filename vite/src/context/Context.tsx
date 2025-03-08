import React, { createContext, useState, useEffect, ReactNode } from "react";
import { 
  collection, getDocs, addDoc, query, where, serverTimestamp, Timestamp, updateDoc, doc 
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

type Loan = {
  loanType: string;
  id: string;
  createdAt: Timestamp | null;
};

interface ContextProps {
  amount: number;
  recipientUid: string;
  bills: string;
  billAmount: number;
  setBills: React.Dispatch<React.SetStateAction<string>>;
  setBillAmount: React.Dispatch<React.SetStateAction<number>>;
  setRecipientUid: React.Dispatch<React.SetStateAction<string>>;
  deposits: Deposit[];
  notification: boolean;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLoan: string;
  setSelectedLoan: React.Dispatch<React.SetStateAction<string>>;
  read: boolean;
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
  readMessage: () => void;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message[];
  setMessage: React.Dispatch<React.SetStateAction<Message[]>>; 
  totalBalance: number;
  handleLoanRequest: () => Promise<void>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  fetchDeposits: () => Promise<void>;
  fetchLoans: () => Promise<void>;
  fetchMessages: () => Promise<void>; 
  handleDeposit: () => Promise<void>;
  handleBillPayment: () => Promise<void>;
  userId: string | null;
  loan: Loan[];
  setLoan: React.Dispatch<React.SetStateAction<Loan[]>>;
}

export const AppContext = createContext<ContextProps | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loan, setLoan] = useState<Loan[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [message, setMessage] = useState<Message[]>([]);
  const [notification, setNotification] = useState<boolean>(false);
  const [read, setRead] = useState<boolean>(false);
  const [recipientUid, setRecipientUid] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<string>("");
  const [bills, setBills] = useState<string>("");
  const [billAmount, setBillAmount] = useState<number>(0);

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
      await fetchDeposits();
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
    } catch (err) {
      console.error("Error fetching deposits:", err);
    }
  };

  const fetchMessages = async () => {
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

  const fetchLoans = async () => {
    if (!userId) return;
    try {
      const q = query(collection(db, "loans"), where("id", "==", userId)); 
      const querySnapshot = await getDocs(q);
      const loanList: Loan[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Loan),
        createdAt: doc.data().createdAt || null,
      }));
      setLoan(loanList);
    } catch (err) {
      console.error("Error fetching loans:", err);
    }
  };

  const readMessage = () => {
    setRead(true);
    setNotification(false);
  };

  useEffect(() => {
    if (userId) {
      fetchDeposits();
      fetchMessages();
      fetchLoans(); 
    }
  }, [userId]);

  const handleLoanRequest = async () => {
    if (!selectedLoan) {
      alert("Please select a loan type.");
      return;
    }
    if (!userId) {
      alert("User not authenticated");
      return;
    }
    try {
      await addDoc(collection(db, "loans"), {
        loanType: selectedLoan,
        id: userId, 
        createdAt: serverTimestamp(), 
      });
      alert("Loan request recorded successfully!");
      setShowPopup(false);
      setNotification(true);
      fetchLoans(); 
    } catch (error) {
      console.error("Error adding loan request: ", error);
      alert("Failed to record loan request.");
    }
  };

  const handleBillPayment = async () => {
    if (billAmount <= 0 || !bills) {
      alert("Please enter valid Bill values");
      return;
    }
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      const q = query(collection(db, "money"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      let depositDocId = "";
      let totalBalanceFromDB = 0;

      querySnapshot.forEach((doc) => {
        totalBalanceFromDB += doc.data().amount;
        depositDocId = doc.id;
      });

      if (billAmount > totalBalanceFromDB) {
        alert("Insufficient balance");
        return;
      }

      await addDoc(collection(db, "bills"), {
        bills,
        billAmount,
        userId,
        type: "bill payment",
        createdAt: serverTimestamp(),
      });

      if (depositDocId) {
        await updateDoc(doc(db, "money", depositDocId), {
          amount: totalBalanceFromDB - billAmount,
        });
      }

      setTotalBalance((prev) => prev - billAmount);
      alert("Bill payment successful!");
      fetchDeposits();
    } catch (err) {
      console.error("Error processing bill payment:", err);
      alert("Failed to process bill payment.");
    }
  };

  return <AppContext.Provider value={{ amount, recipientUid, bills, billAmount, setBills, setBillAmount, setRecipientUid, deposits, notification, showPopup, selectedLoan, read, message, totalBalance, userId, loan, setShowPopup, setSelectedLoan, setRead, setMessage, setLoan, setAmount, setNotification, readMessage, handleLoanRequest, fetchDeposits, fetchLoans, fetchMessages, handleDeposit, handleBillPayment }}>{children}</AppContext.Provider>;
};

export default ContextProvider;


