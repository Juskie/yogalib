import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCl95pHKzYbwIO2QQAwZzoUoUCQxDdzYxY",
    authDomain: "yogalib-developpement.firebaseapp.com",
    databaseURL: "https://yogalib-developpement.firebaseio.com",
    projectId: "yogalib-developpement",
    storageBucket: "yogalib-developpement.appspot.com",
    messagingSenderId: "625633703061",
    appId: "1:625633703061:web:4bc17c1d2aae489ab3979c",
    measurementId: "G-720R56BDYY"
});

firebaseApp.firestore().settings({});

export default firebaseApp;

export const storage = firebase.storage();

