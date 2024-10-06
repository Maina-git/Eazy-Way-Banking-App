import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwfAT495y9vSgY6Kc0lEVZyuYkD8udwHI",
  authDomain: "banksystem-87f12.firebaseapp.com",
  projectId: "banksystem-87f12",
  storageBucket: "banksystem-87f12.appspot.com",
  messagingSenderId: "547451989893",
  appId: "1:547451989893:web:db56bdcfaa2cd2d114deec",
  measurementId: "G-722YWMDG1W"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app);
export const signWithGooglePopup =async () =>{

    try{
const result = await signInWithPopup(auth, provider);

return result;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const signOutUser = async() =>{
    try{
     await signOut(auth);
    }catch(error){
        console.error(error);
    }
};




//const analytics = getAnalytics(app);