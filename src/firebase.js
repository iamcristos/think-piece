import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDXmvq0TGeDYCYbKQyInn0JIo_FXkQtFu4",
    authDomain: "think-piece-7198c.firebaseapp.com",
    databaseURL: "https://think-piece-7198c.firebaseio.com",
    projectId: "think-piece-7198c",
    storageBucket: "think-piece-7198c.appspot.com",
    messagingSenderId: "523846176322",
    appId: "1:523846176322:web:14a696c493dcabbedea7db",
    measurementId: "G-JM7F0P3LVZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

window.firebase = firebase;

export const createUserDocument = async (user, additionalInfo) =>{
  if(!user) return;
  
  const userRef = firestore.doc(`users/${user.uid}`);

  // fetching user from the location

  const userSnapShot = await userRef.get();

  if(!userSnapShot.exists) {
    const createdAt = new Date()
    const {email, displayName, photoURL} = user;

    try {
      await userRef.set({
        email,
        displayName,
        photoURL,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.error("eroor updating the user", error.message)
    }
  }
  // return userSnapShot.data()
  return getUserDocument(user.uid)
}

export const getUserDocument = async(uid) =>{
  if(!uid) return;
  try {
    return firestore.collection('users').doc(uid)
  } catch (error) {
    console.log('error fetching user', error.message)
  }
}

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase;