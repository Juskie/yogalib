export const addFirstUserInformations = (informations) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        firestore.collection('users').doc(userId).update({
            ...informations,
            yogaStyle: '',
            experience: '',
            language: '',
            instagram: '',
            facebook: '',
            website: '',
            presentation: ''
        }).then(() => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS', informations});
        }).catch((err) => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS_ERROR', err})
        })
    }
};
