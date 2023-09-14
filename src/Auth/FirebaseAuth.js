import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword as signInWithEmailAndPasswordFunction, signOut } from 'firebase/auth'; // Rename signInWithEmailAndPassword to signInWithEmailAndPasswordFunction

import { app } from './Firebaseconfig'; 

const auth = getAuth(app);

// Register a new user with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error; // Handle registration error in the calling component
  }
};

// Sign in an existing user with email and password
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPasswordFunction(auth, email, password); // Use renamed function
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error; // Handle sign-in error in the calling component
  }
};

// Sign out the user
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error; // Handle sign-out error in the calling component
  }
};
