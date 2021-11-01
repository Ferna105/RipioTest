import { SIGN_IN, SIGN_OUT, SET_USER_ACCOUNT, SET_USER_ACCOUNT_HISTORY } from '../constants';
const initialState = {
    user_logged: 0,
    user: {},
    user_account: {},
    user_account_history: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user_logged: 1,
                user: action.user
            };
        case SIGN_OUT:
            return initialState;
        case SET_USER_ACCOUNT:
            return {
                ...state,
                user_account: action.account
            }
        case SET_USER_ACCOUNT_HISTORY:
            return {
                ...state,
                user_account_history: action.history
            }
        default:
            return state;
    }
}
export default reducer;