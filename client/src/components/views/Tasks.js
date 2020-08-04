import React from 'react';
import http from '../../http';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
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
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleSave(data) {
        console.log(data);
        this.setState({ show: false })
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow.bind(this)}>
                    + Create
                </Button>
                <TaskModal show={this.state.show} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
            </div>
        )
    }
}