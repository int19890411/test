/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'
import {setAuthorizationToken} from '../utils/setAuthorizationToken.js'

export function changeLoginForm(newState) {
    return {
        type: "CHANGE_LOGIN_FORM",
        payload: {
            data: newState
        }
    }
}


export function logout() {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(null);
    return {
        type: "LOGOUT"
    }
}

export function login(email, password, isRemember) {
    return {
        type: "LOGIN",
        payload: axios.post('/api/login', {email, password, isRemember}).then((res) => {
            const token = res.data;
            if (token) {
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
            }
            return Promise.resolve(token); //type: LOGIN_FULFILLED
        })
    }
}

export function loginFulfilled(token) {
    setAuthorizationToken(token);
    return {
        type: "LOGIN_FULFILLED",
        payload: token
    }
}