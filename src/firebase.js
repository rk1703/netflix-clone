import { initializeApp } from 'firebase/app';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from "firebase/firestore";
// import {initializeAuth,getReactNativePersistence} from "firebase/auth/react-native";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAAVR8i8moRqkiYuT7QI7VujgzfO3_r07o",
  authDomain: "netflix-clone-c4077.firebaseapp.com",
  projectId: "netflix-clone-c4077",
  storageBucket: "netflix-clone-c4077.appspot.com",
  messagingSenderId: "579092715869",
  appId: "1:579092715869:web:a6ec1c9a1bf383c23a30b4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

// const auth = initializeAuth(app,{
//   persistence: getReactNativePersistence(AsyncStorage)
// });

export {auth ,db};
