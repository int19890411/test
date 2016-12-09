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
        let {fields, display, onHide, onSubmit, onChangeField, pending}  = this.props;
        return (
            <div className="static-modal">
                <Modal show={display} onHide={onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit time #{fields.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={onSubmit}>
                            <FormGroup>
                                <ControlLabel>Date</ControlLabel>
                                <DatePicker id="example-datepicker"
                                            dateFormat="YYYY-MM-DD"
                                            name="date"
                                            value={fields.date}
                                            onChange={onChangeField}
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Start time</ControlLabel>
                                <FormControl value={fields.start} name="start"
                                             type="time" onChange={onChangeField}/>
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>End time</ControlLabel>
                                <FormControl defaultValue={fields.end} name="end"
                                             type="time" onChange={onChangeField}/>
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