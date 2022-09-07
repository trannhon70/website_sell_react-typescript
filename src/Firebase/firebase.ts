import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3fsgbSvH0hIFZTM8sKZGnca8-gZeyPF4",
  authDomain: "websitesell-602f5.firebaseapp.com",
  databaseURL: "https://websitesell-602f5-default-rtdb.firebaseio.com",
  projectId: "websitesell-602f5",
  storageBucket: "websitesell-602f5.appspot.com",
  messagingSenderId: "1092468165265",
  appId: "1:1092468165265:web:14062b86e96802b52acd30",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storege = getStorage(app);
export { app, firestore, storege };
