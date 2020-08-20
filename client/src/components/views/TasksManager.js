import React from 'react';
import http from '../../http';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal';
import './TasksManager.css';

export default class TasksManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            tasks: [null, null, null, null],
            resources: [null, null, null, null, null, null],
            currentTask: null,
            dragTaskIndex: null,
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
        http.get('/users/manager/resources').then(resources => {
            if (resources.length >= 6) {
                this.setState({ resources });
            } else {
                const current = this.state.resources;
                resources.forEach((resource, index) => {
                    current[index] = resource;
                });
                this.setState({ resources: current });
            }
            console.log('resources:', resources);
        })
        http.get('/users/manager/tasks').then(tasks => {
            if (tasks.length >= 4) {
                this.setState({ tasks });
            } else {
                const current = this.state.tasks;
                tasks.forEach((task, index) => {
                    current[index] = task;
                });
                this.setState({ tasks: current });
            }
            console.log('tasks:', tasks);
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
            .then((created) => {
                const { tasks } = this.state;
                const index = tasks.indexOf(null);
                if (index !== -1) {
                    tasks[index] = created;
                } else {
                    tasks.push(created);
                }
                this.setState({ tasks });
                this.props.toastRef.current.show('Task created', '', 3000);
            }).catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            })
    }

    handleDrop(event) {
        event.preventDefault();
        const index = this.getChildIndex(event.target.parentNode);
        event.target.parentNode.style.opacity = '100%';
        const { tasks, resources } = this.state;
        http.put('/tasks', { task_id: tasks[this.state.dragTaskIndex].id, resource_id: resources[index].id })
            .then(() => {
                tasks.splice(this.state.dragTaskIndex, 1);
                if (tasks.length < 4) {
                    tasks.push(null);
                }
                resources[index].no_tasks++;
                this.setState({ tasks, resources });
                this.props.toastRef.current.show('Task successfully assigned!', '', 3000);
            }).catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            })

    }

    handleDragStart(event) {
        const index = this.getChildIndex(event.target);
        this.setState({ dragTaskIndex: index })
    }

    getChildIndex(child) {
        const parent = child.parentNode;
        const index = Array.prototype.indexOf.call(parent.children, child);
        return index;
    }

    handleDragEnter(event) {
        event.preventDefault();
        event.target.parentNode.style.opacity = '50%';
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.target.parentNode.style.opacity = '100%';
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow.bind(this)}>
                    + Create
                </Button>
                <div style={{ width: '30%', height: '300px', overflowY: 'scroll' }}>
                    <table className="table table-striped table-dark">
                        <thead >
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map((task, index) => {
                                if (task) {
                                    return <tr className="clickable" draggable="true" onDragStart={this.handleDragStart.bind(this)} key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.type}</td>
                                    </tr>
                                } else {
                                    return <tr key={index}><td></td><td></td></tr>
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ width: '45%', height: '400px', overflowY: 'scroll', marginLeft: '600px', marginTop: '-300px', }}>
                    <table className="table table-stripped table-dark">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>No. Tasks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.resources.map((resource, index) => {
                                if (resource) {
                                    return <tr onDragEnter={this.handleDragEnter.bind(this)} onDragLeave={this.handleDragLeave.bind(this)} onDragOver={e => e.preventDefault()} onDrop={this.handleDrop.bind(this)} key={index}>
                                        <td>{resource.name}</td>
                                        <td>{resource.no_tasks}</td>
                                        <td className="clickable"><Button variant="primary">See Details</Button>
                                        </td>
                                    </tr>
                                } else return <tr key={index}><td></td><td></td><td></td></tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <TaskModal show={this.state.showModal} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
            </div>
        )
    }
}