"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login, changeLoginForm} from '../actions/appActions.js'
import LoginFrom from '../components/Login.jsx'


import Table from 'react-bootstrap/lib/Table';
import Pagination from 'react-bootstrap/lib/Pagination';
import Time from 'react-time';

class Login extends Component {
    _handleLogin(email, password, isRemember) {
        this.props.dispatch(login(email, password, isRemember));
    }

    _handleChangeForm(newState) {
        this.props.dispatch(changeLoginForm(newState));
    }

    render() {
        const {formState} = this.props.data;
        return (
            <LoginFrom data={formState} onChange={::this._handleChangeForm} onSubmit={::this._handleLogin}/>
        );
    }
}

export default connect(
    (store) => ({
        data: store.login,
    })
)(Login)
