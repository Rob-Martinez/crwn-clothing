import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDnz_01oDJeS1oFeG1d9f_jBbW_ZQI5EFI",
    authDomain: "crwn-clothing-db-4bfc8.firebaseapp.com",
    projectId: "crwn-clothing-db-4bfc8",
    storageBucket: "crwn-clothing-db-4bfc8.appspot.com",
    messagingSenderId: "385054596900",
    appId: "1:385054596900:web:b612fd80a0198b3e495db1"
  };

 
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid );

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;

  }