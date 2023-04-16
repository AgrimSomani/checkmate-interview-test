import Head from 'next/head'
import GoogleButton from 'react-google-button'
import {getAuth, GoogleAuthProvider,signInWithRedirect, onAuthStateChanged} from "firebase/auth";
import {useRouter} from "next/router";
import { initializeApp } from 'firebase/app';
import { useEffect } from 'react';

// Task 0: Initialize Firebase
// Replace the following with your app's Firebase project configuration
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyAQP0OKYOMcwRyCjMwVEPctgVd8Jx0JSXs",
  authDomain: "aerobic-canto-383511.firebaseapp.com",
  projectId: "aerobic-canto-383511",
  storageBucket: "aerobic-canto-383511.appspot.com",
  messagingSenderId: "544658811547",
  appId: "1:544658811547:web:afde7a79627317dda6343e",
  measurementId: "G-94FLTGDD9L"
};
const app = initializeApp(firebaseConfig);

// GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Firebase Auth instance
const auth = getAuth(app);

export default function Home() {
  //Next.js router
  const router = useRouter();

  // Task 1: Implement Google Sign in with Firebase
  // https://firebase.google.com/docs/auth/web/google-signin
  const signIn = async () => {
    try {
      await signInWithRedirect(auth,provider);
    } catch (error) {
      console.error(error);
    }
  };


  // Use effect here to check if user logged in status is changed or not, and if it is then push the signed in page
  useEffect(() => {
    // Add an event listener for changes to the authentication state
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if (user) {
        // User is signed in, redirect to the signed-in page
        router.push('/signed-in');
      }
    });

    // Make sure to unsubscribe when the component is unmounted
    return unsubscribe;
  }, []);

  return (
    <>
      <Head>
        <title>Sign in to see the public holidays in HK</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <main style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column'}}>
          <h1 className="title">
            Welcome to <a href="https://checkmatehk.io">CheckMate</a>
          </h1>
          <h3>Sign in to see a random programming joke 😳</h3>

          {/* Button for user to sign in with Google */}
          {/* Task 1: Implement Google Sign in with Firebase */}
          <GoogleButton
            label={'Sign in with Google'}
            type="light"
            style={{ width: '50%', display:"flex", justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto, sans-serif', color:'#444' }}
            onClick={signIn}
          />
        </main>
      </div>
      </>
  )
}
