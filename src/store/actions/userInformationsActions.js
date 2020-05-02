export const addFirstUserInformations = (informations) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const userId = getState().firebase.auth.uid;

        console.log(informations);
        firestore.collection('users').doc(userId).update({
            ...informations,
            yogaStyle: informations.yogaStyle && Object.keys(informations.yogaStyle).map( (key) => {
                return informations.yogaStyle[key].value
            }),
            experience: informations.experience && Object.values(informations.experience.value),
            language: informations.language && Object.keys(informations.language).map( (key) => {
                return informations.language[key].value
            }),
            instagram: informations.instagram.toLowerCase(),
            facebook: informations.facebook.toLowerCase(),
            website: informations.website.toLowerCase(),
            presentation: informations.presentation
        }).then(() => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS', informations});
        }).catch((err) => {
            dispatch({type: 'ADD_FIRST_USER_INFORMATIONS_ERROR', err})
        })
    }
};
