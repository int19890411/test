/**
 * Created by PC10 on 04.12.2016.
 */
"use strict";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Provider} from 'react-redux';
import Store from './store';

import Workers from './pages/Workers.jsx';
import Home from './pages/Home.jsx';

import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
/*
 ReactDOM.render(
 <App/>
 ,
 document.getElementById("root")
 )
 */


ReactDOM.render(
    <Provider store={Store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/workers" component={Workers}/>
                <Route path="/home" component={Home}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
