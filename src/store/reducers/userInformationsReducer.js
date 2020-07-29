const initialState = {};

const userFirstInformationsReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_FIRST_USER_INFORMATIONS':
            return state;
        case 'ADD_FIRST_USER_INFORMATIONS_ERROR':
            return state;
        case 'ADD_USER_IMAGE':
            return state;
        case 'ADD_USER_IMAGE_ERROR':
            return state;
    }
    return state;
};

export default userFirstInformationsReducer;