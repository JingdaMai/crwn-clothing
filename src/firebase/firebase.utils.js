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

firebase.initializeApp(config);

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

export const addCollectionAndItems = (collectionKey, objectsToAdd) => {
  const collectionRef = firebase.database().ref(collectionKey);

  objectsToAdd.forEach(obj => {
    const { title, items } = obj;
    collectionRef.push({items, title});
  });
}

export const convertCollectionsToMap = (collections) => {
  const transformCollections = {};
  for (const [key, value] of Object.entries(collections)) {
    transformCollections[value.title.toLowerCase()] = {
      ...value,
      routeName: encodeURI(value.title.toLowerCase()),
      id: key
    };
  }
  return transformCollections;
};

export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;