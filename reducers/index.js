import { SIGN_IN, SIGN_OUT } from '../constants';
const initialState = {
    user_logged: 0,
    user: {}
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
            return {
                ...state,
                user_logged: 0,
                user: {}
            };
        default:
            return state;
    }
}
export default reducer;