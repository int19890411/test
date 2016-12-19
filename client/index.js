/**
 * Created by PC10 on 04.12.2016.
 */
"use strict";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Provider} from 'react-redux';
import store from './store';

import Workers from './pages/Workers.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import PNF from './pages/NotFound.jsx';
import axios from 'axios';

import {Router, Route, IndexRoute, browserHistory} from 'react-router'

function checkAuth(nextState, replace) {
    const authorized = store.getState().auth.authorized || false;
    if (!authorized) {
        replace('/login');
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/login" component={Login}/>
                <Route onEnter={checkAuth}>
                    <IndexRoute component={Home}/>
                    <Route path="/workers" component={Workers}/>
                    <Route path="/home" component={Home}/>
                </Route>
                <Route path="*" component={PNF}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
