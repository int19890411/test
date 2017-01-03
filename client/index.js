/**
 * Created by PC10 on 04.12.2016.
 */
"use strict";
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import {Provider} from 'react-redux'
import store from './store'

import Workers from './pages/Workers.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import PNF from './pages/NotFound.jsx'
import {loginFulfilled} from './actions/authActions.js'
var jwtDecode = require('jwt-decode')

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

let token = localStorage.getItem('jwtToken');
var decode = jwtDecode(token);
if (token && decode && decode.exp > new Date().getTime()) {
    store.dispatch(loginFulfilled(token));
}


function checkAuth(nextState, replace) {
    let authorized = store.getState().auth.isAuthenticated || false;
    if (!authorized) {
        const redirectAfterLogin = nextState.location.pathname;
        replace(`/login?next=${redirectAfterLogin}`);
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route onEnter={checkAuth}>
                    <IndexRoute component={Home}/>
                    <Route path="/workers" component={Workers}/>
                </Route>
                <Route path="*" component={PNF}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
