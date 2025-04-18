import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";


type Deposit = {
  name: string;
  amount: number;
  userId: string;
  createdAt: any;
};

type Message = {
  name: string;
  createdAt: any;
  userId: string;
};

type Loan = {
  name: string;
  loanType: string;
  id: string;
  createdAt: any;
};

type Bill = {
  billAmount: number;
  bills: string;
  createdAt: any;
  type?: string;
  userId: string;
  id?: string;
};

interface ContextProps {
  amount: number;
  recipientUid: string;
  bills: Bill[];
  billAmount: number;
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
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
  toBills: boolean;
  setToBills: React.Dispatch<React.SetStateAction<boolean>>;
  directToBills: () => void;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  message: Message[];
  setMessage: React.Dispatch<React.SetStateAction<Message[]>>;
  totalBalance: number;
  handleLoanRequest: () => Promise<void>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  fetchDeposits: () => Promise<void>;
  fetchLoans: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  fetchBills: () => Promise<void>;
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
  const [bills, setBills] = useState<Bill[]>([]);
  const [billAmount, setBillAmount] = useState<number>(0);
  const [toBills, setToBills] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const directToBills = (): void => {
    setToBills((prev) => !prev);
  };

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

  const handleLoanRequest = async () => {
    if (!userId) return;
    try {
      await addDoc(collection(db, "loans"), {
        name: auth.currentUser?.displayName || "Anonymous",
        loanType: selectedLoan,
        createdAt: serverTimestamp(),
        userId,
      });
      setShowPopup(false);
      setSelectedLoan("");
      await fetchLoans();
    } catch (err) {
      console.error("Error requesting loan:", err);
    }
  };

  const handleBillPayment = async () => {
    if (!userId) {
      alert("User not authenticated");
      return;
    }
    if (!bills || bills.length === 0) {
      alert("No bills to pay");
      return;
    }
    try {
      for (const bill of bills) {
        await addDoc(collection(db, "bills"), {
          bills: bill.bills,
          billAmount: bill.billAmount,
          userId,
          type: bill.type || "Manual",
          createdAt: serverTimestamp(),
        });
      }
      setNotification(true);
      setBillAmount(0);
      setBills([]);
      await fetchBills();
    } catch (err) {
      console.error("Error adding bill:", err);
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

  const fetchLoans = async () => {
    if (!userId) return;
    try {
      const q = query(collection(db, "loans"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const loanList: Loan[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Loan),
        id: doc.id,
        createdAt: doc.data().createdAt || null,
      }));
      setLoan(loanList);
    } catch (err) {
      console.error("Error fetching loans:", err);
    }
  };

  const fetchBills = async () => {
    if (!userId) return;
    try {
      const q = query(collection(db, "bills"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const billsList: Bill[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Bill),
        id: doc.id,
        createdAt: doc.data().createdAt || null,
      }));
      setBills(billsList);
      setTotalBalance((prev) => prev - billsList.reduce((acc, bill) => acc + Number(bill.billAmount), 0));
    } catch (err) {
      console.error("Error fetching bills:", err);
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

  const readMessage = () => {
    setRead(true);
  };

  useEffect(() => {
    if (userId) {
      fetchDeposits();
      fetchMessages();
      fetchBills();
      fetchLoans();
    }
  }, [userId]);

  return (
    <AppContext.Provider
      value={{
        amount,
        recipientUid,
        bills,
        billAmount,
        setBills,
        setBillAmount,
        setRecipientUid,
        deposits,
        notification,
        showPopup,
        setShowPopup,
        selectedLoan,
        setSelectedLoan,
        read,
        setRead,
        readMessage,
        toBills,
        setToBills,
        directToBills,
        setNotification,
        message,
        setMessage,
        totalBalance,
        handleLoanRequest,
        setAmount,
        fetchDeposits,
        fetchLoans,
        fetchMessages,
        fetchBills,
        handleDeposit,
        handleBillPayment,
        userId,
        loan,
        setLoan,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;















