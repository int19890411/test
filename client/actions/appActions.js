/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'

export function changeLoginForm(newState) {
    return {
        type: "CHANGE_LOGIN_FORM",
        payload: Promise.resolve(newState)
    }
}

export function login(email, password, isRemember) {
    return {
        type: "LOGIN",
        payload: axios.post('/login', {email, password, isRemember})
    }
}