import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TaskModal.css'

export default class TaskModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            status: '',
            type: '',
            priority: '',
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
            status: '',
            type: '',
            priority: '',
        });
        this.props.onClose();
    }

    handleSave() {
        this.setState({
            name: '',
            description: '',
            status: '',
            type: '',
            priority: '',
        });
        this.props.onSave(this.state);
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
                            <label>Status:</label>
                            <select value={this.state.status} onChange={e => this.handleFormChange(e, 'status')}>
                                {this.props.enums.status.map((status, index) => <option key={index} value={status}>{status}</option>)}
                            </select>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide.bind(this)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSave.bind(this)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}