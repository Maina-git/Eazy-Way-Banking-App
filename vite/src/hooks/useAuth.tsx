import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/Firebase";



export const useAuth = () => {


const [user, setUser]= useState<User | null>(null)


useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    });
    return ()=>unsubscribe();

},[]);

  return { user }
}

export default useAuth;




