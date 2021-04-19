import "../styles/globals.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD682TiM3lkMAtCJgfv-NVA5j-KyRYLnUI",
  authDomain: "vaccinepassport-dev.firebaseapp.com",
  projectId: "vaccinepassport-dev",
  storageBucket: "vaccinepassport-dev.appspot.com",
  messagingSenderId: "300460643704",
  appId: "1:300460643704:web:078a83447ebbe7afb7648d",
};

firebase.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
