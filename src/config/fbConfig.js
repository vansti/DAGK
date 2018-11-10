import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyBMbFPF2-CfNZywfSpRu_AEdRyb_czGB_0",
  authDomain: "dagk-da64a.firebaseapp.com",
  databaseURL: "https://dagk-da64a.firebaseio.com",
  projectId: "dagk-da64a",
  storageBucket: "dagk-da64a.appspot.com",
  messagingSenderId: "734095293560"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const ggAuth = new firebase.auth.GoogleAuthProvider();
export default firebase;
export const storage = firebase.storage().ref();