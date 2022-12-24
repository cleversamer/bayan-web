import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHpJx0TPN6BB6BBydZx6M_8EZSGyZKjys",
  authDomain: "byan-a9dfc.firebaseapp.com",
  projectId: "byan-a9dfc",
  storageBucket: "byan-a9dfc.appspot.com",
  messagingSenderId: "973955591226",
  appId: "1:973955591226:web:d449ffdacd3d1a68101903",
  measurementId: "G-JKQ369KLN8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
