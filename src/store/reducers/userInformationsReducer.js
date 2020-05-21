const initialState = {};

const userFirstInformationsReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_FIRST_USER_INFORMATIONS':
            console.log('user informations success');
            return state;
        case 'ADD_FIRST_USER_INFORMATIONS_ERROR':
            console.log('user informations error');
            return state;
    }
    return state;
};

export default userFirstInformationsReducer;