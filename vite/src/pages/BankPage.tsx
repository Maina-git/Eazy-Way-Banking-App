import React, { useState } from 'react'
import { collection, getDoc, serverTimestamp } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'
import  { auth } from "../config/Firebase";
import { db } from '../config/Firebase';
import { useEffect } from "react";
import { doc } from 'firebase/firestore';


interface Deposit{
  name:string,
  amount:number,
  userId:string
}


const BankPage: React.FC = () => {

const userId=auth.currentUser.uid


const [name, setName]=useState("");
const  [amount, setAmount]=useState<number>(0);
const [user, setUser]=useState<string | null>(null)


const handelDeposit = async()=>{

if(name === "" || amount<=0){

  alert("Please add the  details");
  return;
}
try{
  await addDoc(collection(db, "money"),{
    name,
    amount,
    userId,
    createdAt:serverTimestamp()
  });
  setName('');
  setAmount(0);
  fetchDeposists();
}catch(err){
  console.log(err);
}
}

const fetchDeposists = async()=>{

  try{
    const userDocRef = doc(db, "money", userId );
    const userSnapshot = await getDoc(userDocRef);

    if(userSnapshot.exists()){
      const userData = userSnapshot.data() as Deposit;
      setUser(userData);
    }else{
      console.log("user not  found");
    }
  }catch(err){
    console.log(err);
  }


}
useEffect(()=>{
fetchDeposists();
},[]);


return (
<div className="w-full h-screen flex  justify-center ">
        
<div className="flex flex-col items-center w-1/2 mt-10">

<h1 className="text-xl font-bold text-blue-500">My Wallet Balance</h1>
<span className=" p-3  text-5xl text-black font-bold  mt-10">$200000</span>

<input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-[50vh] bordder border-blue-500 mt-10 py-3 px-10 rounded-[10px]" placeholder='Enter Your Name'/>
<input  type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-[50vh] bordder border-blue-500 mt-10 py-3 px-10 rounded-[10px]" placeholder='Enter Amount' />

<button onClick={handelDeposit} className="bg-blue-500 outline-none text-white mt-10 px-20 py-3">Deposit</button>

<div className="shadow-md w-1/2 mt-10 py-10 flex-flex-col">
{
  
user ? (
  <>
  <h2>User Details</h2>
  <p>{user.name}</p>
  <p>{user.amount}</p>
  </>
):(
  <p>No user available</p>
)
}

</div>


</div>


<div className="w-1/2  mt-10 mr-10">
  <div className="shadow-md w-[100%] py-20 flex flex-col mt-10  justify-center items-center">
    <p className="text-blue-500 font-bold text-xl">Loans</p>
    <span className="bg-blue-500 py-2 px-10 rounded text-500 text-white">Status is null</span>
  </div>

  <div className="shadow-md w-[100%] py-20 flex flex-col mt-10  justify-center items-center">
    <p className="text-blue-500 font-bold text-xl">Transactions</p>
    <span className="bg-blue-500 py-2 px-10 rounded text-500 text-white">No Transactions Made</span>
  </div>
</div>






</div>
  )
}
export default BankPage
  
