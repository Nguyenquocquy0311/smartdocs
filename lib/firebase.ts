import { type FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD0EXcAcHgroMOf698Bv2yOCAiygOJtMlE",
  authDomain: "smartdocs-ca869.firebaseapp.com",
  projectId: "smartdocs-ca869",
  storageBucket: "smartdocs-ca869.appspot.com",
  messagingSenderId: "890916295303",
  appId: "1:890916295303:web:2514a98bb9c49205389e22",
  measurementId: "G-9QPJMY7QX6"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const authentication = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
