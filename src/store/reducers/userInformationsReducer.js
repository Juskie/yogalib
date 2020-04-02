const initialState = {};

const userFirstInformationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FIRST_USER_INFORMATIONS':
            console.log('create project success');
            return state;
        case 'ADD_FIRST_USER_INFORMATIONS_ERROR':
            console.log('create project error');
            return state;
    }
    return state;
};

export default userFirstInformationsReducer;