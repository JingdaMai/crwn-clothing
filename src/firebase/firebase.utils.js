import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAQo5DJ28Ny2TvJlbV6IofJLbPSNwvQ584",
  authDomain: "crwn-db-13aa6.firebaseapp.com",
  databaseURL: "https://crwn-db-13aa6.firebaseio.com",
  projectId: "crwn-db-13aa6",
  storageBucket: "crwn-db-13aa6.appspot.com",
  messagingSenderId: "4398714655",
  appId: "1:4398714655:web:ccb89bc8fe4d434c9b2a2a"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;