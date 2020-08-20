import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TaskModal.css';
import DatePicker from 'react-date-picker';

export default class TaskModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: '',
            priority: '',
            deadline: null,
            message: '',
        }
    }

    componentDidUpdate(prevProps) {
        Object.keys(this.props.enums).forEach(key => {
            if (prevProps.enums[key].length === 0) {
                this.setState({ [key]: this.props.enums[key][0] })
            }
        })
    }

    handleFormChange(event, prop) {
        this.setState({ [prop]: event.target.value });
    }

    handleHide() {
        this.setState({
            name: '',
            description: '',
        });
        this.props.onClose();
    }

    handleSave() {
        const { name, description, type, priority, deadline } = this.state;
        console.log(deadline.toLocaleDateString());
        if (name && description && type && priority && this.props.enums.type.indexOf(type) !== -1 && this.props.enums.priority.indexOf(priority) !== -1) {
            this.setState({
                name: '',
                description: '',
            });
            this.props.onSave({ name, description, type, priority, deadline });
        } else {
            this.setState({ message: 'Please fill all fields!' });
        }
    }

    onDateChange(value) {
        this.setState({ deadline: value });
    }

    render() {
        if (this.props.data) {

        } else {
            return (
                <Modal show={this.props.show} onHide={this.handleHide.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label>Name:</label>
                            <input value={this.state.name} onChange={e => this.handleFormChange(e, 'name')} />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea value={this.state.description} onChange={e => this.handleFormChange(e, 'description')} name="textarea"></textarea>
                        </div>
                        <div>
                            <label>Type:</label>
                            <select value={this.state.type} onChange={e => this.handleFormChange(e, 'type')}>
                                {this.props.enums.type.map((type, index) => <option key={index} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Priority:</label>
                            <select value={this.state.priority} onChange={e => this.handleFormChange(e, 'priority')}>
                                {this.props.enums.priority.map((priority, index) => <option key={index} value={priority}>{priority}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Deadline:</label>
                            <DatePicker onChange={this.onDateChange.bind(this)} value={this.state.deadline} minDate={new Date()} />
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
}