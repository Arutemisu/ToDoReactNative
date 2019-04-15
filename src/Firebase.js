import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "XXXXX",
    authDomain: "XXXXX",
    databaseURL: "XXXXX",
    projectId: "todoapp-12331",
    storageBucket: "XXXXX",
    messagingSenderId: "XXXXX"
  };
  
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
export const db = firebase.firestore().collection("users");
