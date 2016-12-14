/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'
import {hashHistory} from 'react-router';

export function changeLoginForm(newState) {
    return {
        type: "CHANGE_LOGIN_FORM",
        payload: Promise.resolve(newState)
    }
}

export function auth(loggedIn) {
    return {
        type: "AUTH",
        payload: Promise.resolve({
            loggedIn
        })
    }
}

export function login(email, password, isRemember) {
    return {
        type: "LOGIN",
        payload: axios.post('/login', {email, password, isRemember})
    }
}


//utils function
function forwardTo(location) {
    console.log(1);
    hashHistory.push(location);
}