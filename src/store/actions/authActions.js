import firebase from "firebase/app";
import "firebase/auth";


export const signIn = credentials => {
  return (dispatch) => {
     firebase.auth().signInWithEmailAndPassword(
         credentials.email,
         credentials.password
     ).then( () => {
       dispatch({ type: 'LOGIN_SUCCESS'})
     }).catch( (err) => {
       dispatch({ type: 'LOGIN_ERROR', err})
     })
  }
};

export const signOut = () => {
    return (dispatch) => {
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'});
        })
    }
};

export const signUp = newUser => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email.toLowerCase(),
            newUser.password
        ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: 'teacher',
                phone: newUser.phone
            })
        }).then( () => {
            dispatch({ type: 'SIGNUP_SUCCESS'});
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    }
};