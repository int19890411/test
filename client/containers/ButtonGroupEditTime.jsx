"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import ModalEditTime from '../components/ModalEditTime.jsx'
import dateFormat from 'dateformat';

import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import {saveTime, deleteTime} from '../actions/timesActions.js'

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
                id: null,
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

    delete() {
        this.props.dispatch(deleteTime(this.state.fields.id));
    }

    submitForm(e) {
        e.preventDefault();
        var date = new Date(this.state.fields.date);
        console.log(date, this.state.fields.date);
        var start = new Date(dateFormat(date, "yyyy-mm-dd ") + this.state.fields.start);
        var end = new Date(dateFormat(date, "yyyy-mm-dd ") + this.state.fields.end);
        var form = _.assign({}, this.state.fields, {date: date, start: start, end: end});
        this.props.dispatch(saveTime(form));
    }

    handleChangeField(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields: fields});
    }

    componentWillMount() {
        if (this.props.time) {
            this.setState({
                fields: _.assign(
                    {},
                    this.props.time,
                    {
                        start: dateFormat(this.props.time.start, "HH:MM"),
                        end: dateFormat(this.props.time.end, "HH:MM")
                    })
            });
        }
    }

    render() {
        let {fields, display} = this.state;
        let {pending} = this.props;

        return (
            <div>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={::this.open} bsStyle="info" bsSize="small">
                            <Glyphicon glyph="pencil"/>
                        </Button>
                        <Button onClick={::this.delete} bsStyle="danger" bsSize="small">
                            <Glyphicon glyph="remove"/>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <ModalEditTime
                    pending={pending}
                    fields={fields}
                    display={display}
                    onHide={::this.close}
                    onSubmit={::this.submitForm}
                    onChangeField={::this.handleChangeField}
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
