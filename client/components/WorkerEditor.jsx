import React, {Component} from 'react';

/* bootstrap */
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

class ModalWindow extends Component {
    render() {
        let {worker, display, onHide, onSubmit, onChangeField, getValidationState, getValidationHelpMsg, pending}  = this.props;
        return (
            <div className="static-modal">
                <Modal show={display} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{worker.id ? `Edit worker #${worker.id}` : "New worker"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <FormGroup validationState={getValidationState("first_name")}>
                                <ControlLabel>First name</ControlLabel>
                                <FormControl defaultValue={worker.first_name} name="first_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("first_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={getValidationState("middle_name")}>
                                <ControlLabel>Middle name</ControlLabel>
                                <FormControl defaultValue={worker.middle_name} name="middle_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("middle_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={getValidationState("last_name")}>
                                <ControlLabel>Last name</ControlLabel>
                                <FormControl defaultValue={worker.last_name} name="last_name" type="text"
                                             onChange={onChangeField}/>
                                <HelpBlock>{getValidationHelpMsg("last_name")}</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Sex</ControlLabel>
                                <div>
                                    <ButtonGroup>
                                        <Button onClick={onChangeField} name="sex" value="male"
                                                active={worker.sex != "female" }>Male</Button>
                                        <Button onClick={onChangeField} name="sex" value="female"
                                                active={worker.sex == "female"}>Female</Button>
                                    </ButtonGroup>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Contact</ControlLabel>
                                <FormControl defaultValue={worker.contact} name="contact" type="text"
                                             onChange={onChangeField}/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" disabled={pending} bsStyle="success">{pending ? 'Pending...' : 'Submit'}</Button>
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