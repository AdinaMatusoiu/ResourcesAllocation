import React from 'react';
import { Button } from 'react-bootstrap';
import WorkLogModal from './WorkLogModal';
import http from '../http';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            worklogs: [],
        }
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleSave(data) {
        http.post('/workedlogs', { ...data, task_id: this.props.id })
            .then(created => {
                this.props.toastRef.current.show('Worklog created', '', 3000);
                this.props.onWorklogAdd(created);
            }).catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            })
        this.setState({ showModal: false });

    }

    render() {
        return (<div style={{ width: '50%', margin: '0 2em 0 2em' }}>
            <h3>Details</h3>
            <p>Name: {this.props.name}</p>
            <p>Type: {this.props.type}</p>
            <p>Priority: {this.props.priority}</p>
            <p>Deadline: {this.props.deadline === undefined ? '' : (this.props.deadline === null ? 'none' : this.props.deadline.split('T')[0])}</p>
            <p>Open At: {this.props.creation_date ? this.props.creation_date.split('T')[0] : ''}</p>
            <h3>Description</h3>
            <p>{this.props.description}</p>
            <Button variant="primary" onClick={this.handleShow.bind(this)} disabled={!this.props.name}>
                Log Work
                </Button>
            <WorkLogModal show={this.state.showModal} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
        </div>)
    }
}