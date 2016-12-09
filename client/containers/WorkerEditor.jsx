"use strict";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import WorkerEditor from '../components/WorkerEditor.jsx';

/* bootstrap */
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import {removeWorker, saveOrCreateWorker}from '../actions/workersActions.js'

const
    DEFAULT = null,
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error';

class WorkerEditorContainer extends Component {
    constructor() {
        super();
        this.state = {
            display: false,
            worker: {
                id: 'new',
                first_name: '',
                middle_name: '',
                last_name: '',
                sex: 'male',
                contact: null
            }
        };
    }

    close() {
        this.setState({display: false});
    }

    open() {
        this.setState({display: true});
    }

    removeWorker(e) {
        this.props.dispatch(removeWorker(this.state.worker.id));
    }

    submitForm(e) {
        e.preventDefault();
        this.props.dispatch(saveOrCreateWorker(this.state.worker));
    }

    handleChangeField(e) {
        let worker = this.state.worker;
        worker[e.target.name] = e.target.value;
        this.setState({worker: worker});
    }

    validationFactory(fieldKey) {
        let value = this.state.worker[fieldKey];
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

    componentWillMount() {
        if (this.props.worker) {
            this.setState({worker: _.assign({}, this.props.worker)});
        }
    }

    render() {
        let {worker, display} = this.state;
        let {pending} = this.props;

        if (this.props.created) {

            return (
                <div>
                    <Button onClick={::this.open} bsStyle="primary">Create</Button>
                    <WorkerEditor
                        pending={pending}
                        worker={worker}
                        display={display}
                        onHide={::this.close}
                        onSubmit={::this.submitForm}
                        onChangeField={::this.handleChangeField}
                        getValidationState={::this.getValidationState}
                        getValidationHelpMsg={::this.getValidationHelpMsg}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button onClick={::this.open} bsStyle="info" bsSize="small">
                                <Glyphicon glyph="pencil"/>
                            </Button>
                            <Button onClick={::this.removeWorker} bsStyle="danger" bsSize="small">
                                <Glyphicon glyph="remove"/>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <WorkerEditor
                        pending={pending}
                        worker={worker}
                        display={display}
                        onHide={::this.close}
                        onSubmit={::this.submitForm}
                        onChangeField={::this.handleChangeField}
                        getValidationState={::this.getValidationState}
                        getValidationHelpMsg={::this.getValidationHelpMsg}
                    />
                </div>
            );
        }
    }
}

export default connect(
    (store) => ({
        pending: store.workers.pending,
    })
)(WorkerEditorContainer)
