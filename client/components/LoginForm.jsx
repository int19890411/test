import React, {Component} from 'react';
import _ from 'lodash';

/* bootstrap */
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';

class LoginForm extends Component {

    _changeEmail(e) {
        let newState = _.assign(this.props.data, {
            email: e.target.value
        });
        this._emitChange(newState);
    }

    _changePassword(e) {
        let newState = _.assign(this.props.data, {
            password: e.target.value
        });
        this._emitChange(newState);
    }

    _changeRemember(e) {
        let newState = _.assign(this.props.data, {
            isRemember: e.target.checked
        });
        this._emitChange(newState);
    }

    _emitChange(newState) {
        this.props.onChange(newState);
    }

    _onSubmit(e) {
        //if uncontrolled form
        //console.log(this.fEmail.value, this.fPassword.value, this.fRemember.checked);
        e.preventDefault();
        this.props.onSubmit(this.props.data.email, this.props.data.password, this.props.data.isRemember);
    }

    render() {
        let {pending, error}  = this.props;
        let alert = error ?
            <Row>
                <Col sm={2}></Col>
                <Col sm={10}><Alert bsStyle="danger">{error}</Alert></Col>
            </Row> : null;

        return (
            <Form onSubmit={::this._onSubmit} horizontal>
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                        <Alert bsStyle="info">
                            Email: admin@mail.com<br></br>
                            Password: password
                        </Alert>
                    </Col>
                </Row>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl type="email" placeholder="Email"
                                     onChange={::this._changeEmail} inputRef={ref => this.fEmail = ref}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password"
                                     placeholder="Password"
                                     onChange={::this._changePassword}
                                     inputRef={ref => {
                                         this.fPassword = ref;
                                     }}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" disabled={pending}>
                            {pending ? 'Loading...' : 'Sign in'}
                        </Button>
                    </Col>
                </FormGroup>
                {alert}
            </Form>
        )
        /*
         <FormGroup>
         <Col smOffset={2} sm={10}>
         <Checkbox onChange={::this._changeRemember} inputRef={ref => {
         this.fRemember = ref;
         }}>Remember me</Checkbox>
         </Col>
         </FormGroup>
         */
    }
}

LoginForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func,
    pending: React.PropTypes.bool,
    error: React.PropTypes.string,
    data: React.PropTypes.object.isRequired
}

export default LoginForm;