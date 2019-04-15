import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyAFLUPjWJYLSxEHgTnCkSkBX2nX4tZtwfE",
    authDomain: "todoapp-12331.firebaseapp.com",
    databaseURL: "https://todoapp-12331.firebaseio.com",
    projectId: "todoapp-12331",
    storageBucket: "todoapp-12331.appspot.com",
    messagingSenderId: "581399751484"
  };
  
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
export const db = firebase.firestore().collection("users");