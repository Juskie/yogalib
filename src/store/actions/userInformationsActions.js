export const addFirstUserInformations = (informations) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        console.log(informations);
        firestore.collection('users').doc(userId).update({
            ...informations,
            yogaStyle: Object.keys(informations.yogaStyle).map( (key) => {
                return informations.yogaStyle[key].value
            }),
            experience: Object.values(informations.experience.value),
            language: Object.keys(informations.language).map( (key) => {
                return informations.language[key].value
            }),
            instagram: informations.instagram,
            facebook: informations.facebook,
            website: informations.website,
            presentation: informations.presentation
        }).then(() => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS', informations});
        }).catch((err) => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS_ERROR', err})
        })
    }
};
