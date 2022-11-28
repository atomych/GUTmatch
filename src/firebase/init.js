import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD1Qy2Ee_FDb2Km17BGJGzwkuAxmPNz9Ok",
  authDomain: "gut-search.firebaseapp.com",
  databaseURL: "https://gut-search-default-rtdb.firebaseio.com",
  projectId: "gut-search",
  storageBucket: "gut-search.appspot.com",
  messagingSenderId: "137653811575",
  appId: "1:137653811575:web:883550f1779f9dd8eac972",
};

const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
