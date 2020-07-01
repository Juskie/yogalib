const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login Failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('login success !');
            return {
                ...state,
                authError: null
            };
        case 'SIGNOUT_SUCCES':
            console.log('Sign Out Success !');
            return state;

        // case 'SIGNUP_SUCCES':
        //     console.log('signup success');
        //     return {
        //         ...state,
        //         authError: null
        //     };
        // case 'SIGNUP_ERROR':
        //     console.log('signup failed');
        //     return {
        //         ...state,
        //         authError: action.err.message
        //     }
    }

    return state;
};

export default authReducer;