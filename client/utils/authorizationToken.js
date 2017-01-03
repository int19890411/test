/**
 * Created by PC10 on 20.12.2016.
 */
import axios from 'axios'
var jwtDecode = require('jwt-decode')

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function getAuthorizationToken() {
    return axios.defaults.headers.common['Authorization'] || null;
}

export function getDecodedAuthorizationToken() {
    return getAuthorizationToken() ? jwtDecode(getAuthorizationToken()) : null;
}