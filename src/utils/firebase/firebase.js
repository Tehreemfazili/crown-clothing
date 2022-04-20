//this is just for the use of firebase, we are not returining any jsx thats why we dont jsx extension
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj5FZ7lSglGbpcDwBscJvRZWcj1LFY4TA",
  authDomain: "crwn-clothing-db-d3de8.firebaseapp.com",
  projectId: "crwn-clothing-db-d3de8",
  storageBucket: "crwn-clothing-db-d3de8.appspot.com",
  messagingSenderId: "166948518881",
  appId: "1:166948518881:web:457f95e8a8da6a5e8d70a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userdocRef = doc(db, "user", userAuth.uid);
  const userSnapShot = await getDoc(userdocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // for creating users
    try {
      await setDoc(userdocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(" error creating the user", error.message);
    }
  }
  return userdocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
