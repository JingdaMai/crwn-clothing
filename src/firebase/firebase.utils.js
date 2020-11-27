import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDBfCfsCvUxXmChgV_4G99VeW7J73fFMiY",
  authDomain: "crwn-db-f917c.firebaseapp.com",
  databaseURL: "https://crwn-db-f917c.firebaseio.com",
  projectId: "crwn-db-f917c",
  storageBucket: "crwn-db-f917c.appspot.com",
  messagingSenderId: "394723587774",
  appId: "1:394723587774:web:b720afbe891b6b3e9450ef"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firebase.database().ref(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date().getTime();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;