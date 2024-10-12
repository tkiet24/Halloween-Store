// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDFOsh3J9xihr4hhudM7W5LsXJhVH9KpqA',
//   authDomain: 'pokedex-633a8.firebaseapp.com',
//   projectId: 'pokedex-633a8',
//   storageBucket: 'pokedex-633a8.appspot.com',
//   messagingSenderId: '30278317202',
//   appId: '1:30278317202:web:8249697bf198dd3650e24b',
//   measurementId: 'G-3E3SVTXJTT',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyC-lzDIcpZhOae9TP4H90SxvfEoQ_dDyLY',
  authDomain: 'halloween-store-62c9e.firebaseapp.com',
  projectId: 'halloween-store-62c9e',
  storageBucket: 'halloween-store-62c9e.appspot.com',
  messagingSenderId: '507034276327',
  appId: '1:507034276327:web:6d52ecd3b7f7d911f9ed42',
  measurementId: 'G-8MTPN5G7P0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
