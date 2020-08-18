import React from 'react';
import http from '../../http';
import { Button } from 'react-bootstrap';
import TaskModal from '../TaskModal';

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            tasks: [],
            resources: [],
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
        http.get('/users/manager/resources').then(resources => {
            this.setState({ resources });
            console.log('resources:', resources);
        })
        http.get('/users/manager/tasks').then(tasks => {
            this.setState({ tasks });
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
            .then(() => {
                this.props.toastRef.current.show('Task created', '', 3000);
            })
            .catch(error => {
                console.log(error);
                this.props.toastRef.current.show('', error.data.message, 3000);
            })
    }

    render() {
        if (localStorage.getItem('user_role') === 'manager') {
            return (
                <div>
                    <Button variant="primary" onClick={this.handleShow.bind(this)}>
                        + Create
                    </Button>
         <table id="tasks" class="table table-striped table-dark">
            <thead>
                <tr>
            <th scope="col">ID </th>
            <th scope="col">NAME </th>
            <th scope="col">TYPE</th>
            <th scope="col">STATUS</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">PRIORITY</th>
                 </tr>
            </thead>
            <tbody>
                 
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.id}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.name}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.type}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.status}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.description}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.priority}</div>)}</td>
                
                    </tbody>
                    </table>


<table id="res" className="table table-sm">
<thead>
<tr>
      <th scope="col">ID </th>
      <th scope="col">NAME </th>
 </tr>
</thead>
<tbody>
<td>{this.state.resources.map(resource => <tr> { resource.id }</tr>)}</td>
<td>{this.state.resources.map(resource => <tr> { resource.name }</tr>)}</td>

</tbody>
</table>
<TaskModal show={this.state.showModal} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
</div>)
    } else {

            return (
<div>
<table className="table table-striped table-dark">
<thead>
        <tr>
            <th scope="col">ID </th>
            <th scope="col">NAME </th>
            <th scope="col">TYPE</th>
            <th scope="col">STATUS</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">PRIORITY</th>
         </tr>
            </thead>
            <tbody>
                 
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.id}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.name}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.type}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.status}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.description}</div>)}</td>
                    <td>{this.state.tasks.map(task=> <div key={task.id}>{task.priority}</div>)}</td>
         </tbody>
</table>
                </div>
            )
        }
    }
}