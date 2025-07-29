// using the 'todo-ninja-a4397' for all firestore storage
// this includes original todo-ninja and infotable
// 05/10/24 

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAuq85peG4qpPHr20N6MPrHQ2xG_MF8Hxk",
  authDomain: "todo-ninja-a4397.firebaseapp.com",
  projectId: "todo-ninja-a4397",
  storageBucket: "todo-ninja-a4397.appspot.com",
  messagingSenderId: "96621211587",
  appId: "1:96621211587:web:e807fd6ed4cea127581776"
};

// const firebaseConfig2 = {
//   apiKey: "AIzaSyBR1DWfsLhPI3lMrtRWi2YL-GnHG303NnE",
//   authDomain: "falkmansweb.firebaseapp.com",
//   projectId: "falkmansweb",
//   storageBucket: "falkmansweb.appspot.com",
//   messagingSenderId: "593867354054",
//   appId: "1:593867354054:web:ec4be455d670437d480cc7",
//   measurementId: "G-76Y1306ZK7"
// };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// const auth = firebase.auth();

//const firebaseApp2 = firebase.initializeApp(firebaseConfig2);
// const db2 = firebaseApp2.firestore();

// console.log(auth)

export default ( db)