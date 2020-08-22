import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';


export default class WorkLogModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            from: '',
            to: '',
            date: null,
            message: '',
        }
    }

    handleHide() {
        this.props.onClose();
    }

    handleSave() {
        const { description, from, to, date } = this.state;
        const hourRegexp = new RegExp(/^\d{1,2}[:][0-5][0-9]$/);
        if (description && from && to && date) {
            if (hourRegexp.test(from) && hourRegexp.test(to) &&
                Date.parse(`01/01/2000 ${from}`) < Date.parse(`01/01/2000 ${to}`)) {
                this.setState({
                    from: '',
                    description: '',
                    to: '',
                });
                this.props.onSave({ description, from, to, date });
            } else {
                this.setState({ message: 'Time interval is wrong!' })
            }
        } else {
            this.setState({ message: 'Please fill all fields!' });
        }
    }

    handleFormChange(event, prop) {
        this.setState({ [prop]: event.target.value });
    }
    onDateChange(value) {
        this.setState({ date: value });
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleHide.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Log Work</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>Description:</label>
                        <textarea value={this.state.description} onChange={e => this.handleFormChange(e, 'description')} name="textarea"></textarea>
                    </div>
                    <div>
                        <label>
                            Date:</label>
                        <DatePicker onChange={this.onDateChange.bind(this)} value={this.state.date} minDate={new Date()} />
                    </div>
                    <div>
                        <label>From:</label>
                        <input value={this.state.name} onChange={e => this.handleFormChange(e, 'from')} />
                    </div>
                    <div>
                        <label>To:</label>
                        <input value={this.state.name} onChange={e => this.handleFormChange(e, 'to')} />
                    </div>
                    <p style={{ textAlign: 'center', color: 'red' }}>{this.state.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHide.bind(this)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave.bind(this)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}