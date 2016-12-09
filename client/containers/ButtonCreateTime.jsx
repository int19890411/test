"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import ModalCreateTime from '../components/ModalCreateTime.jsx'
import Button from 'react-bootstrap/lib/Button';
import dateFormat from 'dateformat';

import {createTime} from '../actions/timesActions.js'

const
    DEFAULT = null,
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error';

class ButtonCreateTime extends Component {
    constructor() {
        super();
        this.state = {
            display: false,
            fields: {
                first_name: '',
                middle_name: '',
                last_name: '',
                sex: 'male',
                date: new Date().toISOString(),
                start: '08:00',
                end: '16:00'
            }
        };
    }

    close() {
        this.setState({display: false});
    }

    open() {
        this.setState({display: true});
    }

    submitForm(e) {
        e.preventDefault();
        var date = new Date(this.state.fields.date);
        var start = new Date(dateFormat(date, "yyyy-mm-dd ") + this.state.fields.start);
        var end = new Date(dateFormat(date, "yyyy-mm-dd ") + this.state.fields.end);
        var form = _.assign({}, this.state.fields, {date: date, start: start, end: end});
        this.props.dispatch(createTime(form));
    }

    handleChangeDataPicker(value, formattedValue) {
        var fields = _.assign({}, this.state.fields, {date: value});
        this.setState({fields: fields});
    }

    handleChangeField(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value; //ебала переделать
        this.setState({fields: fields});
    }

    validationFactory(fieldKey) {
        let value = this.state.fields[fieldKey];
        switch (fieldKey) {
            case "first_name":
            case "middle_name":
            case "last_name":
                if (value && value.length < 5) {
                    return {
                        type: WARNING,
                        msg: "The name is very short"
                    }
                }
            default:
                return {
                    type: DEFAULT,
                    msg: null
                }
        }
    }

    getValidationHelpMsg(fieldKey) {
        const obj = this.validationFactory(fieldKey);
        if (obj.type == SUCCESS || obj.type == DEFAULT) {
            return null;
        }
        return obj.type + ": " + (obj.msg || "");
    }

    getValidationState(fieldKey) {
        return this.validationFactory(fieldKey).type;
    }

    render() {
        let {fields, display} = this.state;
        let {pending} = this.props;

        return (
            <div>
                <Button onClick={::this.open} bsStyle="primary">Create</Button>
                <ModalCreateTime
                    pending={pending}
                    fields={fields}
                    display={display}
                    onHide={::this.close}
                    onSubmit={::this.submitForm}
                    onChangeField={::this.handleChangeField}
                    getValidationState={::this.getValidationState}
                    getValidationHelpMsg={::this.getValidationHelpMsg}
                    onChangeDataPicker={::this.handleChangeDataPicker}
                />
            </div>
        );
    }
}

export default connect(
    (store) => ({
        pending: store.times.pending,
    })
)(ButtonCreateTime)
