"use strict";
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login, changeLoginForm} from '../actions/authActions.js'
import LoginForm from '../components/LoginForm.jsx'
import {browserHistory} from 'react-router';

class Login extends Component {
    _handleLogin(email, password, isRemember) {
        this.props.dispatch(login(email, password, isRemember));
    }

    _handleChangeForm(newState) {
        this.props.dispatch(changeLoginForm(newState));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.isAuthenticated) {
            const redirectRoute = nextProps.location.query.next || '/';
            browserHistory.push(redirectRoute);
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

export default connect(
    (store) => {
        return {
            data: store.auth
        }
    }
)(Login)
