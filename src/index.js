import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider, useSelector} from 'react-redux';
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
import {reduxFirestore, getFirestore, createFirestoreInstance} from "redux-firestore";
import {ReactReduxFirebaseProvider, getFirebase, isLoaded} from "react-redux-firebase";
import firebaseApp from "./config/base";
import firebase from "firebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase, firebaseApp)
    )
);

const rrfProps = {
    firebase,
    config: firebaseApp,
    dispatch: store.dispatch,
    createFirestoreInstance
};

function AuthIsLoaded({children}) {

    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth)) return <div>Loading Screen...</div>;
    return children

}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
