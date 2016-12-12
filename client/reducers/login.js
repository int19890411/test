/**
 * Created by PC10 on 06.12.2016.
 */
import _ from 'lodash';
import auth from '../utils/auth';

const initialState = {
    formState: {
        email: "",
        password: "",
        isRemember: false
    },
    pending: false,
    loggedIn: auth.loggedIn(),
    error: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_FORM_FULFILLED':
            return {
                ...state,
                formState: _.assign({}, state.formState, action.payload.data)
            }
        default:
            return state
    }
}

export default reducer