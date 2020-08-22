import React from 'react';
import TasksList from '../TasksList';
import Task from '../Task';
import http from '../../http';


export default class TaskResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [null, null, null, null, null, null, null, null, null, null],
            currentTask: null,
        }
    }

    componentDidMount() {
        http.get('/users/resources/tasks').then(tasks => {
            const stateTasks = this.state.tasks;
            if (tasks.length >= 10) {
                this.setState({ tasks })
            } else {
                tasks.forEach((task, index) => {
                    stateTasks[index] = task;
                })
                this.setState({ tasks: stateTasks });
            }
        });
    }

    handleTaskClicked(index) {
        this.setState({ currentTask: this.state.tasks[index] })
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <TasksList tasks={this.state.tasks} onTaskClicked={this.handleTaskClicked.bind(this)} />
                <Task {...this.state.currentTask} />
            </div>
        )
    }
}