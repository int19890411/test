/**
 * Created by PC10 on 06.12.2016.
 */
import _ from 'lodash';
const initialState = {
    formState: {
        email: "",
        password: "",
        isRemember: false
    },
    pending: false,
    isAuthenticated: false,
    error: ""
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_FORM':
            return {
                ...state,
                formState: _.assign({}, state.formState, action.payload.data)
            }
        case 'LOGOUT':
            return {...state, isAuthenticated: false}
        case 'LOGIN_PENDING':
            return {...state, pending: true, error: null}
        case 'LOGIN_REJECTED':
            let message = `Error ${action.payload.response.status}: `;
            if (action.payload.response && action.payload.response.data && action.payload.response.data.error) {
                message += action.payload.response.data.error;
            }
            return {...state, pending: false, isAuthenticated: false, error: message}
        case 'LOGIN_FULFILLED':
            return {...state, pending: false, isAuthenticated: true}

        default:
            return state
    }
}

export default reducer