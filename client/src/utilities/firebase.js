import * as firebase from 'firebase/app';
import 'firebase/auth';

const fireBaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyA7VRdPMuwC_AZWlqClNeTLV0I1ej5TzqM",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "react-job-post.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://react-job-post.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "react-job-post",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "react-job-post.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "803659325216"
};

export default firebase.initializeApp(fireBaseConfig);
