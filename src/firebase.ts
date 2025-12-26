import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Analytics is optional in Vite
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTZpckDv02l4mrfGDnFwRxdAT-L2AxpE4",
  authDomain: "bharatcalc-a0edf.firebaseapp.com",
  projectId: "bharatcalc-a0edf",
  storageBucket: "bharatcalc-a0edf.firebasestorage.app",
  messagingSenderId: "743601277790",
  appId: "1:743601277790:web:efe748b98df224ee43ddcf",
  measurementId: "G-Y6LE4604PG",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Prevent analytics crash in local/dev
isSupported().then((yes) => {
  if (yes) getAnalytics(app);
});
