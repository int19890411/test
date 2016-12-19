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
    authorized: false,
    error: ""
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_FORM_FULFILLED':
            return {
                ...state,
                formState: _.assign({}, state.formState, action.payload.data)
            }
        case 'LOGIN_PENDING':
            return {...state, pending: true}
        case 'LOGIN_REJECTED':
            let message = `Error ${action.payload.response.status}: `;
            if (action.payload.response && action.payload.response.data && action.payload.response.data.error) {
                message += action.payload.response.data.error;
            }
            return {...state, pending: false, error: message}
        case 'LOGIN_FULFILLED':
            return {...state, pending: false, authorized: true, error: null}
        default:
            return state
    }
}

export default reducer