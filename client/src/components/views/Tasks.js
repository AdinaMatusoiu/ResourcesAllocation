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
                    <TaskModal show={this.state.showModal} data={this.state.currentTask} enums={this.state.enums} onClose={this.handleClose.bind(this)} onSave={this.handleSave.bind(this)} />
                </div>
            )
        } else {
            return (
                <div>
<table class="table table-striped table-dark">
      <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">TYPE</th>
      <th scope="col">STATUS</th>
      <th scope="col">DESCRIPTION</th>
     <th scope="col">PRIORITY</th>
      <th scope="col">DEADLINE</th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-warning">
      <th scope="row">1</th>
      <td>LE WRONG THING</td>
      <td>blabla</td>
      <td>open</td>
      <td>high</td>
      <td>open</td>
      <td>5-0-9232</td>
      <Button variant="primary btn-lg" onClick={this.handleShow.bind(this)}>
                       Close task
                    </Button>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td></td>
    </tr>
    <tr class="bg-danger">
      <th scope="row">3</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>

    </tr>
  </tbody>
</table>
                </div>
            )
        }
    }
}