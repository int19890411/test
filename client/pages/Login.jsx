"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login, changeLoginForm} from '../actions/appActions.js'
import LoginForm from '../components/LoginForm.jsx'
import {hashHistory} from 'react-router';

class Login extends Component {
    _handleLogin(email, password, isRemember) {
        this.props.dispatch(login(email, password, isRemember));
    }

    _handleChangeForm(newState) {
        this.props.dispatch(changeLoginForm(newState));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.authorized) {
            hashHistory.push('/home');
        }
    }

    render() {
        const {formState, pending, error} = this.props.data;
        return (
            <LoginForm data={formState}
                       onChange={::this._handleChangeForm}
                       onSubmit={::this._handleLogin}
                       pending={pending}
                       error={error}
            />
        );
    }
}

export default connect(store => ({
    data: store.auth
}))(Login)
