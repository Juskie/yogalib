import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import authReducer from "./authReducer";
import userFirstInformationsReducer from "./userInformationsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    addFirstUserInformations: userFirstInformationsReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;