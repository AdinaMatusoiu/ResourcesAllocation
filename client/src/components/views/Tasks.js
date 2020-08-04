import React from 'react';
import http from '../../http';
import { Button, Toast } from 'react-bootstrap';
import TaskModal from '../TaskModal';
import ToastWrapper from '../ToastWrapper';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.toastRef = React.createRef();
        this.state = {
            showModal: false,
            tasks: [],
            currentTask: null,
            enums: {
                type: [],
                status: [],
                priority: [],
            },
        }
    }

    componentDidMount() {
        http.get('/tasks/enums').then(data => {
            this.setState({ enums: data });
        })
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleSave(data) {
        this.setState({ showModal: false })
        http.post('/tasks', data)
            .then(() => {
                this.toastRef.current.show('Task created', '', 3000);
            })
            .catch(error => {
                console.log(error);
                this.toastRef.current.show('', error.data.message, 3000);
            })
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow.bind(this)}>
                    + Create
                </Button>
                <TaskModal style={{ zIndex: 100 }} show={this.state.showModal} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
                <ToastWrapper ref={this.toastRef} />
            </div>
        )
    }
}