import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


 const firebaseConfig = {
  apiKey: "AIzaSyCoDgnt2YpmrCZpOpnc5l-f0OYAb7E9YQ4",
  authDomain: "task-management-app-809db.firebaseapp.com",
  projectId: "task-management-app-809db",
  storageBucket: "task-management-app-809db.appspot.com",
  messagingSenderId: "407413806481",
  appId: "1:407413806481:web:0bab956462ba8bcb74f630"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

