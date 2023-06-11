import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: `${import.meta.env.API_KEY}`,
  authDomain: `${import.meta.env.AUTH_DOMAIN}`,
  projectId: "taskmanagementapp-3e75f",
  storageBucket: "taskmanagementapp-3e75f.appspot.com",
  messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.APP_ID}`,
  measurementId: `${import.meta.env.MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);