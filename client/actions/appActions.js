/**
 * Created by PC10 on 07.12.2016.
 */
import axios from 'axios'
import {browserHistory} from 'react-router';

export function changeLoginForm(newState) {
    return {
        type: "CHANGE_LOGIN_FORM",
        payload: Promise.resolve(newState)
    }
}

export function login(email, password, isRemember) {
    return {
        type: "LOGIN",
        payload: axios.post('/api/login', {email, password, isRemember}).then((res) => {
            const token = res.data;
            if(token) {
                localStorage.setItem('jwtToken', token);
                axios.defaults.headers.common['Authorization'] = token;
            }
            return Promise.resolve(res);
        })
    }
}

