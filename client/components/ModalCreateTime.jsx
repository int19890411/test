import React, {Component} from 'react';

/* bootstrap */
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DatePicker from 'react-bootstrap-date-picker';

class ModalWindow extends Component {
    render() {
        let {fields, display, onHide, onSubmit, onChangeField, onChangeDataPicker, getValidationState, getValidationHelpMsg, pending}  = this.props;
        return (
            <div className="static-modal">
                <Modal show={display} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>New time</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <FormGroup validationState={getValidationState("first_name")}>
                                <ControlLabel>First name</ControlLabel>
                                <FormControl defaultValue={fields.first_name} name="first_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("first_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={getValidationState("middle_name")}>
                                <ControlLabel>Middle name</ControlLabel>
                                <FormControl defaultValue={fields.middle_name} name="middle_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("middle_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={getValidationState("last_name")}>
                                <ControlLabel>Last name</ControlLabel>
                                <FormControl defaultValue={fields.last_name} name="last_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("last_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Sex</ControlLabel>
                                <div>
                                    <ButtonGroup>
                                        <Button onClick={onChangeField} name="sex" value="male"
                                                active={fields.sex != "female" }>Male</Button>
                                        <Button onClick={onChangeField} name="sex" value="female"
                                                active={fields.sex == "female"}>Female</Button>
                                    </ButtonGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Date</ControlLabel>
                                <DatePicker id="example-datepicker"
                                            dateFormat="YYYY-MM-DD"
                                            value={fields.date}
                                            name="date"
                                            onChange={onChangeDataPicker}
                                />
                            </FormGroup>
                            <FormGroup validationState={getValidationState("start")}>
                                <ControlLabel>Start time</ControlLabel>
                                <FormControl value={fields.start} name="start"
                                             type="time" onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("start")}</HelpBlock>
                            </FormGroup>

                            <FormGroup validationState={getValidationState("end")}>
                                <ControlLabel>End time</ControlLabel>
                                <FormControl defaultValue={fields.end} name="end"
                                             type="time" onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("end")}</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                                <Button type="submit" disabled={pending} bsStyle="success">
                                    {pending ? 'Pending...' : 'Submit'}
                                </Button>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalWindow;