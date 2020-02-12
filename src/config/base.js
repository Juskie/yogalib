import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCl95pHKzYbwIO2QQAwZzoUoUCQxDdzYxY",
    authDomain: "yogalib-developpement.firebaseapp.com",
    databaseURL: "https://yogalib-developpement.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp }

// this is a default export
export default base
