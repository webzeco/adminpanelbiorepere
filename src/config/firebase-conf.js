// adding your firebase config here

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ0ZF7rsV8Y8oAQ5XV9jZF1bTWWyz7YwQ',
  authDomain: 'bioreper.firebaseapp.com',
  projectId: 'bioreper',
  storageBucket: 'bioreper.appspot.com',
  messagingSenderId: '731566640854',
  appId: '1:731566640854:web:0f4680a3e63b493b818377',
  measurementId: 'G-6XQF3Y59RT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export default app;
