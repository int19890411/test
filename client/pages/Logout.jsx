"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/authActions.js'
import {browserHistory} from 'react-router';

class Logout extends Component {

    componentWillMount() {
        this.props.dispatch(logout());
        browserHistory.push('/login');
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default connect(
    (store) => ({isAuthenticated: store.auth.isAuthenticated})
)(Logout)
